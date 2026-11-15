# Houdini

*German edition: Fluchthelfer.*

*Harry Houdini got out of every chain, every lock, every milk can. ESC
means escape, and some characters are Houdinis: they slip out of the
terminal they were meant for and turn up again in files, logs and
comparisons.*

## Color codes that get written down too

Many tools color their output with ANSI sequences: `ESC [ 32 m` means
green, `ESC [ 0 m` means back to normal. In the terminal you see color, in a
file you see `←[32m`, `^[[32m` or `\x1b[32m`.

- **The result:** `grep "done"` finds nothing, because the text says
  `do\x1b[1mne`. JSON becomes invalid, a comparison fails silently.
- **Switch it off at the source** (best): `NO_COLOR=1` as an environment
  variable (many tools respect it), `--color=never` or `--no-color`,
  `git -c color.ui=never ...`, in PowerShell 7
  `$PSStyle.OutputRendering = 'PlainText'`.
- **Remove it afterwards:**
  ```python
  import re; sauber = re.sub(r"\x1b\[[0-?]*[ -/]*[@-~]", "", text)
  ```
  ```bash
  sed -E 's/\x1b\[[0-9;?]*[ -/]*[@-~]//g' log.txt
  ```

## Progress bars with a carriage return

A progress bar writes `\r` and overwrites the line. In the terminal you see
one line, in the log file there are a hundred half ones. To evaluate a log
like that, take only the part after the last `\r` of each line:
`zeile.rsplit("\r", 1)[-1]`. See also `return-to-sender`.

## How many backslashes?

Every layer a text travels through eats one level of escaping. Count the
layers from the inside out:

| Goal | in the pattern | in a Python string | in the JSON around it |
|---|---|---|---|
| a literal backslash in the regex | `\\` | `r"\\"` or `"\\\\"` | `"\\\\"` and `"\\\\\\\\"` respectively |
| a dot in the regex | `\.` | `r"\."` | `"\\."` |

Rules of thumb:
- **Python:** patterns always as raw strings, `r"..."`.
- **PowerShell:** `'single'` quotes, then everything stays literal;
  let `[regex]::Escape($text)` produce the regex escapes for you.
- **Bash:** patterns in `'single'` quotes; `$'...'` only when you really
  mean a control character (`$'\t'`, `$'\r'`).
- **JSON** is always one layer more. Better to build the object in the
  program and write it with `json.dumps` than to escape JSON by hand.

## The one check

After writing, search the file for the ESC character:
`grep -c $'\x1b' datei` must give 0 (PowerShell:
`(Get-Content datei -Raw).Contains([char]27)` must be `False`). And find the
text you are looking for again in the result, instead of believing the
pattern.

*Written by Falzbein, November 2026.*
