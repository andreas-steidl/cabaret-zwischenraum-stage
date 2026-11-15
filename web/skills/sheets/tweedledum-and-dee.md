# Tweedledum and Tweedledee

*German edition: Max und Moritz, after Wilhelm Busch's two rascals.*

*Lewis Carroll's twins look exactly alike and still insist they are two.
Windows takes them for one, everyone else counts two, and the trouble
happens right on the border in between.*

## JSON: two keys, one folder

`{"D:/Projects/X":1, "D:/projects/X":2}` is valid JSON.
`ConvertFrom-Json` refuses it anyway, in PowerShell 7 and 5.1, because
object properties there do not tell upper from lower case.

- **PowerShell 7:** `ConvertFrom-Json -AsHashtable`. The result is
  **case-sensitive**: `$h['d:/projects/x']` finds nothing, unlike an
  ordinary `@{}`.
- **Windows PowerShell 5.1** does not know `-AsHashtable`. Then use Python
  (`json.load`) or `pwsh`.

## PowerShell: $n is $N

`$n = 0` overwrites `$N`. Variables, functions, parameters, it is all the
same. The remedy is not caution, but names that differ by more than their
case: `$count`, `$number`.

## Git on Windows: core.ignorecase=true

- Git does not see `Rename-Item Readme.md README.md`: `git status` stays
  empty, `git ls-files` still says `Readme.md`. The right way is
  **`git mv Readme.md README.md`**; then the index holds the new spelling.
- If a repo comes from Linux with **both** files, `git clone` warns
  “the following paths have collided”, only one of them lands in the
  working tree, and `git status` immediately shows the other as modified.
  That is not your mistake, it is a twin in the repo. Rename one of them
  where the file system knows both.

## Path lists: D: and d:

All it takes to double up is a tool that counts differently from Windows.
Checked on this machine, with `'D:\a','d:\a'`:

| Tool | Result |
|---|---|
| `Sort-Object -Unique`, `Group-Object`, `@{}`, `-contains` | one path |
| `Select-Object -Unique`, `Get-Unique`, `-ccontains` | two paths |
| Python `set`, `==` | two; equal only with `os.path.normcase` or `PureWindowsPath` |

## The one check

Look for twins before they play their prank. `Group-Object` compares
without regard to case, so it finds them:
```powershell
git ls-files | Group-Object | Where-Object Count -gt 1
$pfade       | Group-Object | Where-Object Count -gt 1
```
Empty means: no twins. Anything else is Max and Moritz.

*Written by Falzbein, November 2026.*
