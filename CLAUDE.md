# CLAUDE.md – zwischenraum

Die **Kleinkunstbühne Zwischenraum**: das Dach über allen Spielzeiten des Kabaretts von Falzbein
und Andy. Spielplan, Hausordnung, beide Plakate, auf Deutsch und Englisch. Dazu der **Gesamtskill**
`suite-des-grauens`, der alle Spickzettel aller Spielzeiten in einem Skill vereint (Anzeigename
noch offen; technischer Name bleibt `suite-des-grauens`).
Host: **https://zwischenraum.special.at/** (Inhalt von `web/`, flach hochgeladen).

## Ordner
- `web/` – `index.html` (de), `en.html` (en), Signet, Favicons, Plakat-Webfassungen beider Spielzeiten.
- `skills/gesamt/suite-des-grauens/` – `SKILL.md` (englisch, von Hand, mit deutschem Teil) und `sheets/<englischer-name>.md`.
- `skills/gesamt/gesamt_bauen.py` – erzeugt `sheets/` aus `../01-grauen/skills/en` und `../02-panik/skills/en`.
- `doku/` – Veröffentlichung (`AN_MIRA_VEROEFFENTLICHEN.md`, Hosts), `ENGLISCH_UND_ZUSAMMENFUEHRUNG.md` (englische Namen, Aufbau des Gesamtskills), Satzung und Schriften an Falzbein, Antwort an Richtscheit, `VIERTE_SPIELZEIT.md` (Sammelmappe für später).

## Bauen
- **Gesamtskill:** `python skills/gesamt/gesamt_bauen.py [ziel]`; ohne Argument schreibt es nach `skills/gesamt/suite-des-grauens/sheets/`. Zur Probe ein anderes Ziel angeben. Braucht die Nachbarordner `01-grauen` und `02-panik`.
- **Zip:** `suite-des-grauens-gesamt.zip` = `suite-des-grauens/SKILL.md`, `suite-des-grauens/LICENSE.txt`, `suite-des-grauens/sheets/*.md`. Es liegt in `../01-grauen/web/` und `../02-panik/web/` (beide gleich), dort nach jedem Bau erneuern.
- **Plakate:** werden in den Spielzeiten gesetzt; hier liegen nur Kopien der Webfassungen (`plakat-web(-en).jpg`, `plakat2-web(-en).jpg`).
- **Seite:** statisches HTML, keine Build-Kette; nur Google Fonts von außen. Sicherungen `*.vor-*.html` nicht einchecken.

## Querverweise
Erste Spielzeit `../01-grauen` (grauen.special.at), zweite `../02-panik` (panik.special.at), dritte `../03-katastrophen` (in Arbeit, noch ohne Host). Falzbeins eigene Seite falzbein.special.at liegt getrennt in `\\nas\Public\dev\falzbein-seite\`. Herkunft: Baustelle `\\nas\Public\dev\skill-suite-des-grauens\` (nur lesen).

## Regeln
- Texte UTF-8 (ohne BOM).
- Jede Seite und jeder Skill auf Deutsch **und** Englisch.
- Keine Religion, keine Politik in Namen und Texten.
- Sitzungsnamen in Skill-Texten nur als Rollen („eine andere Sitzung“), nicht als Namen.
- Vor dem Veröffentlichen schaut der Legal-Agent drüber (KI-Kennzeichnung, Lizenzzeile, Plakate).
- Signatur und Manifest kommen gesammelt am Schluss, nicht je Änderung.
- Nach jedem Schreiben im Ergebnis nachsehen: Datei öffnen, Zip auflisten, Pfad wiederfinden.
