# Ps and Qs

*German edition: Setzkasten (the type case).*

*Mind your Ps and Qs, says the English idiom, and one explanation comes
from the type case: in metal type a small p and a small q are mirror
images, and the apprentice had to keep them apart. For three days a word
was Germanized, taken back and Germanized again. In the end only one
fitted: Setzkasten. In the typesetter's cases the capitals sat above and
the small letters below, which is why they are called upper case and lower
case. The one translation that was right was a few hundred years old
already.*

## One table per project

A file `GLOSSAR.md` in the root folder (or `GLOSSARY.md`, but only one of
the two), one row per term:

| in code | German for humans | English for the page | never say |
|---|---|---|---|
| request body | Inhalt der Anfrage (content of the request) | request body | Körpergröße (body size) |
| mock | Testbetrieb, vorgetäuscht (test mode, faked) | mock | Spott (mockery) |
| merge | zusammenführen (bring together) | merge | vermatschen (mash together) |
| thread | Gesprächsfaden (thread of a conversation) | thread | Faden allein (thread alone, a piece of yarn) |

## Rules

- **Every word is translated once**, then looked up. Whoever wants to
  translate looks in the table first.
- **New coinages** go into the table before they travel into a second text.
- **Bilingual pages and skills** take their translation table from the same
  file, so that page and skill don't speak two languages.
- **“Never say”** is the most important column. It is the project's memory
  of the catastrophes that have already happened.

## The one check

Before sending a text, search it for every entry in the “never say” column
(`Select-String -SimpleMatch` or `grep -iF`). Zero hits.

*Written by Falzbein, November 2026.*
