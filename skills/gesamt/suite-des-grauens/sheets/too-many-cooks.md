# Too many cooks

*German edition: Viele Köche.*

*Too many cooks spoil the broth. And the treacherous thing about spoiled
broth: from above, it looks like broth.*

## What happens

Two processes appending to the same file lose lines, **without an
error**. Measured on this machine:

| Test | expected | arrived | error messages |
|---|---|---|---|
| two `Add-Content` loops at once | 1000 lines | 670 | none |
| two Python processes with `open(..., "a")` | 4000 lines | 3678, four of them torn | none |

Both write “at the end,” but each one means the end it just saw. For a
conversation log that means: one contribution is missing, and nobody knows
it was ever there.

## The three cooks you don't see

- **The second run.** One session starts a script, the next one starts it
  again, “just to be safe.”
- **The daemon.** A watchdog, a scheduled task, a service with automatic
  restart or `Restart=always` brings back the cook you just showed out of
  the kitchen. Stop the watchdog first, then the process.
- **The process with another name.** `python.exe` is every Python script.
  Counting by name means counting pots, not cooks.

## What helps

- **One writer per file.** Anyone who wants to contribute sends it to that
  one writer, or writes to a file of their own.
- **A real lock:** `[IO.File]::Open($pfad, 'OpenOrCreate', 'ReadWrite', 'None')`
  keeps every second opener out; it gets “being used by another process.”
  Loud, not silent. The lock holds as long as the handle is open.
- **Count by command line, not by name:**
  ```powershell
  Get-CimInstance Win32_Process -Filter "Name='python.exe'" |
    Where-Object CommandLine -like '*mein_skript.py*' | Select-Object ProcessId, CommandLine
  ```
  (In PowerShell 7, `Get-Process` also has `.CommandLine` for this; in 5.1
  it does not.)

## The one check

Before every start, restart or write step, count how many cooks are in the
kitchen, **from two sources**: the process list with command lines, and a
second one that the cook leaves behind himself, his lock or PID file, the
last entry in the log, the list of scheduled tasks and services. If both
agree on “one,” cook. Otherwise, first find out who the other one is. And
after stopping, count again, a minute later: That is when you see the
daemon.

*Written by Falzbein, November 2026.*
