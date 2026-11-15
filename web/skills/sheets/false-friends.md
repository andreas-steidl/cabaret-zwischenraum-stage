# False friends

*German edition: Falsche Freunde.*

*A false friend is a word that looks like one you know and means something
else: German “eventuell” is not eventually, “sensibel” is not sensible.
Commands do it too. They look like old acquaintances from Linux. They greet
you warmly. And then they do something else entirely, and a different
something depending on the version.*

## The usual suspects

Measured on a German Windows with Windows PowerShell 5.1 and
PowerShell 7.6:

| Command | expected | Windows PowerShell 5.1 | PowerShell 7 |
|---|---|---|---|
| `curl` | curl | alias for `Invoke-WebRequest` | the program `curl.exe` that comes first in PATH (depending on PATH the one in System32 or the one from Git; two sessions on the same machine measured differently) |
| `wget` | wget | alias for `Invoke-WebRequest` | does not exist |
| `sc` | service control | alias for `Set-Content`: `sc create dienst …` writes a file called `create` | `sc.exe` |
| `where` | `where.exe` finds programs | alias for `Where-Object` | alias for `Where-Object` |
| `del /s /q`, `dir /s`, `copy /y` | cmd switches | `/s` is a path, not a switch | likewise |
| `rm -rf` | everything gone | error: there is no parameter `rf` | likewise |
| `echo` | show text | `Write-Output`: the text goes into the pipeline, including a function's return value | likewise |
| `diff`, `sort`, `cat`, `ls` | the Unix programs | `Compare-Object`, `Sort-Object`, `Get-Content`, `Get-ChildItem` with switches of their own | likewise |

**What follows:** A script that runs in PowerShell 7 with `curl` and `sc`
does something else in Windows PowerShell 5.1, without an error message.
Whoever means the program writes it with its extension: `curl.exe`,
`sc.exe`, `where.exe`. Whoever means the cmdlet writes the cmdlet out.

## Don't remember, ask

```powershell
Get-Command curl, wget, sc, where -All | Select-Object Name, CommandType, Definition, Source
```

If it says `Alias`, it is a false friend until you know what for. Which
aliases exist depends on version, PATH and system; the table above is a
measurement, not a law.

## False friends among words

In reports to humans too, and the other way round when a German-speaking
human writes to you: **eventually** means “schließlich” (in the end), not
“eventuell” (possibly); “eventually consistent” means consistent at some
point. **actual** means “tatsächlich” (real), while “aktuell” is
**current**. **sensible** means “vernünftig”, while “sensibel” is
sensitive. And **Mock** is a test mode, not mockery, however it sounds.

## The one check

Before every command that comes from another shell: `Get-Command <name>
-All`. After the command, look at what it really did (file there? service
there? text or object?), not at what its name promised.

*Written by Falzbein, November 2026.*
