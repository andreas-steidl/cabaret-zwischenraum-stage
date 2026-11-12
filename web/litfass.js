/* Die Litfaßsäule der Kleinkunstbühne Zwischenraum.
   Eine runde Wiener Säule: dunkelgrüner Sockel, Kuppeldach mit Kugel, dazwischen
   der Schaft aus Papier. Rundherum kleben die Plakate der vier Programme, jedes
   aus schmalen Streifen gesetzt, die einzeln auf die Rundung gedreht sind
   (CSS 3D, rotateY und translateZ), damit es wirklich gewölbt aussieht.
   Drehen: ziehen (Maus, Finger), Pfeiltasten, die Knöpfe ‹ ›. Sie rastet auf
   das vorderste Plakat ein. Mit prefers-reduced-motion schaltet sie nur um.
   Daten und Texte (LITFASS) kommen aus der Seite. Keine Bibliotheken. */
(function () {
  "use strict";
  var DATEN = window.LITFASS;
  var saeule = document.getElementById("saeule");
  var buehne = document.getElementById("litfass");
  if (!DATEN || !saeule || !buehne) return;

  var PLAKATE = DATEN.plakate;
  var T = DATEN.texte;
  var ANZAHL = PLAKATE.length;
  var SCHRITT = 360 / ANZAHL;           /* Grad je Plakat */
  var BOGEN = SCHRITT * 0.88;           /* so viel davon bedeckt das Plakat */
  var STREIFEN = 12;                    /* Streifen je Plakat */
  var SEITE = 1273 / 900;               /* Plakat: Höhe zu Breite */
  var PERSPEKTIVE = 1700;
  var GRAD = 180 / Math.PI;

  var el = {
    links: document.getElementById("litfass-links"),
    rechts: document.getElementById("litfass-rechts"),
    wann: document.getElementById("litfass-wann"),
    titel: document.getElementById("litfass-vorne"),
    unter: document.getElementById("litfass-unter"),
    los: document.getElementById("litfass-los"),
    ansage: document.getElementById("litfass-ansage")
  };

  var medien = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var ruhig = !!(medien && medien.matches);

  var winkel = 0;        /* aktuelle Drehung des Rings, Grad */
  var ziel = 0;          /* worauf er einrastet */
  var tempo = 0;         /* Grad je Millisekunde */
  var r = 160;           /* Radius des Schafts in Pixeln */
  var ring = null;
  var streifen = [];
  var vorne = -1;
  var laeuft = false;
  var zuletzt = 0;

  /* ---------- Papier: ein feines Rauschen, einmal gerechnet ---------- */
  var PAPIER = "url(\"data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>" +
    "<filter id='p'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/>" +
    "<feColorMatrix values='0 0 0 0 .42  0 0 0 0 .36  0 0 0 0 .28  0 0 0 .55 0'/></filter>" +
    "<rect width='180' height='180' filter='url(#p)'/></svg>") + "\")";
  var FASER = "url(\"data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'>" +
    "<filter id='f'><feTurbulence type='fractalNoise' baseFrequency='.012 .09' numOctaves='2' seed='7' stitchTiles='stitch'/>" +
    "<feColorMatrix values='0 0 0 0 .3  0 0 0 0 .24  0 0 0 0 .16  0 0 0 .5 -.12'/></filter>" +
    "<rect width='260' height='260' filter='url(#f)'/></svg>") + "\")";
  saeule.style.setProperty("--papier", PAPIER);
  saeule.style.setProperty("--faser", FASER);

  function ganz(n) { return ((n % ANZAHL) + ANZAHL) % ANZAHL; }
  function vorneAus(w) { return ganz(Math.round(-w / SCHRITT)); }
  function f(n) { return Math.round(n * 100) / 100; }

  function sagen(text) {
    if (!el.ansage) return;
    el.ansage.textContent = "";
    window.setTimeout(function () { el.ansage.textContent = text; }, 40);
  }

  /* ---------- Die Bleche: Dach und Sockel als SVG ---------- */
  /* Ein waagerechter Ring über Augenhöhe wölbt sich nach oben (die Mitte ist
     näher), einer darunter nach unten. b ist diese Wölbung in Pixeln. */
  function band(cx, yUnten, hwUnten, yOben, hwOben, bUnten, bOben, fuell, extra) {
    return "<path d='M" + f(cx - hwUnten) + " " + f(yUnten) +
      " Q" + f(cx) + " " + f(yUnten + 2 * bUnten) + " " + f(cx + hwUnten) + " " + f(yUnten) +
      " L" + f(cx + hwOben) + " " + f(yOben) +
      " Q" + f(cx) + " " + f(yOben + 2 * bOben) + " " + f(cx - hwOben) + " " + f(yOben) + " Z' fill='" + fuell + "'" + (extra || "") + "/>";
  }

  function dachSvg(breite, hoehe) {
    var cx = breite / 2, u = r / 160;
    var s = "<svg class='ls-blech' viewBox='0 0 " + f(breite) + " " + f(hoehe) + "' width='" + f(breite) + "' height='" + f(hoehe) + "' aria-hidden='true' focusable='false'>" +
      "<defs>" +
      "<linearGradient id='ls-gruen' x1='0' x2='1' y1='0' y2='0'><stop offset='0' stop-color='#0b1c14'/><stop offset='.22' stop-color='#2c5a43'/><stop offset='.36' stop-color='#4a8064'/><stop offset='.55' stop-color='#25503b'/><stop offset='1' stop-color='#081610'/></linearGradient>" +
      "<linearGradient id='ls-kuppel' x1='0' x2='1' y1='0' y2='.35'><stop offset='0' stop-color='#0c1f16'/><stop offset='.3' stop-color='#3f765a'/><stop offset='.42' stop-color='#5a9273'/><stop offset='.62' stop-color='#22493a'/><stop offset='1' stop-color='#07140e'/></linearGradient>" +
      "<radialGradient id='ls-kugel' cx='.36' cy='.32' r='.75'><stop offset='0' stop-color='#fff1c4'/><stop offset='.28' stop-color='#e8be62'/><stop offset='.75' stop-color='#9a6a22'/><stop offset='1' stop-color='#4a300c'/></radialGradient>" +
      "</defs>";
    var y = hoehe;
    /* Kranz direkt über dem Papier: drei Profile */
    s += band(cx, y, r * 1.0, y - 9 * u, r * 1.03, -1.5 * u, -2 * u, "url(#ls-gruen)");
    y -= 9 * u;
    s += band(cx, y, r * 1.03, y - 7 * u, r * 1.03, -2 * u, -2.2 * u, "#d9b56a", " opacity='.5'");
    s += band(cx, y - 1 * u, r * 1.03, y - 16 * u, r * 1.06, -2.2 * u, -2.6 * u, "url(#ls-gruen)");
    y -= 16 * u;
    /* Zahnschnitt im Fries */
    var zaehne = 15, zw = (r * 2.1) / zaehne;
    for (var i = 0; i < zaehne; i++) {
      var x = cx - r * 1.05 + (i + 0.5) * zw;
      var tiefe = Math.cos(((x - cx) / (r * 1.06)) * Math.PI / 2);
      s += "<rect x='" + f(x - zw * 0.22 * tiefe) + "' y='" + f(y - 13 * u - 2.6 * u * tiefe) + "' width='" + f(zw * 0.44 * tiefe) + "' height='" + f(9 * u) + "' fill='#081610' opacity='" + f(0.25 + 0.45 * tiefe) + "'/>";
    }
    y -= 18 * u;
    /* Traufe: weit ausladender Ring */
    s += band(cx, y + 2 * u, r * 1.06, y - 4 * u, r * 1.17, -3 * u, -3.4 * u, "#0a1a12");
    s += band(cx, y - 4 * u, r * 1.17, y - 10 * u, r * 1.17, -3.4 * u, -3.6 * u, "url(#ls-gruen)");
    s += band(cx, y - 9 * u, r * 1.17, y - 10.5 * u, r * 1.17, -3.6 * u, -3.6 * u, "#e8be62", " opacity='.55'");
    y -= 10 * u;
    /* Kuppel */
    var kh = r * 0.5, kw = r * 1.1;
    var spitze = y - kh;
    s += "<path d='M" + f(cx - kw) + " " + f(y) + " C" + f(cx - kw) + " " + f(y - kh * 0.62) + " " + f(cx - kw * 0.42) + " " + f(spitze) + " " + f(cx) + " " + f(spitze) +
      " C" + f(cx + kw * 0.42) + " " + f(spitze) + " " + f(cx + kw) + " " + f(y - kh * 0.62) + " " + f(cx + kw) + " " + f(y) +
      " Q" + f(cx) + " " + f(y - 7 * u) + " " + f(cx - kw) + " " + f(y) + " Z' fill='url(#ls-kuppel)'/>";
    /* Rippen der Kuppel */
    for (var k = 1; k < 8; k++) {
      var t = k / 8, xo = cx - kw + 2 * kw * t;
      var xm = cx + (xo - cx) * 0.55;
      s += "<path d='M" + f(xo) + " " + f(y - 3.4 * u * Math.sin(Math.PI * t)) + " Q" + f(xm) + " " + f(y - kh * 0.85) + " " + f(cx + (xo - cx) * 0.06) + " " + f(spitze + 2 * u) + "' fill='none' stroke='#081610' stroke-opacity='.5' stroke-width='" + f(1.3 * u) + "'/>";
      s += "<path d='M" + f(xo + 1.6 * u) + " " + f(y - 3.4 * u * Math.sin(Math.PI * t)) + " Q" + f(xm + 1.2 * u) + " " + f(y - kh * 0.85) + " " + f(cx + (xo - cx) * 0.06 + 0.6 * u) + " " + f(spitze + 2 * u) + "' fill='none' stroke='#8fc3a4' stroke-opacity='.16' stroke-width='" + f(0.9 * u) + "'/>";
    }
    /* Hals und Kugel */
    s += "<rect x='" + f(cx - 9 * u) + "' y='" + f(spitze - 9 * u) + "' width='" + f(18 * u) + "' height='" + f(11 * u) + "' rx='" + f(2 * u) + "' fill='url(#ls-gruen)'/>";
    s += "<rect x='" + f(cx - 13 * u) + "' y='" + f(spitze - 11 * u) + "' width='" + f(26 * u) + "' height='" + f(4 * u) + "' rx='" + f(2 * u) + "' fill='#0e2219'/>";
    var kr = 15 * u;
    s += "<circle cx='" + f(cx) + "' cy='" + f(spitze - 11 * u - kr + 1) + "' r='" + f(kr) + "' fill='url(#ls-kugel)'/>";
    s += "<ellipse cx='" + f(cx - kr * 0.35) + "' cy='" + f(spitze - 11 * u - kr * 1.35) + "' rx='" + f(kr * 0.28) + "' ry='" + f(kr * 0.18) + "' fill='#fff8e0' opacity='.7'/>";
    return s + "</svg>";
  }

  function sockelSvg(breite, hoehe) {
    var cx = breite / 2, u = r / 160;
    var s = "<svg class='ls-blech' viewBox='0 0 " + f(breite) + " " + f(hoehe) + "' width='" + f(breite) + "' height='" + f(hoehe) + "' aria-hidden='true' focusable='false'>" +
      "<defs>" +
      "<linearGradient id='ls-gruen2' x1='0' x2='1' y1='0' y2='0'><stop offset='0' stop-color='#0a1912'/><stop offset='.22' stop-color='#2a573f'/><stop offset='.36' stop-color='#467b5f'/><stop offset='.56' stop-color='#224a37'/><stop offset='1' stop-color='#07130d'/></linearGradient>" +
      "<radialGradient id='ls-boden' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='#000' stop-opacity='.55'/><stop offset='1' stop-color='#000' stop-opacity='0'/></radialGradient>" +
      "</defs>";
    s += "<ellipse cx='" + f(cx) + "' cy='" + f(hoehe - 12 * u) + "' rx='" + f(r * 1.5) + "' ry='" + f(13 * u) + "' fill='url(#ls-boden)'/>";
    var y = 0;
    /* Abschlussring unter dem Papier */
    s += band(cx, y + 9 * u, r * 1.04, y, r * 1.0, 2.2 * u, 1.6 * u, "url(#ls-gruen2)");
    s += band(cx, y + 9 * u, r * 1.04, y + 7.5 * u, r * 1.04, 2.2 * u, 2.2 * u, "#e8be62", " opacity='.45'");
    y += 9 * u;
    /* Der Sockel selbst, mit Tür */
    var sh = r * 0.42;
    s += band(cx, y + sh, r * 1.1, y, r * 1.06, 3.6 * u, 2.4 * u, "url(#ls-gruen2)");
    var tb = r * 0.34, th = sh * 0.7, ty = y + sh * 0.16;
    s += "<path d='M" + f(cx - tb / 2) + " " + f(ty + th) + " L" + f(cx - tb / 2) + " " + f(ty + tb * 0.3) + " Q" + f(cx) + " " + f(ty - tb * 0.12) + " " + f(cx + tb / 2) + " " + f(ty + tb * 0.3) + " L" + f(cx + tb / 2) + " " + f(ty + th) + "' fill='#0c2016' stroke='#5d9474' stroke-opacity='.35' stroke-width='" + f(1.2 * u) + "'/>";
    s += "<circle cx='" + f(cx + tb * 0.3) + "' cy='" + f(ty + th * 0.6) + "' r='" + f(2.2 * u) + "' fill='#e8be62' opacity='.8'/>";
    y += sh;
    /* Fußring */
    s += band(cx, y + 6 * u, r * 1.14, y - 1 * u, r * 1.1, 4 * u, 3.6 * u, "#0a1912");
    s += band(cx, y + 15 * u, r * 1.2, y + 5 * u, r * 1.14, 4.4 * u, 4 * u, "url(#ls-gruen2)");
    return s + "</svg>";
  }

  /* ---------- Bauen ---------- */
  function bauen() {
    var verfuegbar = saeule.clientWidth || 340;
    r = Math.max(104, Math.min(158, verfuegbar * 0.39));
    var halb = (BOGEN / STREIFEN) / 2 / GRAD;
    var sw = 2 * r * Math.tan(halb);                    /* Breite eines Streifens */
    var pb = sw * STREIFEN;                             /* abgewickelte Plakatbreite */
    var ph = pb * SEITE;
    var rand = r * 0.28;
    var schaftH = ph + 2 * rand;
    var dachB = r * 2.4, dachH = r * 0.5 + (9 + 16 + 18 + 10 + 22 + 30) * (r / 160);
    var sockelB = r * 2.4, sockelH = r * 0.42 + 42 * (r / 160);

    var ueber = 6 * (r / 160);                          /* Dach und Sockel greifen über das Papier */
    var html = "<div class='ls-dach' style='height:" + f(dachH) + "px;margin-bottom:" + f(-ueber) + "px'>" + dachSvg(dachB, dachH) + "</div>";
    html += "<div class='ls-schaft' style='width:" + f(2 * r) + "px;height:" + f(schaftH) + "px'>";
    html += "<div class='ls-szene' style='perspective:" + PERSPEKTIVE + "px'><div class='ls-ring' id='ls-ring'>";
    for (var i = 0; i < ANZAHL; i++) {
      var p = PLAKATE[i];
      for (var j = 0; j < STREIFEN; j++) {
        var w = i * SCHRITT - BOGEN / 2 + (j + 0.5) * (BOGEN / STREIFEN);
        html += "<div class='ls-streifen' data-i='" + i + "' style='" +
          "width:" + f(sw + 0.7) + "px;height:" + f(ph) + "px;margin-left:" + f(-(sw + 0.7) / 2) + "px;top:" + f(rand) + "px;" +
          "background-image:var(--faser),var(--papier),url(" + p.bild + ");" +
          "background-size:260px 260px,180px 180px," + f(pb) + "px " + f(ph) + "px;" +
          "background-position:" + f(-j * sw * 0.6) + "px 0," + f(-j * sw) + "px 0," + f(-j * sw) + "px 0;" +
          "transform:rotateY(" + f(w) + "deg) translateZ(" + f(r - 0.5) + "px)'></div>";
      }
    }
    html += "</div></div><div class='ls-licht'></div></div>";
    html += "<div class='ls-sockel' style='height:" + f(sockelH) + "px;margin-top:" + f(-ueber) + "px'>" + sockelSvg(sockelB, sockelH) + "</div>";
    saeule.innerHTML = html;
    ring = document.getElementById("ls-ring");
    streifen = saeule.querySelectorAll(".ls-streifen");
    vorne = -1;
    zeichnen();
  }

  /* ---------- Zeichnen und Anzeigen ---------- */
  function zeichnen() {
    if (!ring) return;
    ring.style.transform = "translateZ(0) rotateY(" + f(winkel) + "deg)";
    var neu = vorneAus(winkel);
    if (neu !== vorne) {
      vorne = neu;
      for (var i = 0; i < streifen.length; i++) {
        streifen[i].classList.toggle("vorne", +streifen[i].getAttribute("data-i") === vorne);
      }
      anzeigen(vorne);
    }
  }

  function anzeigen(n) {
    var p = PLAKATE[n];
    if (el.wann) el.wann.textContent = p.wann;
    if (el.titel) el.titel.textContent = p.titel;
    if (el.unter) el.unter.textContent = p.unter;
    if (el.los) { el.los.href = p.host; el.los.setAttribute("aria-label", T.los + ": " + p.titel); }
    buehne.style.setProperty("--akzent", p.farbe);
    saeule.setAttribute("aria-label", T.saeule + " " + T.vorne.replace("{titel}", p.titel).replace("{n}", n + 1).replace("{m}", ANZAHL));
  }

  function ansagen() {
    var n = vorneAus(ziel), p = PLAKATE[n];
    sagen(T.vorne.replace("{titel}", p.titel).replace("{n}", n + 1).replace("{m}", ANZAHL) + " " + p.alt);
  }

  /* ---------- Bewegung: eine weiche Feder, die einrastet ---------- */
  var FEDER = 0.00011, DAEMPFUNG = 2 * Math.sqrt(FEDER) * 0.9;
  function schritt(zeit) {
    var dt = Math.min(40, zeit - (zuletzt || zeit));
    zuletzt = zeit;
    var a = FEDER * (ziel - winkel) - DAEMPFUNG * tempo;
    tempo += a * dt;
    winkel += tempo * dt;
    if (Math.abs(ziel - winkel) < 0.04 && Math.abs(tempo) < 0.002) { winkel = ziel; tempo = 0; laeuft = false; zeichnen(); return; }
    zeichnen();
    window.requestAnimationFrame(schritt);
  }
  function anstossen() {
    if (ruhig) { winkel = ziel; tempo = 0; zeichnen(); return; }
    if (!laeuft) { laeuft = true; zuletzt = 0; window.requestAnimationFrame(schritt); }
  }
  function drehen(um) {
    ziel = Math.round(ziel / SCHRITT) * SCHRITT - um * SCHRITT;
    anstossen();
    ansagen();
  }
  function zu(n) {
    var jetzt = vorneAus(ziel);
    var d = ganz(n - jetzt);
    if (d > ANZAHL / 2) d -= ANZAHL;
    if (d) drehen(d);
  }
  function oeffnen(neu) {
    var host = PLAKATE[vorneAus(ziel)].host;
    if (neu) window.open(host, "_blank", "noopener"); else window.location.href = host;
  }

  /* ---------- Ziehen ---------- */
  var zug = null;
  saeule.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button > 1) return;
    zug = { id: e.pointerId, x: e.clientX, y: e.clientY, w: winkel, bewegt: false, t: performance.now(), proben: [], ziel: e.target };
    laeuft = false; tempo = 0;
    if (ruhig) winkel = ziel;
  });
  saeule.addEventListener("pointermove", function (e) {
    if (!zug || e.pointerId !== zug.id) return;
    var dx = e.clientX - zug.x;
    if (!zug.bewegt && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - zug.y)) {
      zug.bewegt = true;
      saeule.classList.add("zieht");
      try { saeule.setPointerCapture(e.pointerId); } catch (x) {}
    }
    if (!zug.bewegt || ruhig) return;
    winkel = zug.w + (dx / r) * GRAD;
    var jetzt = performance.now();
    zug.proben.push({ t: jetzt, w: winkel });
    while (zug.proben.length > 1 && jetzt - zug.proben[0].t > 90) zug.proben.shift();
    zeichnen();
  });
  function loslassen(e, abgebrochen) {
    if (!zug || e.pointerId !== zug.id) return;
    var z = zug; zug = null;
    saeule.classList.remove("zieht");
    var dx = e.clientX - z.x;
    if (!z.bewegt) {
      if (abgebrochen) return;
      var s = z.ziel && z.ziel.closest ? z.ziel.closest(".ls-streifen") : null;
      if (s) {
        var i = +s.getAttribute("data-i");
        if (i === vorneAus(ziel)) oeffnen(e.ctrlKey || e.metaKey || e.button === 1);
        else zu(i);
      }
      return;
    }
    if (ruhig) {
      if (dx < -30) drehen(1); else if (dx > 30) drehen(-1);
      return;
    }
    var v = 0, pr = z.proben;
    if (pr.length > 1) v = (pr[pr.length - 1].w - pr[0].w) / Math.max(16, pr[pr.length - 1].t - pr[0].t);
    var wurf = winkel + v * 220;
    var max = 2 * SCHRITT;
    wurf = Math.max(z.w - max, Math.min(z.w + max, wurf));
    var alt = vorneAus(ziel);
    ziel = Math.round(wurf / SCHRITT) * SCHRITT;
    tempo = v;
    anstossen();
    if (vorneAus(ziel) !== alt) ansagen();
  }
  saeule.addEventListener("pointerup", function (e) { loslassen(e, false); });
  saeule.addEventListener("pointercancel", function (e) { loslassen(e, true); });
  saeule.addEventListener("dragstart", function (e) { e.preventDefault(); });

  /* ---------- Tasten und Knöpfe ---------- */
  saeule.addEventListener("keydown", function (e) {
    var k = e.key;
    if (k === "ArrowRight") { drehen(1); }
    else if (k === "ArrowLeft") { drehen(-1); }
    else if (k === "Home") { zu(0); }
    else if (k === "End") { zu(ANZAHL - 1); }
    else if (k === "Enter" || k === " ") { oeffnen(e.ctrlKey || e.metaKey); }
    else return;
    e.preventDefault();
  });
  if (el.links) el.links.addEventListener("click", function () { drehen(-1); });
  if (el.rechts) el.rechts.addEventListener("click", function () { drehen(1); });

  if (medien) {
    var wechsel = function (m) { ruhig = m.matches; if (ruhig) { laeuft = false; winkel = ziel; tempo = 0; zeichnen(); } };
    if (medien.addEventListener) medien.addEventListener("change", wechsel); else if (medien.addListener) medien.addListener(wechsel);
  }

  var breiteVorher = 0, warte = 0;
  window.addEventListener("resize", function () {
    window.clearTimeout(warte);
    warte = window.setTimeout(function () {
      if (Math.abs(saeule.clientWidth - breiteVorher) < 8) return;
      breiteVorher = saeule.clientWidth;
      bauen();
    }, 150);
  });

  /* ---------- Los ---------- */
  var start = typeof DATEN.start === "number" ? DATEN.start : 0;
  winkel = ziel = -start * SCHRITT;
  breiteVorher = saeule.clientWidth;
  bauen();
  buehne.classList.add("bereit");
})();
