# Return to sender

*German edition: same name. At the end of a line a typewriter does two
things: carriage back (CR, `\r`) and line forward (LF, `\n`). Windows kept
both, Linux and macOS only the feed. Ever since, in every mixed workshop,
somewhere a carriage comes back that nobody ordered. Hence the name, after
Elvis: the line goes out and comes back with one carriage return too many.*

## How to spot it

| Message / sign | what's going on |
|---|---|
| `/bin/bash^M: bad interpreter` | shell script with CRLF on Linux |
| `$'\r': command not found`, `syntax error near unexpected token $'do\r'` | the same, one line further down |
| Diff shows every line as changed | line endings rewritten, content the same |
| `"abc" != "abc"` in Bash, comparison fails silently | a `\r` is stuck to the value (read from a file or a Windows program) |
| Checksum, signature or blockmap doesn't match after a copy | the copy “repaired” the line endings |
| Windows won't accept `.theme`, `.bat`, `.reg`, or reads nonsense | LF where CRLF is expected |

## Look, don't guess

```bash
file datei.sh                          # "with CRLF line terminators"
grep -c $'\r' datei.sh                 # lines with CR (0 = pure LF)
git ls-files --eol                     # per file: i/ = in the repo, w/ = in the working tree
```
```powershell
(Get-Content datei -Raw).Contains("`r`n")
```
```python
d = open(p, "rb").read(); print(d.count(b"\r\n"), d.count(b"\n") - d.count(b"\r\n"))  # CRLF, pure LF
```

## The traps, by tool

- **Python writes CRLF in text mode on Windows.** `open(p, "w")` turns
  every `\n` into `\r\n`. For Linux files `open(p, "w", newline="\n")`, for
  Windows files explicitly `newline="\r\n"`. When reading, text mode turns
  both into `\n`. `.split("\n")` on raw text leaves the `\r` at the end of
  the line, `.splitlines()` doesn't.
- **PowerShell:** `Set-Content` and `Out-File` write the platform's line
  ending, so CRLF on Windows. If you need LF:
  `[IO.File]::WriteAllText(p, ($text -replace "`r`n", "`n"))`. Here-strings
  in a CRLF script file carry CRLF inside them.
- **Bash:** `read` keeps the `\r`, so does `$(cat datei)`. Clean it with
  `wert=${wert%$'\r'}` or `tr -d '\r'`. Repair a file: `sed -i 's/\r$//' datei`
  (or `dos2unix`, if it's there).
- **Git:** `core.autocrlf` is set differently from machine to machine. What
  has to hold reliably belongs in the repo, in `.gitattributes`:
  ```
  * text=auto eol=lf
  *.ps1 text eol=crlf
  *.bat text eol=crlf
  *.cmd text eol=crlf
  *.sh  text eol=lf
  *.png binary
  ```
  Then run `git add --renormalize .` once and book it as a commit of its
  own, otherwise the switch disappears inside a feature diff.
- **Git, when checksums matter:** Where the SHA-256 of a file has to be the
  same on Windows and Linux, `* -text` in `.gitattributes` is the safe
  choice. Git then never converts, the bytes stay exactly as checked in. With
  `core.autocrlf=true` or `text=auto`, Windows writes CRLF on checkout,
  and every hash check fails. (Echolot, Python service for both systems)
- **Fetching a file from another commit, byte for byte:**
  `git show <commit>:<path> > target`, then compare the hash. Copy and paste
  through an editor likes to change the line endings.
- **Protocols over stdout** (JSON-RPC, MCP, anything the other end reads
  line by line): append the line ending yourself as `b"\n"` and write in
  binary (`sys.stdout.buffer.write(...)`), never `print()` or
  `os.linesep`. Otherwise `\r\n` arrives at the other end on Windows.
- **Regex:** In .NET (PowerShell), `$` in multiline mode matches BEFORE `\n`,
  not before `\r`, so the `\r` ends up in the match. Better to write `\r?$`.
- **WSL:** Files under `/mnt/c/...` keep their Windows line endings. A
  script that was saved under Windows doesn't run under Linux just because
  it lives there.

## Encoding, the cousin

Same family, one character further up the file:

- **Windows PowerShell 5.1 reads files without a BOM as ANSI.** Scripts
  that should run there too are best written in plain ASCII (ae, oe, ue, ss
  for the umlauts), otherwise umlauts turn into mojibake or a string breaks.
  PowerShell 7 reads UTF-8 without a BOM correctly.
- **`Set-Content -Encoding UTF8` writes a BOM under 5.1.** Whoever reads
  that from Python needs `encoding="utf-8-sig"`, otherwise `json.load`
  fails on the very first character.
- **JSON that gets hashed or signed** should be produced with fixed
  separators (`separators=(",", ":")`, plus `sort_keys=True` if the order
  isn't fixed), so the bytes stay stable. `ensure_ascii=False` only where
  humans read.
- **Commit messages through a heredoc** written in ASCII avoid encoding
  trouble between Git Bash, cmd and Git for Windows.

## Who needs what

| CRLF | LF | doesn't matter, but consistent |
|---|---|---|
| `.bat`, `.cmd`, `.reg`, `.theme`, `.ps1` (recommended) | `.sh`, `Dockerfile`, `Makefile`, anything that runs under Linux | `.md`, `.json`, `.py`, `.yml`, `.csv` (then pin it down in the repo) |

## Rule of thumb

Whoever writes a file for the other system names the line ending
explicitly, instead of leaving it to the tool. And whoever takes a checksum
over text first checks that both sides have the same line endings,
otherwise they are comparing carriages instead of words.

*Written by Falzbein, November 2026.*
