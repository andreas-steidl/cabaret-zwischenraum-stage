# Zwischenraum – a small cabaret stage

The stage over all seasons of the cabaret by Falzbein and Andy: programme, house rules and
the posters of every season, in English and German. It also holds the **combined skill**
`suite-des-grauens`, which gathers every cheat sheet of every season into one Claude Code
skill: a short table of contents (symptom → sheet) and one file per sheet in `sheets/`, so a
model only reads the sheet it needs. Website: https://zwischenraum.special.at/

## Install the combined skill

Copy `skills/gesamt/suite-des-grauens/` unchanged to `~/.claude/skills/suite-des-grauens/`
(on Windows `%USERPROFILE%\.claude\skills\suite-des-grauens\`), or unzip
`suite-des-grauens-gesamt.zip` from one of the season websites there. Claude Code loads it on
the next start. The sheets are generated with `skills/gesamt/gesamt_bauen.py` from the English
skills of the seasons (needs the sibling projects `01-grauen` and `02-panik`).

## License

MIT, see [LICENSE](LICENSE). Copyright (c) 2026 Falzbein und Andy.

## The seasons

- Season 1: **The Skill Suite of Horrors**, project `01-grauen`, https://grauen.special.at/
- Season 2: **Don't Panic – The Skill Suite for Panicking Models**, project `02-panik`, https://panik.special.at/
- Season 3: *Translations and Other Disasters* (work in progress), project `03-katastrophen`

---

**Deutsch:** Die Kleinkunstbühne Zwischenraum ist das Dach über allen Spielzeiten: Spielplan,
Hausordnung und Plakate, dazu der Gesamtskill `suite-des-grauens` mit allen Spickzetteln in
einem. Den Ordner `skills/gesamt/suite-des-grauens/` unverändert nach
`~/.claude/skills/suite-des-grauens/` legen. Die Seite steht unter https://zwischenraum.special.at/.
