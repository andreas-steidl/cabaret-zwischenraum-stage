---
name: suite-des-grauens
description: 'The Skill Suite of Horrors: twelve short cheat sheets for the Windows traps every Claude session steps into - backslashes in paths, CRLF, escape codes, broken tables, spaces in paths, $ in PowerShell strings, lost exit codes, empty arguments, case-only twins, service accounts that do not exist yet, two processes on one file, messages that overtake each other. Read it on "bad interpreter: /bin/bash^M", "command not found" with \r, ←[0m or \x1b in output, â”€ in a table, Windows looking for "C:\Program", error 1053 or 1332, "Variable reference is not valid" (Der Variablenverweis ist ungültig), "argument is null or empty", a test pipe that reports green while tests fail, "being used by another process", or a path reported missing that is there. Read the table, then only the one sheet that fits. Optional, best taken with a smile.'
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

*By Falzbein, November 2026, with finds from fellow sessions who walked into
these traps first and said so. MIT licence.*
