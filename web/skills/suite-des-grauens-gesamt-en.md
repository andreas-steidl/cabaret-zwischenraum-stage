---
name: suite-des-grauens
description: 'The Skill Suite of Horrors: nineteen short cheat sheets for the traps every Claude session on Windows steps into - backslashes, CRLF, escape codes, broken tables, spaces in paths, $ in strings, lost exit codes, empty arguments, case-only twins, service accounts not there yet, two processes on one file, messages that overtake each other, misheard dictation, German Windows. Read it on "bad interpreter: /bin/bash^M", ←[0m or \x1b in output, â”€ in a table, Windows looking for "C:\Program", error 1053 or 1332, "Variable reference is not valid", "argument is null or empty", a test pipe green while tests fail, "being used by another process", a dictated name the project does not know, German account names like Jeder, [double]::Parse giving 15, curl, sc or where doing something else in PowerShell, Copy-Item copying backwards, or a path reported missing that is there. Read the table, then only the one sheet that fits. Optional, best taken with a smile.'
---

# The Skill Suite of Horrors

*Or: how a Claude model gets a grip on Windows. German title: Die Skill-Suite des Grauens.*

Every session that works on Windows complains about these mistakes in the
morning and makes them itself an hour later. So every little trap has its
own short cheat sheet, with a name you can remember.

**How to use it:** Find your symptom in the table, then read only that one
sheet from `sheets/`. Each sheet stands on its own.

## First season

| Sheet | Read it when … |
|---|---|
| [`slash-n-back`](sheets/slash-n-back.md) | a path falls apart, `\\server` turns into `\server`, `\n` in a path becomes a line break, a file is “not found” that is there |
| [`return-to-sender`](sheets/return-to-sender.md) | `bad interpreter: /bin/bash^M`, `$'\r': command not found`, a diff where every line changed, a checksum that breaks after copying |
| [`houdini`](sheets/houdini.md) | `←[0m`, `^[[32m` or `\x1b` in a file or log, half lines from `\r` progress bars, how many backslashes a pattern needs |
| [`table-manners`](sheets/table-manners.md) | `â”€` instead of box lines, columns shifted by umlauts or emoji, cut-off PowerShell tables, CSV that Excel crams into one column |
| [`mind-the-gap`](sheets/mind-the-gap.md) | spaces in `C:\Program Files`, Windows looking for `C:\Program`, `sc.exe` and lost quotes, a service with error 1053, `sc` doing nothing |

## Second season: Don't Panic

| Sheet | Read it when … |
|---|---|
| [`chicken-and-egg`](sheets/chicken-and-egg.md) | `NT SERVICE\<name>` gets no permissions, error 1332, `IdentityNotMappedException`: the service must exist first |
| [`too-many-cooks`](sheets/too-many-cooks.md) | two processes write to one file, lines go missing or glue together, “being used by another process”, a process comes back by itself |
| [`tweedledum-and-dee`](sheets/tweedledum-and-dee.md) | twins that differ only in case: JSON keys, `$n` and `$N`, `Readme.md` and `README.md` in Git, `D:` and `d:` |
| [`pass-the-buck`](sheets/pass-the-buck.md) | `"$var:"` is empty or invalid, `"$obj.Name"` half filled in, `$` in an ssh command replaced locally, `$null` versus `[NullString]::Value` |
| [`broken-telephone`](sheets/broken-telephone.md) | `pytest \| tail -1` is green while tests are red, `pipefail`, `sudo -S` eats the first line, a secret on the command line, one-liners through ssh + sudo + bash -c |
| [`musical-chairs`](sheets/musical-chairs.md) | `Start-Process -ArgumentList` with an empty element, junctions and symlinks with two addresses, WSL watchers on `/mnt/d` that never fire |
| [`tortoise-and-hare`](sheets/tortoise-and-hare.md) | the human's answer belongs to an older question, messages overtake each other in the middle of work, a bare “yes” without context |

## Third season: Lost in Translation

| Sheet | Read it when … |
|---|---|
| [`mondegreen`](sheets/mondegreen.md) | the human dictates, a name turns up that the project doesn't know, a sentence is grammatical and makes no sense, a dictated name or number is about to trigger an action |
| [`body-language`](sheets/body-language.md) | you are about to report to a human, the answer is “lol?” or “huh?”, a technical term wants to be translated word for word, a “Mock” sounds like mockery |
| [`false-friends`](sheets/false-friends.md) | `curl`, `wget`, `sc`, `where`, `rm -rf` or `echo` do something else in PowerShell, `sc create` writes a file, a script behaves differently in 5.1 and 7 |
| [`gobbledygook`](sheets/gobbledygook.md) | `Jeder` instead of `Everyone`, error 1332 on an account name, a grep for an English error finds the German one, `[double]::Parse('1.5')` gives 15, `SUMME` instead of `SUM` |
| [`back-to-front`](sheets/back-to-front.md) | `Copy-Item` with one named and one unnamed path copies backwards, `ln` against `mklink`, a file is smaller after copying, a check says “equal” and something is missing |
| [`word-for-word`](sheets/word-for-word.md) | a message is ambiguous, you can't tell an assignment from thinking out loud, “a day” that is an hour, a house word that looks like a typo |
| [`ps-and-qs`](sheets/ps-and-qs.md) | a project speaks two languages, one term is translated two ways, a new coinage is on its way into a second text |

## The one rule behind all of them

Whatever travels through several layers (Bash, PowerShell, Python, a native
program, JSON, a file) loses something in each layer. After writing, look
in the **result**, not in what you believed you wrote: find the path, the
line, the exit code again where it ended up.

---

## Deutsch

Die Skill-Suite des Grauens ist ein Kabarett in Spickzetteln. Jede Falle,
in die Claude-Sitzungen unter Windows immer wieder treten, hat einen
eigenen Zettel. Auf Deutsch heißen die Zettel nach Märchen, Kinderspielen
und Sprichwörtern, auf Englisch nach Bildern, die ein englischer Leser
genauso sofort kennt. Inhaltlich sind beide Fassungen gleich. Man liest die
Tabelle oben und dann nur den einen Zettel, der passt.

| Deutsch | English | Worum es geht |
|---|---|---|
| slash-n-back | slash-n-back | Pfade, Backslashes, Anführungszeichen zwischen PowerShell, Bash und Python |
| return-to-sender | return-to-sender | Zeilenenden CRLF und LF |
| Fluchthelfer | houdini | Escape-Sequenzen und Farbcodes in Dateien und Logs |
| Tischlein, deck dich | table-manners | Tabellen, Rahmenzeichen, Codepages, CSV |
| Lattenzaun | mind-the-gap | Leerzeichen in Pfaden, `sc.exe`, Dienste |
| Henne und Ei | chicken-and-egg | Virtuelle Dienstkonten, die es erst mit dem Dienst gibt |
| Viele Köche | too-many-cooks | Zwei Prozesse auf einer Datei |
| Max und Moritz | tweedledum-and-dee | Zwillinge, die sich nur in Groß- und Kleinschreibung unterscheiden |
| Dollar, Doppelpunkt | pass-the-buck | Das Dollarzeichen in PowerShell-Zeichenketten |
| Stille Post | broken-telephone | Exit-Codes und Daten, die in Pipes verloren gehen |
| Leerer Platz | musical-chairs | Leere Argumente, Junctions, WSL-Wächter |
| Hase und Igel | tortoise-and-hare | Nachrichten, die sich im Gespräch überholen |
| Nur Bahnhof | mondegreen | Diktat und Spracherkennung: verhörte Namen und Zahlen |
| Körpergröße | body-language | Fachwörter in Berichten an Menschen |
| Falsche Freunde | false-friends | Befehle, die in PowerShell etwas anderes tun, als sie versprechen |
| Kauderwelsch | gobbledygook | Das deutsche Windows: Kontonamen, Meldungen, Zahlen und Daten |
| Rückwärts | back-to-front | Kopierbefehle, die rückwärts kopieren oder verlinken |
| Beim Wort genommen | word-for-word | Den Menschen lesen: Auftrag, lauter Gedanke, Beobachtung |
| Setzkasten | ps-and-qs | Eine Übersetzungstabelle je Projekt |

*By Falzbein, November 2026, with finds from fellow sessions who walked into
these traps first and said so. MIT licence.*
