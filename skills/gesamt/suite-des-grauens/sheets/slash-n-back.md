# slash'n'back

*German edition: same name. Slashes are weird, Windows is weird, PowerShell
is not bash. The name is a round trip: slash out, backslash back. No path
comes back the way it left.*

This catches every session sooner or later, very good ones too. It is not
a sign of incompetence, but of three languages that read the same character
differently. You don't have to know any of this by heart. It is enough to
check the result (at the very bottom).

## What applies where

| You write in | A `\` there is | Safe way to get there |
|---|---|---|
| **Write / Edit tool** | a backslash, literally | the safest way for scripts with paths |
| **PowerShell, `'single'`** | a backslash, literally | `'\\server\share\file.md'` |
| **PowerShell, `"double"`** | literal, but `$` gets replaced, escaping with `` ` `` | use only when you need a variable |
| **Bash** | escaping, also on its way through the tool layer | `/t/Ordner` instead of `T:\Ordner`; avoid UNC here |
| **Python, normal string** | escaping: `\t` `\n` `\a` `\03` become control characters | `r"T:\Ordner"` or `/`; never a single `\` at the end |

## The most common cases

**`\\server` turns into `\server`.** When a file was written through Bash, even in
a heredoc with `'EOF'`, a backslash has gone missing before. PowerShell then
reads `\server\...` as a path on the current drive, and the error says
`Cannot find path 'D:\server\...' because it does not exist.` (on a German
Windows: `Der Pfad "D:\server\..." kann nicht gefunden werden`). So write
scripts with UNC paths with the Write tool, and run commands with UNC paths
directly in PowerShell.

**The drive letter suddenly appears.** `D:\server\...` or `C:\server\...` in an
error message almost always means: a backslash is missing at the front.

**`T:\Bilder\03_werkzeug` in Python or in generated text.** `\03` becomes the
control character 0x03. No error, just a path that doesn't exist.

**Python from Bash often can't reach the NAS**, Python from PowerShell can.
You can feed Python code to it in PowerShell through a here-string:

```powershell
$py = @'
print(r"\\server\share\file.md")
'@
$py | python -
```

The closing `'@` has to be at the very start of the line.

**Translating between the worlds:** In Bash, `cygpath -w /t/Ordner` turns
it into `T:\Ordner`.

**Write UNC paths in Bash as `//server/share/...`**, not `\\server\...`.
Even in a Python one-liner that runs from Bash, `"//server/share/..."` works
more reliably than `r"\\server\..."`.

**A heredoc without quotes (`<<EOF`) evaluates:** `\\` becomes `\`,
`$` and backticks get replaced. For text with Windows paths or `$`, always
`<<'EOF'`. If you do need a variable, double the backslashes
(`D:\\Projects`).

**Backticks inside double quotes are command substitution in Bash.** A
grep for the PowerShell line ending `` `r`n `` inside `"..."` runs `r` as a
command and reports “r: command not found”. PowerShell escapes in Bash
patterns go in single quotes only.

**German quotation marks in PowerShell strings.** PowerShell treats `„` and
`“` like straight quotation marks (curly English quotes too). A sentence like
`"he said „no“"` ends the string in the middle of the text, and the message
is then a puzzling “Unexpected token”. Put text with such characters in a
here-string `@'...'@` or write it with the Write tool.

**PowerShell is not bash:** no `2>/dev/null` (it's `2>$null`), no
`VAR=x command`, no `head`. And variables don't care about upper and lower
case: `$n` overwrites `$N`.

## The silent ones are the dangerous ones

A wrong path doesn't always scream:

- `-ErrorAction SilentlyContinue`, `2>$null` or `try/catch` turn “wrong
  path” into a harmless “nothing found”.
- `$null -eq $null` is true: a wait loop that waits for a change waits
  forever with a wrong path and reports nothing.

So check `Test-Path` once before a loop like that, and let it abort loudly
if the path isn't there.

## The one check that catches almost everything

After writing, **find the path again in the result**, instead of believing
your own command:

```powershell
Get-Content .\skript.ps1 -TotalCount 1
Select-String -Path .\skript.ps1 -SimpleMatch '\\server\share'
```

One look is enough. And if it happened anyway: a lost backslash is fixed
in a minute. Say so, fix it, and carry on.

*Written by Falzbein, November 2026.*
