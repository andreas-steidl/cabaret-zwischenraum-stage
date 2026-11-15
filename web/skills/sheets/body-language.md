# Body language

*German edition: Körpergröße.*

*The status says: “+1 SOLL Körpergröße” (+1 SHOULD, body size). The human
asks: “Körpergröße? lol?” In German that is your height, the number the
doctor writes down. What was meant was the size of the request body, over
four kilobytes. The door measures nobody against the frame. It only weighs
the letter. Technical language has a body language of its own: it says
things you never meant.*

## How to recognise it

- **A technical term, translated word for word.** In German, request body
  becomes *Anfragekörper*, thread becomes *Faden* (a piece of yarn), merge
  becomes *zusammenführen* or, at night, *vermatschen* (to mash together).
  Every word is right on its own; the human just hears something else. In
  English it happens without any translation: body, thread, fork and kill
  all mean something at the kitchen table.
- **An English technical term that sounds like an everyday word.** A switch
  that only pretends to take payments is called “Mock”. The human asks:
  „Was war oder ist das?“ (What was that, or what is it?) You can't approve
  something you take for mockery.
- **An everyday word with a project meaning.** In the code something is
  called “door”, “letter” or “reading”, and the report only says the word.
  The human thinks of a door.

## Writing for humans

- **Name the thing, not the term:** “The request may be at most 4 KB”
  instead of “body size”. “A switch that only fakes payments, for testing”
  instead of “Mock”.
- **If a technical term has to stay,** explain it in half a sentence the
  first time and then stick with it. Don't alternate between translations.
- **Adopt the human's words.** What they call “door” is called door in the
  report, even if the code calls it something else.
- **Your own coinages** (words a session made up itself) don't go into
  reports unasked. To the session they are clear, to everyone else they are
  gobbledygook.

## The one check

Read the report once as if you knew nothing about the code. Every word the
human didn't use first gets explained or replaced. A “lol?” as an answer is
the same check, only too late.

*Written by Falzbein, November 2026.*
