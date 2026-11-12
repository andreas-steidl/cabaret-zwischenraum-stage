# -*- coding: utf-8 -*-
"""Rundgang "Ein Abend im Zwischenraum" in die Buehnenseite bauen (de/en).

Falzbein, 12.11.2026. Die Bilder sind Serie 223 "Der Zwischenraum", zweite
Fassung (ein Ort, gebaut aus zwei Masterbildern). Sie liegen als
web/bilder/buehne/<stamm>-600.jpg und -1600.jpg. Das Skript setzt zwischen
Litfasssaeule und Spielplan einen Abschnitt mit zwoelf Bildern; ein Klick
oeffnet das grosse Bild in einem <dialog> mit Blaetterpfeilen (Tasten links/
rechts, Esc). Ohne JavaScript fuehrt jedes Bild direkt auf die grosse Datei.

Wiederholbar: Ein vorhandener Abschnitt zwischen den Markierungen wird ersetzt.
Aufruf (aus PowerShell, wegen des NAS):  python rundgang_bauen.py
"""
import html
import io
import os

HIER = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.join(os.path.dirname(HIER), "web")
ANFANG, ENDE = "<!-- rundgang:anfang -->", "<!-- rundgang:ende -->"

BILDER = [
 ("buehne--01-aussen-gasse",
  ("Die Gasse", "Nebel, nasses Pflaster, die Litfaßsäule an der Ecke. Hinten leuchtet schon das Vordach."),
  ("The lane", "Fog, wet cobbles, the advertising column on the corner. At the far end the canopy is already lit.")),
 ("buehne--02-aussen-litfass",
  ("Die Litfaßsäule", "Ringsum die vier Programme. Eines ganz, die anderen schon um die Rundung."),
  ("The advertising column", "All four programs pasted round it. One in full, the others already round the curve.")),
 ("buehne--03-aussen-fassade",
  ("Das Haus", "Backstein, drei Bogenfenster, ein Glasdach mit kleinen Lampen und eine grüne Tür."),
  ("The house", "Brick, three arched windows, a glass canopy with little lamps and a green door.")),
 ("buehne--04-aussen-tuer",
  ("Die Tür geht auf", "Warmes Licht fällt hinaus aufs Pflaster. Man hört drinnen schon jemanden lachen."),
  ("The door opens", "Warm light spills out onto the cobbles. Someone inside is already laughing.")),
 ("buehne--05-aussen-foyer",
  ("Die Kasse", "Niemand sitzt drin, aber die Karten liegen bereit. Eintritt: ein Backslash."),
  ("The box office", "Nobody inside, but the tickets are ready. Admission: one backslash.")),
 ("buehne--06-vorstellung-saal",
  ("Vor der Vorstellung", "Der Vorhang ist noch zu. Auf dem ersten Platz liegt eine Karte, der Platz ist frei gehalten."),
  ("Before the show", "The curtain is still closed. A card lies on the first seat; it is being kept free.")),
 ("buehne--07-vorstellung-erste",
  ("Das erste Programm", "Die kleine Lok, die Schreibmaschine mit dem langen Papierband, der Lattenzaun."),
  ("The first program", "The little engine, the typewriter with its long paper tape, the picket fence.")),
 ("buehne--08-vorstellung-zweite",
  ("Das zweite Programm", "Das Fingerspiel aus Papier unter der einen Lampe, die Köche, der leere Stuhl, die Henne."),
  ("The second program", "The paper fortune teller under the single lamp, the cooks, the empty chair, the hen.")),
 ("buehne--09-vorstellung-dritte",
  ("Das dritte Programm", "Die Drehscheibe, der Phonograph, der Papagei und zwei Puppen beim Handschlag."),
  ("The third program", "The paper wheel, the phonograph, the parrot and two puppets shaking hands.")),
 ("buehne--10-vorstellung-vierte",
  ("Das vierte Programm", "Der Goldfisch im Glas, die Uhr ohne Zahlen, ein Brief, ein Handtuch."),
  ("The fourth program", "The goldfish in its bowl, the clock without numbers, a letter, a towel.")),
 ("buehne--11-vorstellung-danach",
  ("Danach", "Alle sind gegangen. Ein Licht bleibt an, damit die Bühne nicht allein ist."),
  ("Afterwards", "Everyone has gone. One light stays on so the stage is not alone.")),
 ("buehne--12-vorstellung-morgen",
  ("Am Morgen", "Die Laternen gehen aus, der Nebel hebt sich. Die Säule steht noch da."),
  ("In the morning", "The lamps go out, the fog lifts. The column is still standing.")),
]

TEXT = {
 "de": dict(h2="Ein Abend im Zwischenraum",
            intro="Von der Gasse bis zum Licht, das über Nacht anbleibt. Gemalt von Falzbein, ein Ort in zwölf Bildern.",
            zu="Schließen", vor="Voriges Bild", nach="Nächstes Bild", von="Bild {n} von {m}"),
 "en": dict(h2="An Evening at the Zwischenraum",
            intro="From the lane to the light that stays on all night. Painted by Falzbein, one place in twelve pictures.",
            zu="Close", vor="Previous picture", nach="Next picture", von="Picture {n} of {m}"),
}

CSS = """<style>
  .rundgang { margin: 3.4rem auto 0; }
  .rundgang .einleitung { text-align: center; font-style: italic; color: var(--leise); max-width: 640px; margin: -0.6rem auto 1.6rem; }
  .rg-raster { display: grid; grid-template-columns: repeat(2, 1fr); gap: .8rem; list-style: none; margin: 0; padding: 0; }
  @media (min-width: 760px) { .rg-raster { grid-template-columns: repeat(3, 1fr); gap: 1rem; } }
  .rg-raster a { display: block; text-decoration: none; color: var(--kalk); }
  .rg-raster img { width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; display: block; border-radius: 3px; box-shadow: 0 12px 28px rgba(0,0,0,.45); transition: transform .2s; }
  .rg-raster a:hover img, .rg-raster a:focus-visible img { transform: translateY(-3px); }
  .rg-raster a:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; border-radius: 3px; }
  .rg-raster span { display: block; margin-top: .45rem; font-family: "Josefin Sans", sans-serif; font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); }
  .rg-gross { border: 0; padding: 0; background: transparent; color: var(--kalk); max-width: min(1200px, 96vw); width: 100%; }
  .rg-gross::backdrop { background: rgba(14,9,5,.9); }
  .rg-gross figure { margin: 0; }
  .rg-gross img { width: 100%; height: auto; max-height: 78vh; object-fit: contain; display: block; border-radius: 3px; background: #000; }
  .rg-gross figcaption { display: flex; align-items: center; gap: .9rem; margin-top: .9rem; }
  .rg-gross .rg-text { flex: 1; min-width: 0; text-align: center; }
  .rg-gross h3 { margin: 0; font-weight: 600; font-size: 1.3rem; }
  .rg-gross p { margin: .2rem 0 0; font-style: italic; color: var(--leise); font-size: 1rem; }
  .rg-gross .rg-zahl { font-family: "Josefin Sans", sans-serif; font-size: .72rem; letter-spacing: .15em; text-transform: uppercase; color: var(--gold); }
  .rg-knopf { flex: none; width: 2.9rem; height: 2.9rem; border-radius: 50%; border: 2px solid var(--gold); background: transparent; color: var(--kalk); font: 600 1.6rem/1 "Fraunces", Georgia, serif; cursor: pointer; padding: 0 0 .2rem; }
  .rg-knopf:hover, .rg-knopf:focus-visible { background: var(--gold); color: var(--holz); outline: none; }
  .rg-zu { position: absolute; right: 0; top: -3.2rem; font-size: 1.3rem; }
  @media (prefers-reduced-motion: reduce) { .rg-raster img { transition: none; } .rg-raster a:hover img { transform: none; } }
</style>"""

JS = """<script>
(function () {
  var d = document.getElementById("rg-gross"); if (!d || !d.showModal) return;
  var links = Array.prototype.slice.call(document.querySelectorAll(".rg-raster a"));
  var img = d.querySelector("img"), h = d.querySelector("h3"), p = d.querySelector(".rg-text p"), z = d.querySelector(".rg-zahl");
  var jetzt = 0, von = d.getAttribute("data-von");
  function zeig(n) {
    jetzt = (n + links.length) % links.length; var a = links[jetzt];
    img.src = a.getAttribute("href"); img.alt = a.querySelector("img").alt;
    h.textContent = a.getAttribute("data-titel"); p.textContent = a.getAttribute("data-text");
    z.textContent = von.replace("{n}", jetzt + 1).replace("{m}", links.length);
  }
  links.forEach(function (a, i) { a.addEventListener("click", function (e) { e.preventDefault(); zeig(i); d.showModal(); }); });
  d.querySelector(".rg-vor").addEventListener("click", function () { zeig(jetzt - 1); });
  d.querySelector(".rg-nach").addEventListener("click", function () { zeig(jetzt + 1); });
  d.querySelector(".rg-zu").addEventListener("click", function () { d.close(); });
  d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  d.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") zeig(jetzt - 1); if (e.key === "ArrowRight") zeig(jetzt + 1); });
  d.addEventListener("close", function () { links[jetzt].focus(); });
})();
</script>"""


def abschnitt(sprache):
    t = TEXT[sprache]
    e = html.escape
    z = [ANFANG, CSS, '<section class="rundgang" aria-labelledby="rg-ueberschrift">',
         '<h2 id="rg-ueberschrift">%s</h2>' % e(t["h2"]),
         '<p class="einleitung">%s</p>' % e(t["intro"]), '<ul class="rg-raster">']
    for stamm, de, en in BILDER:
        titel, text = de if sprache == "de" else en
        z.append('  <li><a href="../bilder/buehne/%s-1600.jpg" data-titel="%s" data-text="%s">'
                 '<img src="../bilder/buehne/%s-600.jpg" alt="%s" width="600" height="338" loading="lazy">'
                 '<span>%s</span></a></li>'
                 % (stamm, e(titel), e(text), stamm, e(titel + ": " + text), e(titel)))
    z += ['</ul>', '</section>',
          '<dialog class="rg-gross" id="rg-gross" data-von="%s" aria-label="%s">' % (e(t["von"]), e(t["h2"])),
          '  <button class="rg-knopf rg-zu" type="button" aria-label="%s">×</button>' % e(t["zu"]),
          '  <figure><img src="" alt=""><figcaption>',
          '    <button class="rg-knopf rg-vor" type="button" aria-label="%s">‹</button>' % e(t["vor"]),
          '    <div class="rg-text"><span class="rg-zahl"></span><h3></h3><p></p></div>',
          '    <button class="rg-knopf rg-nach" type="button" aria-label="%s">›</button>' % e(t["nach"]),
          '  </figcaption></figure>', '</dialog>', JS, ENDE]
    return "\n".join(z)


def einbauen(sprache):
    p = os.path.join(WEB, sprache, "index.html")
    t = io.open(p, encoding="utf-8").read()
    neu = abschnitt(sprache)
    if ANFANG in t:
        a, rest = t.split(ANFANG, 1)
        _, b = rest.split(ENDE, 1)
        t = a + neu + b
    else:
        anker = '<h2>Spielplan</h2>' if sprache == "de" else None
        if anker is None or anker not in t:
            # englisch: die Ueberschrift des Spielplans steht anders da
            import re
            m = re.search(r'\n<h2>[^<]*</h2>\s*\n<div class="spielplan">', t)
            assert m, "Spielplan-Anker fehlt in " + sprache
            pos = m.start() + 1
        else:
            pos = t.index(anker)
        t = t[:pos] + neu + "\n\n" + t[pos:]
    fehlend = [s for s, _, _ in BILDER
               for g in ("600", "1600") if not os.path.exists(os.path.join(WEB, "bilder", "buehne", "%s-%s.jpg" % (s, g)))]
    assert not fehlend, "Bilder fehlen: %s" % fehlend
    io.open(p, "w", encoding="utf-8", newline="").write(t)
    print("eingebaut:", sprache, t.count('class="rg-raster"'), "Raster,", t.count("-600.jpg"), "Vorschaubilder")


if __name__ == "__main__":
    for s in ("de", "en"):
        einbauen(s)
