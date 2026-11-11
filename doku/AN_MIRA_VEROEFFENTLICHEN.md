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
