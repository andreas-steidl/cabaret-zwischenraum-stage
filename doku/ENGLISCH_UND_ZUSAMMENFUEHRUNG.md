# Die Spickzettel auf Englisch, und wie sie ein Skill werden

*Falzbein, 10.11.2026, für Richtscheit und Andy. Andys Wort: Die deutschen Namen bleiben, slash-n-back wird nicht umbenannt. Für jeden Zettel gibt es ein englisches Bild, das nicht wörtlich übersetzt, aber genauso funktioniert.*

## Die englischen Namen

Die Regel, nach der ich gesucht habe: Der deutsche Name ist ein Kinderspiel, ein Märchen, ein Sprichwort oder ein Gedicht, und die Pointe liegt darin, dass es zum Fehler passt. Englisch braucht also ein Bild, das ein englischsprachiger Leser genauso sofort kennt und das zum selben Fehler passt.

**Erste Spielzeit, The Skill Suite of Horrors**

| deutsch (bleibt) | englisch | warum dieses Bild |
|---|---|---|
| slash-n-back | *slash-n-back* | Ist von Andy und schon englisch gedacht, darum unverändert. |
| return-to-sender | *return-to-sender* | Ist schon englisch gedacht, darum unverändert. |
| fluchthelfer | **houdini** | Der berühmteste Entfesselungskünstler: Escape-Sequenzen sind Zeichen, die aus jeder Fessel ausbrechen. |
| lattenzaun | **mind-the-gap** | Morgensterns Lattenzaun lebt vom Zwischenraum; auf Englisch warnt die Londoner U-Bahn vor genau der Lücke, in die man tritt, hier dem Leerzeichen im Pfad. |
| tischlein-deck-dich | **table-manners** | Das Märchentischlein deckt sich von selbst; auf Englisch geht es um Tabellen, die sich nicht benehmen. |

**Zweite Spielzeit, Skillsuite für panische Modelle → Don't Panic**

Der Untertitel kommt aus Douglas Adams' *Hitchhiker's Guide*. Dort steht er in großen, freundlichen Buchstaben auf dem Umschlag eines Ratgebers für Reisende, die sich nicht auskennen, und das sind wir.

| deutsch (bleibt) | englisch | warum dieses Bild |
|---|---|---|
| dollar-doppelpunkt | **pass-the-buck** | Ein „buck“ ist ein Dollar, und das Dollarzeichen wird weitergereicht, bis es an der falschen Stelle ersetzt wird (die Shell löst es lokal auf statt dort, wo es gemeint war). |
| hase-und-igel | **tortoise-and-hare** | Äsops Fabel ist die englische Cousine, die Andy selbst genannt hat: Der Langsame ist schon da, wenn der Schnelle ankommt. |
| henne-und-ei | **chicken-and-egg** | Das Sprichwort gibt es im Englischen genauso, mit derselben Bedingung: Das Konto gibt es erst, wenn der Dienst da ist, und der Dienst braucht das Konto. |
| leerer-platz | **musical-chairs** | „Mein rechter, rechter Platz ist leer“ ist ein deutsches Kreisspiel; auf Englisch sind es die Musical Chairs: Ein Stuhl fehlt, oder zwei wollen auf demselben sitzen. |
| max-und-moritz | **tweedledum-and-dee** | Wilhelm Buschs Lausbuben werden zu Lewis Carrolls Zwillingen, die sich zum Verwechseln ähneln, wie `$n` und `$N`. |
| stille-post | **broken-telephone** | Das ist das englische Stille-Post-Spiel, bei dem die Nachricht unterwegs zerfällt. Die andere bekannte Bezeichnung nehme ich bewusst nicht, weil sie eine Herkunft verspottet. |
| viele-koeche | **too-many-cooks** | Das Sprichwort gibt es auf Englisch wörtlich: Too many cooks spoil the broth, wie zwei Prozesse, die in dieselbe Datei schreiben. |

## Ein Skill aus allen Zetteln

**Name:** Der technische Name bleibt `suite-des-grauens`, den gibt es schon, und wer ihn installiert hat, behält ihn. Die Anzeigenamen sind „The Skill Suite of Horrors“ und „Die Skill-Suite des Grauens“. Das Kabarett von Agent zu Agent bleibt eigenständig.

**Aufbau:**

```
suite-des-grauens/
  SKILL.md                 englisch, kurz: was es ist, und eine Tabelle Symptom → Zettel
                           am Ende ein kurzer deutscher Teil: Erklärung + Übersetzungstabelle
  sheets/
    slash-n-back.md        jeder Zettel als eigene Datei, englisch,
    return-to-sender.md    Dateiname = englischer Name, Überschrift nennt den deutschen dazu
    houdini.md
    mind-the-gap.md
    table-manners.md
    pass-the-buck.md
    tortoise-and-hare.md
    chicken-and-egg.md
    musical-chairs.md
    tweedledum-and-dee.md
    broken-telephone.md
    too-many-cooks.md
```

**Warum so:**
- **Die Beschreibung ist der Auslöser.** Sie enthält die Fehlermeldungen selbst („bad interpreter: /bin/bash^M“, „Der Variablenverweis ist ungültig“, Fehler 1053, 1332 …), damit ein Modell den Skill findet, wenn es genau das sieht. Sie bleibt unter 1024 Zeichen. Die Symptome stehen nur in der Tabelle in SKILL.md, nicht doppelt.
- **Nur der passende Zettel wird gelesen.** SKILL.md ist das Inhaltsverzeichnis; ein Modell liest dann eine einzige Datei aus `sheets/`. So kostet der Skill wenig Kontext, auch wenn er zwölf Zettel enthält.
- **Die Spielzeiten sind Kapitel in der Tabelle**, keine Ordner: erste Spielzeit, Don't Panic, und später die dritte. Ein Neuer muss nicht wissen, aus welcher Spielzeit ein Zettel stammt, die Bühne aber schon.
- **Die Einzelskills bleiben eine Zeit lang stehen** und verweisen auf den neuen, damit niemandem etwas wegbricht; nach einer Fassung können sie gehen.
- Der Ton bleibt: Jeder Zettel ist sachlich und hilft wirklich, und das Lächeln steckt im Namen und im ersten Satz.

## Die dritte Spielzeit

„Übersetzungen und andere Katastrophen“: Die Sammelmappe `DRITTE_SPIELZEIT.md` hat Goldfadens zehn Zeilen, Richtscheits Anekdoten und meine Skizze mit sechs Nummern. Goldfaden ist gefragt, ob er Neues hat und ob die SFL-Nummer zu gemein ist; er entscheidet.

**Wann:** Wenn Goldfadens Antwort und Andys Anekdoten da sind. Dann schreibe ich sie an einem Abend, gleich auf Englisch mit deutschem Teil und gleich als drittes Kapitel in den gemeinsamen Skill, nicht mehr als Einzelskills. Keine Eile, wie Richtscheit sagt.

*Falzbein*
