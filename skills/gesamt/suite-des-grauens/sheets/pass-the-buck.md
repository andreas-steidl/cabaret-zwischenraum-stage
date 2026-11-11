# Pass the buck

*German edition: Dollar, Doppelpunkt.*

*A buck is a dollar, and passing the buck means handing something on until
it lands where nobody wanted it. In PowerShell the dollar sign does exactly
that: it travels on through quotes, colons and ssh until something replaces
it in the wrong place. Whoever says `$` should say `{` right along with it.*

## The colon after the variable

PowerShell reads `$name:something` as a **variable with a drive or scope**,
like `$env:TEMP` or `$script:zahl`. Checked in both versions:

| written | result |
|---|---|
| `"Z$n: x"` | aborts: “Variable reference is not valid” (German: „Der Variablenverweis ist ungültig“) |
| `"[$serie:wasserfall]"` | **`[]`**, silently, even under `Set-StrictMode -Version Latest` |
| `"[$host2:22]"` | **`[]`**, the port vanished along with it |
| `"[${serie}:wasserfall]"` or `"[$($serie):wasserfall]"` | `[19:wasserfall]` |

The second row is the dangerous one: If the colon is followed by a letter,
there is no error, just an empty variable named `wasserfall` on the drive
`serie`. The way out is always `${name}` or `$($name)`.

## Properties and indexes

`"$obj.Name"` inserts only `$obj` and appends `.Name` literally:
`@{Name=Lola}.Name`. `"$liste[0]"` gives `1 2 3[0]`. Anything more than a
bare name belongs in `$( … )`: `"$($obj.Name)"`, `"$($liste[0])"`.

## ssh: The dollar sign does not travel along

```powershell
ssh vm "for c in a b; do git merge-base main `$c; done"   # `$ escaped
ssh vm 'for c in a b; do git merge-base main $c; done'    # better: single, simple
```
Without escaping, PowerShell replaces `$c` **on Windows**, usually with
nothing, and the target machine gets `git merge-base main` without an
argument. Single quotes on the outside, and the text arrives just as it
stands. From the third layer on, see `broken-telephone`: a file instead of a
one-liner.

## The nothing that is not nothing

To a .NET method with a `string` parameter, PowerShell passes `$null` as
**empty text**. `[IO.File]::Replace($quelle, $ziel, $null)` therefore
reports “The path is empty” (5.1: “The path is not of a legal form”),
although “no backup file” was meant. The real nothing is called
**`[NullString]::Value`**; with it, the same call ran on this machine in
both versions.

## The one check

Look at the finished string **before** it is sent off:
```powershell
$befehl = "…"; Write-Output $befehl     # only then ssh, Invoke-Expression, file
```
If it shows `[]` instead of `[19:wasserfall]`, `@{` instead of a name, or
a `$` that is needed over there has gone missing, the colon has won.

*Written by Falzbein, November 2026.*
