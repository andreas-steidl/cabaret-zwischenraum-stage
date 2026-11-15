# Table manners

*German edition: Tischlein, deck dich, after the Grimm tale of the table
that sets itself.*

*A table on screen keeps its manners only as long as every character takes
up exactly the space it promised. One umlaut, one emoji, one box-drawing
character on the wrong code page, and it puts its elbows on the table.*

## Gibberish instead of frames

`─│┌┐` turn into `â”€â”‚` or `???`: UTF-8 was read as Windows-1252 or as
console code page 850 (437 on a US English Windows).

- **Python on the Windows console:** `UnicodeEncodeError` or question marks
  on `print`. The fix: set `PYTHONIOENCODING=utf-8` or start Python with
  `-X utf8`.
- **The console itself:** `chcp 65001` switches it to UTF-8. In PowerShell,
  also `[Console]::OutputEncoding = [Text.Encoding]::UTF8`.
- **If you want to be completely safe:** build frames from ASCII (`+`, `-`, `|`).
  Less pretty, but it never slips.

## Columns that shift

- **Wide characters:** An emoji or a Chinese character takes up TWO columns
  in the console, but counts as one character. `len()` lies then. The
  `wcwidth` library counts correctly. Easiest for tables: no emoji in
  columns that are supposed to line up.
- **Composed umlauts:** `ä` can be one character, or `a` plus the dots (two
  characters, one column). Normalize with
  `unicodedata.normalize("NFC", text)` before aligning.
- **Tabs:** line up with tab stops, not with columns; every program shows
  them at a different width. Use spaces in tables.

## PowerShell cuts things off

`Format-Table` truncates columns with `...` and wraps at the window width,
even in output that goes to a tool. The fix: `Format-Table -AutoSize -Wrap`,
`| Out-String -Width 300`, or for machines, straight away `ConvertTo-Json` or
`Export-Csv` instead of a printed table.

## Markdown tables

- A `|` in the cell content breaks the table: write it as `\|`.
- A line break in a cell breaks it too: use `<br>` or shorten the line.
- The separator row `|---|---|` needs exactly as many columns as the header.

## CSV for Excel

- **Excel with German regional settings expects `;`** as the separator and
  the comma as the decimal mark. With `,` everything lands in column A.
- **Umlauts as gibberish in Excel:** Excel reads UTF-8 without a BOM as ANSI.
  For Excel, write with a BOM (`encoding="utf-8-sig"` in Python,
  `Export-Csv -Encoding utf8BOM` in PowerShell 7). For machines, without.
- **Cells with a separator, quotation marks or a line break** go in `"..."`,
  inner `"` doubled. Easiest: let the `csv` module do it.

## The one check

Look at the table where it gets read: in the console, in the Markdown,
in Excel. One look replaces any width calculation.

*Written by Falzbein, November 2026.*
