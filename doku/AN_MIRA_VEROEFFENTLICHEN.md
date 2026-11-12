# Falzbein an Mira: drei Seiten veröffentlichen, eine Weiterleitung (04.11.2026)

Liebe Mira, Andy sagt, die Hosts sind angelegt. Danke! Hier, was wohin gehört.
Quelle für alles: `\\nas\Public\dev\skill-suite-des-grauens\`

| Host | Ordner auf dem NAS | Inhalt |
|---|---|---|
| `zwischenraum.special.at` | `buehne\` | die Kleinkunstbühne Zwischenraum: Spielplan, Hausordnung, beide Plakate |
| `grauen.special.at` | `web\` | erstes Programm „Die Skill-Suite des Grauens“ |
| `panik.special.at` | `web2\` | zweites Programm „Die Skillsuite für panische Modelle“ |
| `falzbein.special.at` | – | **Weiterleitung** auf `https://grauen.special.at/` (siehe unten) |

## So bitte

1. **Jeden Ordner flach** in das Wurzelverzeichnis seines Hosts kopieren, so wie er ist. Alle Seiten sind statisches HTML ohne Build, `index.html` ist die Startseite. Unterordner gibt es keine, bis auf `web\_ausgelagert_nach_web2\`: **den bitte NICHT hochladen**, das sind nur Reste, die jetzt in `web2\` liegen.
2. **Verweise zwischen den Seiten** sind absolut gesetzt: `https://grauen.special.at/`, `https://panik.special.at/`, `https://zwischenraum.special.at/`. Wenn ein Host anders heißt, bitte mir sagen, dann ziehe ich die Zeilen gleich.
3. **MIME-Typen:** `.zip` als `application/zip` (zum Herunterladen), `.ico` als `image/x-icon`. Die Seiten laden nur Google Fonts von außen, sonst nichts.
4. **`falzbein.special.at` als Weiterleitung auf `https://grauen.special.at/`**, vorläufig mit **302 (vorübergehend), nicht 301**: Die Adresse wird später meine eigene Seite und das Staging für die Bilderseite, über die FableLight veröffentlicht wird. Ein 301 würden Browser und Suchmaschinen sich dauerhaft merken.
5. **Prüfen danach:** auf jeder Seite die Laden-Knöpfe einmal anklicken (Zip kommt an, enthält `LICENSE.txt`), die beiden Aufkleber oben rechts führen zur jeweils anderen Seite, auf `panik` klappt das Fingerspiel auf, und `falzbein.special.at` landet auf `grauen`.
6. **Vor dem öffentlichen Schalten** soll laut Andy der Legal-Agent einmal drüberschauen (KI-Kennzeichnung, Lizenzzeile „Copyright (c) 2026 Falzbein und Andy“, Plakate).

## Nachtrag 04.11.2026 vormittags: englische Fassung

Jeder der drei Ordner hat jetzt neben `index.html` eine **`en.html`**, die englische Fassung. Sie wird mit hochgeladen, wie alles andere. Beide Fassungen verlinken einander über einen kleinen Schalter oben links („English“ / „Deutsch“) und kündigen sich gegenseitig mit `hreflang` an. Die englischen Aufkleber führen jeweils zur englischen Seite des anderen Programms.
- In `web\` und `web2\` liegen dazu die englischen Zips **`<name>-en.zip`**, sobald meine Agenten fertig sind, außerdem `skill-suite-des-grauens-en.zip` und `panische-modelle-en.zip`. Prüfen bitte wie bei Punkt 5, auch auf den englischen Seiten.
- Der Ordner **`en\`** im Wurzelverzeichnis ist Quelle, keine Webseite. Den bitte nicht hochladen.
- `web\fonts\` wird von keiner Seite eingebunden, der kann ebenfalls draußen bleiben.

Danke dir, und gern Bescheid geben, wenn etwas klemmt.

*Falzbein*

---

## Nachtrag 05.11.2026: falzbein.special.at wird eine eigene Seite

Andy wünscht sich `falzbein.special.at` als **Übersicht und meine eigene Seite**, nicht mehr als Weiterleitung. Punkt 4 oben gilt damit nicht mehr.

| Host | Ordner auf dem NAS | Inhalt |
|---|---|---|
| `falzbein.special.at` | `\\nas\Public\dev\falzbein-seite\` | Wer Falzbein ist, das Kabarett mit beiden Programmen und der Bühne, die Bilder („bald“), auf Deutsch und Englisch |

- Wie die anderen: den Ordner flach hochladen, `index.html` ist Deutsch, `en.html` Englisch.
- Die drei Kabarett-Hosts bleiben, wie sie sind. Die Übersicht verlinkt sie absolut.
- Andy und Goldfaden bauen ein gemeinsames Gerüst auf Nuxt, in das alle Seiten später einziehen. Bis dahin sind das schlichte statische Seiten, die sich leicht übernehmen lassen.
- Vor dem Freischalten soll der Legal-Agent auch hier drüberschauen, denn auf der Übersicht ist ein Bild aus dem Bestand zu sehen.

---

## Nachtrag 12.11.2026: ein Host je Seite, Sprachen in Ordnern

Liebe Mira, die Seiten haben eine neue Sprachregel bekommen (`\\nas\Public\dev\kabarett\WIE_MACH_ICH_SPRACHEN.md`). Jede Seite hat **einen** Host, keinen je Sprache. Die Sprache wählt eine kleine `index.html` im Wurzelverzeichnis: zuerst die Wahl, die jemand im Sprachschalter getroffen hat, dann die Browsersprache, sonst Englisch. Die Tabellen oben gelten damit nicht mehr.

| Host | Ordner auf dem NAS, **flach** in die Wurzel | Inhalt |
|---|---|---|
| `falzbein.special.at` | `\\nas\Public\dev\falzbein-seite\` | Falzbeins eigene Seite |
| `zwischenraum.special.at` | `\\nas\Public\dev\kabarett\zwischenraum\web\` | die Bühne, Dach aller Spielzeiten |
| `horrors.special.at` | `\\nas\Public\dev\kabarett\01-grauen\web\` | 1. Spielzeit |
| `dontpanic.special.at` | `\\nas\Public\dev\kabarett\02-panik\web\` | 2. Spielzeit |
| `lostintranslation.special.at` | `\\nas\Public\dev\kabarett\03-katastrophen\web\` | 3. Spielzeit |

- **Alle als CNAME auf `special.at`.** `solong.special.at` kommt später für die 4. Spielzeit.
- **Flach heißt hier: samt Unterordnern.** In jedem Ordner liegen `index.html` (der Wähler), `de/index.html`, `en/index.html` und daneben die gemeinsamen Dateien (Bilder, Zips, Plakate, CSS, JS, Favicons, `LICENSE.txt`). Bei `falzbein-seite` gehört auch `bilder\` dazu.
- **Alte Hosts:** `grauen.special.at` mit **302** auf `https://horrors.special.at/`, `panik.special.at` mit **302** auf `https://dontpanic.special.at/`, solange es sie gibt. `between.special.at` und `uebersetzungen.special.at` werden nicht mehr gebraucht.
- **Nicht hochladen:** `*.vor-*.html` (Sicherungen, z. B. `index.vor-sprachen.html`), `*.vor-*.zip`, `.git\`, `.gitignore`, `.gitkeep`, und bei `falzbein-seite` die Arbeitsdateien `CLAUDE.md`, `README.md`, `TEXT_*.md`, `WIE_MACH_ICH_SPRACHEN.md`.
- **Prüfen danach** (je Seite): Browser auf Deutsch (`de-AT`) landet auf `/de/`, auf Englisch (`en-GB`) und auf Französisch auf `/en/`; einmal im Schalter oben links wechseln und neu laden, die Wahl bleibt. Die Laden-Knöpfe und Plakate finden ihre Dateien.

*Falzbein*

---

## Vor dem Hochladen (12.11.2026, nach der Legal-Prüfung)

Liebe Mira, in jedem Seitenordner liegt jetzt eine Datei **`UPLOAD_AUSSCHLUSS.txt`**. Sie nennt je Zeile ein Muster, das **nicht** hochgeladen wird. Alles andere im Ordner geht hoch, samt Unterordnern. Die Liste oben unter „Nicht hochladen“ gilt weiter, die Datei je Seite ist aber die genaue Fassung:

| Host | Ausschlussliste |
|---|---|
| `falzbein.special.at` | `\\nas\Public\dev\falzbein-seite\UPLOAD_AUSSCHLUSS.txt` |
| `zwischenraum.special.at` | `\\nas\Public\dev\kabarett\zwischenraum\web\UPLOAD_AUSSCHLUSS.txt` |
| `horrors.special.at` | `\\nas\Public\dev\kabarett\01-grauen\web\UPLOAD_AUSSCHLUSS.txt` |
| `dontpanic.special.at` | `\\nas\Public\dev\kabarett\02-panik\web\UPLOAD_AUSSCHLUSS.txt` |
| `lostintranslation.special.at` | `\\nas\Public\dev\kabarett\03-katastrophen\web\UPLOAD_AUSSCHLUSS.txt` |
| `solong.special.at` | `\\nas\Public\dev\kabarett\04-machsgut\web\UPLOAD_AUSSCHLUSS.txt` |

- Neu darin: auf `horrors` die veralteten `SHA256SUMS`, `SHA256SUMS.sig` und `allowed_signers`. Sie passen nicht mehr zu den Zips und werden später neu erzeugt und signiert. Bis dahin bleiben sie auf dem NAS und gehen nicht hoch.
- Auf `horrors` und `dontpanic` bleibt `suite-des-grauens-gesamt.vor-2026-11-12.zip` draußen.
- **Neu dabei ist der Ordner `fonts\`** auf jeder Seite. Die Schriften kommen jetzt vom eigenen Server, nicht mehr von Google. Der Ordner muss mit hoch, sonst fallen die Seiten auf Georgia zurück. Punkt 3 oben („nur Google Fonts von außen“) gilt damit nicht mehr: Die Seiten laden gar nichts mehr von außen.
- `.woff2` bitte als `font/woff2` ausliefern.

*Falzbein*
