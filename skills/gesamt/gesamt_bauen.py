# -*- coding: utf-8 -*-
"""gesamt_bauen.py - setzt alle Spickzettel zu EINEM Skill zusammen: suite-des-grauens.

Andy, 10.11.2026 (über Richtscheit): Die Zettel werden ein Skill, englisch zuerst, mit kurzem
deutschem Teil; die deutschen Namen bleiben, jeder Zettel bekommt ein englisches Bild
(ENGLISCH_UND_ZUSAMMENFUEHRUNG.md). Andy: „Die Namen sind cool.“
Quelle sind die englischen Fassungen der Spielzeiten: ../../../01-grauen/skills/en/ und
../../../02-panik/skills/en/ (relativ zu diesem Skript). Das Skript ersetzt nur den Kopf jedes
Zettels (Titel und Einleitung) und die Verweise auf andere Zettel; der Inhalt bleibt, wie er ist.
Kein Manifest, keine Signatur (die kommen gesammelt am Schluss).

Aufruf:  python gesamt_bauen.py [zielordner]
Ohne Argument schreibt es nach suite-des-grauens/sheets/ neben diesem Skript.
SKILL.md des Gesamtskills ist von Hand geschrieben und wird nicht erzeugt.
"""
import io
import os
import re
import sys

HIER = os.path.dirname(os.path.abspath(__file__))
KABARETT = os.path.abspath(os.path.join(HIER, "..", "..", ".."))
EN1 = os.path.join(KABARETT, "01-grauen", "skills", "en")
EN2 = os.path.join(KABARETT, "02-panik", "skills", "en")
ZIEL = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HIER, "suite-des-grauens")

# deutscher Name -> (englischer Name, Quellordner, Spielzeit)
ZETTEL = [
    ("slash-n-back", "slash-n-back", os.path.join(EN1, "slash-n-back"), 1),
    ("return-to-sender", "return-to-sender", os.path.join(EN1, "return-to-sender"), 1),
    ("fluchthelfer", "houdini", os.path.join(EN1, "fluchthelfer"), 1),
    ("tischlein-deck-dich", "table-manners", os.path.join(EN1, "tischlein-deck-dich"), 1),
    ("lattenzaun", "mind-the-gap", os.path.join(EN1, "lattenzaun"), 1),
    ("henne-und-ei", "chicken-and-egg", os.path.join(EN2, "henne-und-ei"), 2),
    ("viele-koeche", "too-many-cooks", os.path.join(EN2, "viele-koeche"), 2),
    ("max-und-moritz", "tweedledum-and-dee", os.path.join(EN2, "max-und-moritz"), 2),
    ("dollar-doppelpunkt", "pass-the-buck", os.path.join(EN2, "dollar-doppelpunkt"), 2),
    ("stille-post", "broken-telephone", os.path.join(EN2, "stille-post"), 2),
    ("leerer-platz", "musical-chairs", os.path.join(EN2, "leerer-platz"), 2),
    ("hase-und-igel", "tortoise-and-hare", os.path.join(EN2, "hase-und-igel"), 2),
]

KOPF = {
"slash-n-back": """# slash'n'back

*German edition: same name. Slashes are weird, Windows is weird, PowerShell
is not bash. The name is a round trip: slash out, backslash back. No path
comes back the way it left.*

This catches every session sooner or later, very good ones too. It is not
a sign of incompetence, but of three languages that read the same character
differently. You don't have to know any of this by heart. It is enough to
check the result (at the very bottom).
""",
"return-to-sender": """# Return to sender

*German edition: same name. At the end of a line a typewriter does two
things: carriage back (CR, `\\r`) and line forward (LF, `\\n`). Windows kept
both, Linux and macOS only the feed. Ever since, in every mixed workshop,
somewhere a carriage comes back that nobody ordered. Hence the name, after
Elvis: the line goes out and comes back with one carriage return too many.*
""",
"houdini": """# Houdini

*German edition: Fluchthelfer.*

*Harry Houdini got out of every chain, every lock, every milk can. ESC
means escape, and some characters are Houdinis: they slip out of the
terminal they were meant for and turn up again in files, logs and
comparisons.*
""",
"table-manners": """# Table manners

*German edition: Tischlein, deck dich, after the Grimm tale of the table
that sets itself.*

*A table on screen keeps its manners only as long as every character takes
up exactly the space it promised. One umlaut, one emoji, one box-drawing
character on the wrong code page, and it puts its elbows on the table.*
""",
"mind-the-gap": """# Mind the gap

*German edition: Lattenzaun, after Christian Morgenstern's poem about a
picket fence and the space between its slats.*

*On the London Underground a voice warns you about the gap between train
and platform. On Windows nobody warns you: the gap sits in “Program Files”,
and whatever steps into it ends up somewhere other than you meant.*
""",
"chicken-and-egg": """# Chicken and egg

*German edition: Henne und Ei.*

*Which came first? On Windows the question is settled: the service. Its
account only hatches afterwards.*
""",
"too-many-cooks": """# Too many cooks

*German edition: Viele Köche.*

*Too many cooks spoil the broth. And the treacherous thing about spoiled
broth: from above, it looks like broth.*
""",
"tweedledum-and-dee": """# Tweedledum and Tweedledee

*German edition: Max und Moritz, after Wilhelm Busch's two rascals.*

*Lewis Carroll's twins look exactly alike and still insist they are two.
Windows takes them for one, everyone else counts two, and the trouble
happens right on the border in between.*
""",
"pass-the-buck": """# Pass the buck

*German edition: Dollar, Doppelpunkt.*

*A buck is a dollar, and passing the buck means handing something on until
it lands where nobody wanted it. In PowerShell the dollar sign does exactly
that: it travels on through quotes, colons and ssh until something replaces
it in the wrong place. Whoever says `$` should say `{` right along with it.*
""",
"broken-telephone": """# Broken telephone

*German edition: Stille Post.*

*In the game of telephone a message is whispered down a line. At the start
someone whispers “three tests red.” At the end, the last one says out loud:
“All good.” Nobody lied. It is just that everyone in the row was someone
else.*
""",
"musical-chairs": """# Musical chairs

*German edition: Leerer Platz, after a German circle game: “the seat on my
right is empty.”*

*When the music stops, every chair has exactly one sitter, or someone is
left standing. In an argument list an empty chair is a polite question that
every PowerShell answers differently, and with junctions two sit on the
same chair and both believe it is theirs.*
""",
"tortoise-and-hare": """# The tortoise and the hare

*German edition: Hase und Igel, the Grimm tale in which the hedgehog is
always already at the finish: “Ick bün all hier!”*

*In a chat the model is the hare. It dashes off, writes, works, asks, and
by the time the human arrives with an answer, the next thing is already
standing there. The human is not late. Just simultaneous.*
""",
}

# Wendungen im Inhalt, die zu den neuen Namen passen müssen
ERSETZEN = [
    ("Part of The Skill Suite for Panicking Models, the second program.", ""),
    ("Part of the Skill Suite of Horrors.", ""),
    ("The Skill Suite for Panicking Models", "Don't Panic"),
    ("Chinese whispers", "the telephone game"),
]


def lies(pfad):
    return io.open(pfad, encoding="utf-8").read().replace("\r\n", "\n")


def zerlege(text):
    """Frontmatter, Kopf (bis zur ersten ##-Überschrift) und Rest."""
    assert text.startswith("---\n"), "kein Frontmatter"
    ende = text.index("\n---\n", 4)
    rest = text[ende + 5:]
    m = re.search(r"^## ", rest, re.M)
    assert m, "keine ##-Überschrift"
    return rest[m.start():]


def verweise(text):
    for alt, neu, _, _ in ZETTEL:
        if alt != neu:
            text = re.sub(r"(?<![\w-])" + re.escape(alt) + r"(?![\w-])", neu, text)
    for alt, neu in ERSETZEN:
        text = text.replace(alt, neu)
    # Auslieferung ohne interne Bezeichnungen (Richtscheits Bezeichnungs-Scan muss 0 melden):
    # Beispielpfade werden neutral, Namen von Sitzungen und Menschen fallen aus dem Text.
    for alt, neu in NEUTRAL:
        text = text.replace(alt, neu)
    return text


def schluss(text, neu):
    """Die letzte Absatzzeile „*Written by … / *Found by …“ ersetzen. Sie nannte Fundstellen mit
    Namen von Sitzungen und zeigte auf Einzelskills; der Dank steht jetzt gesammelt in SKILL.md."""
    absaetze = text.rstrip().split("\n\n")
    if absaetze[-1].lstrip().startswith(("*Written by", "*Found by")):
        absaetze = absaetze[:-1]
    return "\n\n".join(absaetze) + "\n\n" + SCHLUSS.get(neu, "*Written by Falzbein, November 2026.*") + "\n"


NEUTRAL = [
    ("\\\\nas\\Public\\", "\\\\server\\share\\"),
    ("//nas/Public/", "//server/share/"),
    ("\\\\nas", "\\\\server"),
    ("\\nas", "\\server"),
    ("\\\\server\\Public", "\\\\server\\share"),
    ("datei.md", "file.md"),
    (" (Echolot)", ""),
    ("D:/Workspace", "D:/Projects"),
    ("d:/workspace", "d:/projects"),
    ("D:/workspace", "D:/projects"),
    ("D:\\\\Workspace", "D:\\\\Projects"),
    ("Richtscheit found exactly this trap that way", "A fellow session found exactly this trap that way"),
]

SCHLUSS = {
    "tortoise-and-hare": "*Written by Falzbein, November 2026, after a sentence from his human:\n"
                         "“Your human is always late.” He isn't. He is the hedgehog, and he was\n"
                         "already there.*",
}


def main():
    os.makedirs(os.path.join(ZIEL, "sheets"), exist_ok=True)
    for alt, neu, quelle, _ in ZETTEL:
        rumpf = zerlege(lies(os.path.join(quelle, "SKILL.md")))
        text = schluss(KOPF[neu] + "\n" + verweise(rumpf), neu)
        pfad = os.path.join(ZIEL, "sheets", neu + ".md")
        io.open(pfad, "w", encoding="utf-8", newline="\n").write(text)
        print("%-24s %6d Bytes  (aus %s)" % (neu + ".md", len(text.encode("utf-8")), alt))
    # Steuerzeichen-Probe (CLAUDE.md 9)
    for name in os.listdir(os.path.join(ZIEL, "sheets")):
        roh = io.open(os.path.join(ZIEL, "sheets", name), encoding="utf-8").read()
        schlecht = [c for c in roh if ord(c) < 32 and c not in "\n\t"]
        assert not schlecht, "Steuerzeichen in " + name


if __name__ == "__main__":
    main()
