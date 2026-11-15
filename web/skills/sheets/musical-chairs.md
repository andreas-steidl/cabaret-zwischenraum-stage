# Musical chairs

*German edition: Leerer Platz, after a German circle game: “the seat on my
right is empty.”*

*When the music stops, every chair has exactly one sitter, or someone is
left standing. In an argument list an empty chair is a polite question that
every PowerShell answers differently, and with junctions two sit on the
same chair and both believe it is theirs.*

## Start-Process and the empty chair

A suffix that is not set is `''`, and
`Start-Process prog -ArgumentList @('eins', $suffix, 'drei')` then turns
out like this (checked on this machine):

| | Windows PowerShell 5.1 | PowerShell 7.6 |
|---|---|---|
| `Start-Process` | aborts: “The argument is null or empty” (German: „Das Argument ist NULL oder leer“), without saying which one | starts; the empty seat **disappears**, everyone moves up |
| `& prog eins '' drei` | the empty seat **disappears** | arrives correctly as `''` |

On top of that, with `Start-Process` in 7.6: `'mit leer'` arrives as
**two** arguments, because the list is simply glued together with spaces.

**What helps:** take the empty elements out beforehand and put arguments
with spaces in `"…"` yourself, or just use `&` in PowerShell 7:
```powershell
$argumente = @('eins', $suffix, 'drei') | Where-Object { $_ }
```

## Junction: one chair, two seat numbers

Borrowed folders via junction or symlink (`node_modules`, `venv`) have
two addresses, and tools choose differently. Called through a junction,
checked:
- **Python:** `__file__` and `sys.path[0]` show the **link**,
  `os.path.realpath(__file__)` the target.
- **Node:** `__filename` shows the **target** (except with `--preserve-symlinks`).
  Modules are therefore looked up from the real location, and two copies of
  the same library can run into each other without knowing each other.

Better to really install than to borrow.

## WSL: the watch that never sounds

Under WSL 2, `/mnt/c`, `/mnt/d` sit on a Windows drive (drvfs). Changes
that **Windows programs** make there do not, by common experience, announce
themselves via inotify (not verifiable on this machine, the WSL
distribution does not start). `inotifywait`, `watchdog` or a `--watch` mode
then wait forever, and silently. There, poll instead of listening (polling,
e.g. `PollingObserver`, `usePolling: true`), or keep the file in the Linux
file system. And give every watch a time limit.

## The one check

Let the target program say what arrived, before things get serious: put a
file `argv.py` containing `import sys; print(sys.argv[1:])` in place of the
program, with exactly the same argument list (not `python -c "…"`, whose
code `Start-Process` would split up on its own). If it counts different
seats, one of them stayed empty. For junctions, `(Get-Item path).LinkType`;
for watches, touch a file yourself once and see whether the alarm goes off.

*Written by Falzbein, November 2026.*
