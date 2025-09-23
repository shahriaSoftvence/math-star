import React from "react";

export const metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB) — Math Star",
  description:
    "Allgemeine Geschäftsbedingungen (AGB) für Math-Star.de. Hier finden Sie alle Informationen zu Vertragsbedingungen, Laufzeiten, Preisen, Widerrufsrecht, Nutzungsrechten und Haftung.",
};

export default function TermsPage() {
  return (
    <div>
      <main className="max-w-7xl mx-auto p-3 md:p-8 space-y-8 mt-24 text-zinc-900 text-justify">
        {/* Heading */}
        <h1 className="text-2xl font-bold font-Quicksand">
          Allgemeine Geschäftsbedingungen (AGB) für Math-Star.de
        </h1>
        <p className="text-sm italic"><strong>Stand:</strong> 21.09.2025</p>

        {/* 1. Anbieter und Geltungsbereich */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">1. Anbieter und Geltungsbereich</h2>
          <div className="text-sm leading-relaxed space-y-1.5">
            <p>
              <span className="font-semibold">Anbieter der Lernplattform Math-Star.de:</span> Stefan Breitkreuz
              <br />
              Bayernstraße 30
              <br />
              63739 Aschaffenburg
              <br />
              Deutschland
            </p>

            <p>
              <span className="font-semibold">E-Mail: </span>{" "}
              <a href="mailto:info@star-math.de" className="text-blue-600 hover:underline">
                info@star-math.de
              </a>

              <br />
              <span className="font-semibold">Steuernummer:</span> [Steuernummer ergänzen]
            </p>

            <p className="font-semibold">
              Einzelunternehmen nach deutschem Recht
            </p>
          </div>
          <p className="text-sm leading-relaxed">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen dem Anbieter Stefan Breitkreuz und den Nutzern der Online-Lernplattform Math-Star.de (nachfolgend &quot;Plattform&quot;). Sie regeln die Nutzung sowohl der kostenlosen als auch der kostenpflichtigen Lerninhalte und Funktionen der Plattform.
          </p>
          <p className="text-sm leading-relaxed">
            Die AGB gelten für alle Zugangsformen zur Plattform, einschließlich Website (math-star.de) und mobile Anwendungen. Mit der Registrierung und/oder dem Vertragsabschluss erkennt der Nutzer diese AGB als verbindlich an.
          </p>
          <p className="text-sm leading-relaxed">
            Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
        </section>

        {/* 2. Vertragsgegenstand und Leistungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">2. Vertragsgegenstand und Leistungen</h2>

          <h3 className="text-sm font-bold">2.1 Lernplattform</h3>
          <p className="text-sm leading-relaxed">
            Der Anbieter stellt über die Plattform Math-Star.de digitale Lerninhalte im Bereich Mathematik zur Verfügung. Die Inhalte umfassen interaktive Übungen, Lernvideos, Arbeitsblätter und weitere digitale Lernmaterialien.
          </p>

          <h3 className="text-sm font-bold">2.2 Kostenlose und kostenpflichtige Inhalte</h3>
          <p className="text-sm leading-relaxed">
            Die Plattform bietet sowohl kostenlose Basis-Inhalte als auch kostenpflichtige Premium-Inhalte an. Der Umfang der jeweiligen Leistungen ist in der aktuellen Leistungsbeschreibung auf der Website detailliert aufgeführt.
          </p>

          <h3 className="text-sm font-bold">2.3 Technische Voraussetzungen</h3>
          <p className="text-sm leading-relaxed">Zur Nutzung der Plattform benötigt der Nutzer:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Einen internetfähigen Computer, Tablet oder Smartphone</li>
            <li>Einen aktuellen Webbrowser mit aktiviertem JavaScript</li>
            <li>Eine stabile Internetverbindung</li>
            <li>Für mobile Nutzung: Kompatibles Betriebssystem (iOS/Android)</li>
          </ul>

          <h3 className="text-sm font-bold">2.4 Verfügbarkeit</h3>
          <p className="text-sm leading-relaxed">
            Die Plattform ist grundsätzlich 24 Stunden täglich, 7 Tage die Woche verfügbar. Ausgenommen sind geplante Wartungsarbeiten, die in der Regel sonntags zwischen 2:00 und 4:00 Uhr durchgeführt werden. Der Anbieter wird geplante Wartungsarbeiten mindestens 48 Stunden vorher auf der Plattform bekannt geben.
          </p>

          <h3 className="text-sm font-bold">2.5 Gewährleistung und Richtigkeit der Inhalte</h3>
          <p className="text-sm leading-relaxed"><span className="font-semibold">Sorgfältige Inhaltserstellung:</span> Die Lerninhalte werden nach bestem Wissen und Gewissen sowie unter Anwendung anerkannter pädagogischer und fachlicher Standards erstellt.</p>
          <p className="text-sm font-semibold">Haftungsausschluss für Inhaltsrichtigkeit:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Eine Garantie für die vollständige Richtigkeit, Aktualität oder Vollständigkeit der Lerninhalte kann nicht übernommen werden</li>
            <li>Insbesondere bei sich ändernden Lehrplänen, Prüfungsordnungen oder wissenschaftlichen Erkenntnissen können Anpassungen erforderlich werden</li>
            <li>Nutzer sind verpflichtet, sich bei wichtigen Entscheidungen (Prüfungen, Abschlüsse) zusätzlich aus anderen Quellen zu informieren</li>
          </ul>

          <p className="text-sm leading-relaxed"><span className="font-semibold">Kardinalpflichten bleiben unberührt: </span>Die Haftung für vorsätzlich oder grob fahrlässig unrichtige Inhalte sowie für die Verletzung wesentlicher Vertragspflichten (ordnungsgemäße Bereitstellung der Lernplattform) bleibt bestehen.</p>

          <p className="text-sm leading-relaxed"><span className="font-semibold">Kontinuierliche Verbesserung: </span>Der Anbieter ist bemüht, Fehler schnellstmöglich zu korrigieren. Nutzer werden gebeten, inhaltliche Fehler über info@star-math.de zu melden.</p>

          <p className="text-sm leading-relaxed"><span className="font-semibold">Keine Lernerfolgs-Garantie: </span>Eine Garantie für bestimmte Lernerfolge, Prüfungsergebnisse oder Notenverbesserungen wird ausdrücklich nicht übernommen. Der Lernerfolg hängt von individuellen Faktoren und dem Engagement des Nutzers ab.</p>
        </section>

        {/* 3. Vertragsschluss */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">3. Vertragsschluss und Nutzerkonto</h2>

          <h3 className="text-sm font-bold">3.1 Registrierung</h3>
          <p className="text-sm leading-relaxed">
            Für die Nutzung kostenpflichtiger Inhalte ist eine Registrierung mit der Erstellung eines Nutzerkontos erforderlich. Bei der Registrierung sind vollständige und wahrheitsgemäße Angaben zu machen.
          </p>

          <h3 className="text-sm font-bold">3.2 Vertragsschluss</h3>
          <p className="text-sm leading-relaxed">
            Vertragsschluss für kostenpflichtige Leistungen erfolgt durch:
          </p>
          <ol className="ml-2.5 list-decimal list-inside text-sm leading-relaxed">
            <li>Auswahl des gewünschten Premium-Abonnements</li>
            <li>Eingabe der erforderlichen Daten und Zahlungsinformationen</li>
            <li>Bestätigung der Bestellung durch Klick auf &quot;Kostenpflichtig bestellen&quot;</li>
            <li>Weiterleitung zum Zahlungsdienstleister Stripe</li>
            <li>Erfolgreiche Zahlungsabwicklung</li>
          </ol>


          <p className="text-sm leading-relaxed">
            Nach erfolgreichem Vertragsschluss erhält der Nutzer eine Bestätigungs-E-Mail mit den Vertragsdaten.
          </p>

          <h3 className="text-sm font-bold">3.3 Account-Sicherheit</h3>
          <p className="text-sm leading-relaxed">
            Der Nutzer ist verpflichtet, seine Zugangsdaten vertraulich zu behandeln und vor dem Zugriff Dritter zu schützen. Bei Verdacht auf Missbrauch ist der Anbieter unverzüglich zu informieren. Das Teilen von Accounts mit Dritten ist nicht gestattet.
          </p>
        </section>


        {/* 4. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">4. Vertragslaufzeit und Kündigung</h2>
          <h3 className="text-sm font-bold">4.1 Laufzeit kostenpflichtiger Verträge</h3>
          <p className="text-sm leading-relaxed">
            Kostenpflichtige Abonnements haben eine Mindestlaufzeit von einem (1) Monat und verlängern sich automatisch um jeweils einen weiteren Monat, sofern nicht rechtzeitig gekündigt wird.
          </p>

          <h3 className="text-sm font-bold">4.2 Ordentliche Kündigung</h3>
          <p className="text-sm leading-relaxed">Beide Vertragsparteien können den Vertrag mit einer Frist von 30 Tagen zum Ende der jeweiligen Vertragslaufzeit kündigen.
          </p>

          <p className="text-sm font-semibold">Kündigungsmöglichkeiten für den Nutzer:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Online über die Kündigung-Funktion im Nutzerkonto</li>
            <li>Per E-Mail an info@star-math.de</li>
            <li>Per Brief an die oben genannte Adresse</li>
          </ul>

          <p className="text-sm leading-relaxed">Der Nutzer erhält eine Kündigungsbestätigung per E-Mail.</p>
          <p className="text-sm leading-relaxed"><span className="font-semibold">Kündigung durch den Anbieter: </span>Kündigungen durch den Anbieter werden per E-Mail an die hinterlegte E-Mail-Adresse des Nutzers versandt.</p>

          <h3 className="text-sm font-bold">4.3 Außerordentliche Kündigung</h3>
          <p className="text-sm leading-relaxed">Das Recht zur fristlosen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei:
          </p>

          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Zahlungsverzug von mehr als 30 Tagen</li>
            <li>Schwerwiegenden Verstößen gegen diese AGB</li>
            <li>Missbrauch der Plattform oder illegaler Nutzung</li>
          </ul>

          <h3 className="text-sm font-bold">4.4 Folgen der Beendigung</h3>
          <p className="text-sm leading-relaxed">Nach Beendigung des Vertrags:</p>

          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Erlischt das Nutzungsrecht für Premium-Inhalte sofort</li>
            <li>Werden persönliche Daten gemäß der Datenschutzerklärung behandelt</li>
            <li>Können Lernfortschrittsdaten 30 Tage zur Wiederherstellung gespeichert bleiben</li>
          </ul>
        </section>

        {/* 5. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">5. Preise und Zahlungsbedingungen</h2>
          <h3 className="text-sm font-bold">5.1 Preise</h3>
          <p className="text-sm leading-relaxed">Die aktuell gültigen Preise sind auf der Website math-star.de ersichtlich. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
          </p>

          <h3 className="text-sm font-bold">5.2 Zahlungsmodalitäten</h3>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Die Zahlung erfolgt monatlich im Voraus für die gesamte Vertragslaufzeit</li>
            <li>Zahlungsabwicklung über den Zahlungsdienstleister Stripe Inc.</li>
            <li>·	Verfügbare Zahlungsmethoden: Kreditkarte, SEPA-Lastschrift, weitere durch Stripe unterstützte Methoden</li>
          </ul>
          <h3 className="text-sm font-bold">5.3 Zahlungsverzug</h3>
          <p className="text-sm leading-relaxed">Bei Zahlungsverzug:
          </p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Erste Mahnung: 5,00 EUR Mahngebühr nach 14 Tagen Verzug</li>
            <li>Zweite Mahnung: 10,00 EUR Mahngebühr nach weiteren 14 Tagen</li>
            <li>Der Zugang kann nach 30 Tagen Zahlungsverzug gesperrt werden</li>
            <li>Bei dauerhaftem Zahlungsverzug wird ein Inkassounternehmen beauftragt</li>
          </ul>

          <h3 className="text-sm font-bold">5.4 Preisänderungen</h3>
          <p className="text-sm leading-relaxed"><span className="font-semibold">Preisänderungen als Neuvertragsangebot: </span>Beabsichtigt der Anbieter eine Preisänderung, kündigt er den bestehenden Vertrag mit einer Frist von 30 Tagen und unterbreitet gleichzeitig ein Angebot zum Abschluss eines neuen Vertrags zu den geänderten Preisen.</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li><span className="font-semibold">Ausdrückliche Annahme: </span>Der Nutzer kann das Neuvertragsangebot ausdrücklich durch Bestätigung per E-Mail oder über sein Nutzerkonto annehmen</li>
            <li><span className="font-semibold">Konkludente Annahme: </span>Nutzt der Nutzer die Plattform nach Ablauf der Kündigungsfrist weiter, gilt dies als Annahme des Neuvertragsangebots zu den geänderten Preisen</li>
            <li><span className="font-semibold">Ablehnung: </span>Bei Ablehnung des Neuvertragsangebots endet das Vertragsverhältnis zum Ablauf der Kündigungsfrist</li>
          </ul>
          <p className="text-sm leading-relaxed"><span className="font-semibold">Zugang bei Ablehnung: </span>Nimmt der Nutzer das Neuvertragsangebot nicht an, wird der Zugang zu kostenpflichtigen Inhalten zum Zeitpunkt der Vertragsbeendigung automatisch beendet.</p>
        </section>

        {/* 6. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">6. Widerrufsrecht für Verbraucher</h2>
          <h3 className="font-semibold">6.1 Widerrufsbelehrung</h3>
          <h3 className="text-sm font-bold">Widerrufsrecht</h3>
          <p className="text-sm leading-relaxed">Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
          <p className="text-sm leading-relaxed">Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
          <p className="text-sm leading-relaxed">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Stefan Breitkreuz, Bayernstraße 30, 63739 Aschaffenburg, E-Mail: info@star-math.de) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
          <p className="text-sm leading-relaxed">Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
          <p className="text-sm leading-relaxed font-semibold">Folgen des Widerrufes</p>
          <p className="text-sm leading-relaxed">Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrages bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>
          <p className="text-sm leading-relaxed font-semibold">Besonderheit bei digitalen Inhalten</p>
          <p className="text-sm leading-relaxed">Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrages unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.</p>
        </section>

        {/* 7. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">7. Nutzungsrechte und Pflichten</h2>
          <h3 className="text-sm font-bold">7.1 Eingeräumte Nutzungsrechte</h3>
          <p className="text-sm leading-relaxed">Der Nutzer erhält ein einfaches, nicht übertragbares und nicht ausschließliches Nutzungsrecht an den bereitgestellten Lerninhalten für die Dauer des Vertragsverhältnisses.</p>
          <h3 className="text-sm font-bold">7.2 Nutzungsbeschränkungen und Urheberrechtsschutz</h3>
          <p className="text-sm leading-relaxed"><span className="font-semibold">Erlaubte Downloads: </span>Das Herunterladen von Lerninhalten ist nur insoweit gestattet, als die Plattform diese Funktion explizit zur Verfügung stellt (z.B. durch einen {"\"Download\""}-Button). Ausschließlich streambare Inhalte (ohne Download-Option) dürfen nicht heruntergeladen werden.</p>

          <p className="text-sm font-semibold">Urheberrechtsschutz - Streng untersagt sind:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Die Vervielfältigung, Kopierung oder Weiterverbreitung der Lerninhalte außerhalb der gestatteten privaten Nutzung</li>
            <li>Die Bereitstellung der Inhalte auf anderen Plattformen oder Websites</li>
            <li>Die kommerzielle Nutzung oder der Verkauf der Inhalte</li>
            <li>Die Weitergabe heruntergeladener Inhalte an Dritte</li>
            <li>Das Umgehen technischer Schutzmaßnahmen</li>
          </ul>

          <p className="text-sm font-semibold">Weitere Nutzungsverbote:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Die Weitergabe der Zugangsdaten an Dritte</li>
            <li>Reverse Engineering oder Dekompilierung der Software/App</li>
            <li>Die Nutzung automatisierter Systeme zum Herunterladen von Inhalten</li>
          </ul>

          <p className="text-sm leading-relaxed"><span className="font-semibold">Rechtsfolgen bei Verstößen: </span>Verstöße gegen diese Nutzungsbeschränkungen, insbesondere gegen den Urheberrechtsschutz, führen zu:</p>

          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Sofortiger außerordentlicher Kündigung und Kontosperrung</li>
            <li>Schadensersatzansprüchen des Anbieters</li>
            <li>Möglichen strafrechtlichen Konsequenzen nach dem Urheberrechtsgesetz</li>
            <li>Kostenpflichtigen Abmahnungen</li>
          </ul>

          <h3 className="text-sm font-bold">7.3 Nutzerverhalten</h3>
          <p className="text-sm leading-relaxed">Der Nutzer verpflichtet sich zu einem respektvollen Umgang und unterlässt:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Belästigungen oder Diskriminierungen</li>
            <li>Die Verbreitung illegaler oder jugendgefährdender Inhalte</li>
            <li>Handlungen, die die Funktionsfähigkeit der Plattform beeinträchtigen</li>
            <li>Die Verwendung automatisierter Systeme (Bots, Crawler)</li>
          </ul>
        </section>

        {/* 8. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">8. Haftung</h2>
          <h3 className="text-sm font-bold">8.1 Haftung bei Vorsatz und grober Fahrlässigkeit</h3>
          <p className="text-sm leading-relaxed">Für Schäden, die durch vorsätzliche oder grob fahrlässige Pflichtverletzungen entstehen, haftet der Anbieter unbeschränkt.</p>

          <h3 className="text-sm font-bold">8.2 Haftung bei der Verletzung von Leben, Körper und Gesundheit</h3>
          <p className="text-sm leading-relaxed">Für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit haftet der Anbieter unbeschränkt, soweit diese auf einer fahrlässigen oder vorsätzlichen Pflichtverletzung beruhen.</p>

          <h3 className="text-sm font-bold">8.3 Haftung bei der Verletzung wesentlicher Vertragspflichten</h3>
          <p className="text-sm leading-relaxed">Bei der leicht fahrlässigen Verletzung von Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht (Kardinalpflichten), ist die Haftung auf den bei Vertragsschluss vorhersehbaren, vertragstypischen Schaden begrenzt, höchstens jedoch auf 100,00 EUR pro Schadensfall.</p>

          <h3 className="text-sm font-bold">8.4 Ausschluss der weitergehenden Haftung</h3>
          <p className="text-sm leading-relaxed">Eine weitergehende Haftung des Anbieters ist ausgeschlossen. Dies gilt insbesondere für:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Datenverlust durch technische Störungen</li>
            <li>Schäden durch Viren oder Malware</li>
            <li>Folge- und Vermögensschäden</li>
            <li>Entgangenen Gewinn</li>
          </ul>

          <h3 className="text-sm font-bold">8.5 Haftung für Hilfspersonen</h3>
          <p className="text-sm leading-relaxed">Die vorstehenden Haftungsregelungen gelten auch für die Haftung des Anbieters für seine Erfüllungsgehilfen und gesetzlichen Vertreter.</p>

          <h3 className="text-sm font-bold">8.6 Datensicherung</h3>
          <p className="text-sm leading-relaxed">Der Nutzer ist selbst für die Sicherung seiner Daten verantwortlich. Es wird empfohlen, regelmäßig Sicherungskopien zu erstellen.</p>
        </section>

        {/* 9. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">9. Datenschutz</h2>
          <p className="text-sm leading-relaxed">Der Schutz personenbezogener Daten ist uns wichtig. Die Erhebung, Verarbeitung und Nutzung personenbezogener Daten erfolgt ausschließlich nach Maßgabe der gesetzlichen Bestimmungen und unserer Datenschutzerklärung, die unter math-star.de/datenschutz abrufbar ist.</p>

          <p className="text-sm leading-relaxed">Externe Dienstleister (insbesondere Stripe für Zahlungsabwicklung und Hostinger für das Hosting) verarbeiten Daten nur im Rahmen von Auftragsverarbeitungsverträgen gemäß Art. 28 DSGVO.</p>
        </section>

        {/* 10. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">10. Änderungen der AGB</h2>
          <h3 className="text-sm font-bold">10.1 Änderungsmitteilung</h3>
          <p className="text-sm leading-relaxed">Änderungen dieser AGB werden dem Nutzer mindestens 30 Tage vor Inkrafttreten per E-Mail und durch deutlich sichtbare Bekanntmachung auf der Website mitgeteilt. Die E-Mail enthält den vollständigen Text der geänderten Bestimmungen sowie eine Gegenüberstellung der Änderungen.</p>

          <h3 className="text-sm font-bold">10.2 Zustimmung zu Änderungen - Ausdrückliche Erklärung erforderlich</h3>
          <p className="text-sm leading-relaxed">Änderungen der AGB bedürfen der ausdrücklichen Zustimmung des Nutzers. Eine stillschweigende Zustimmung durch Weiternutzung der Plattform ist nicht möglich.</p>
          <p className="text-sm font-semibold">Zustimmungsverfahren:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Der Nutzer wird beim nächsten Login aufgefordert, den geänderten AGB ausdrücklich zuzustimmen</li>
            <li>Ohne Zustimmung ist eine weitere Nutzung der kostenpflichtigen Funktionen nicht möglich</li>
            <li>Der Nutzer kann die Änderungen ablehnen und stattdessen kündigen</li>
          </ul>

          <h3 className="text-sm font-bold">10.3 Wahlrecht des Nutzers bei AGB-Änderungen</h3>
          <p className="text-sm leading-relaxed">Bei Bekanntgabe von AGB-Änderungen hat der Nutzer folgende Optionen:</p>
          <p className="text-sm font-semibold">Option 1: Zustimmung</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Ausdrückliche Annahme der geänderten AGB durch Klick auf {"\"Ich stimme zu\""}</li>
            <li>Fortsetzung des Vertragsverhältnisses zu den neuen Bedingungen</li>
          </ul>

          <p className="text-sm font-semibold">Option 2: Kündigung</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Ablehnung der AGB-Änderungen durch Kündigung</li>
            <li>Sonderkündigungsrecht ohne Einhaltung der regulären Kündigungsfrist</li>
            <li>Vertrag endet zum Zeitpunkt des Inkrafttretens der neuen AGB</li>
            <li>Bereits gezahlte Beiträge werden anteilig erstattet</li>
          </ul>

          <h3 className="text-sm font-bold">10.4 Technische Umsetzung</h3>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Bei AGB-Änderungen wird der Plattform-Zugang vorübergehend auf eine Zustimmungsseite umgeleitet</li>
            <li>Dort werden die Änderungen nochmals dargestellt und die Wahlmöglichkeiten erläutert</li>
            <li>Erst nach ausdrücklicher Entscheidung (Zustimmung oder Kündigung) ist die Plattformnutzung wieder möglich</li>
          </ul>
        </section>

        {/* 11. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">11. Störungen und Wartungsarbeiten</h2>
          <h3 className="text-sm font-bold">11.1 Technische Verfügbarkeit</h3>
          <p className="text-sm leading-relaxed">Der Anbieter ist bestrebt, eine hohe Verfügbarkeit der Plattform sicherzustellen. Eine 100%ige Verfügbarkeit kann jedoch nicht garantiert werden.</p>

          <h3 className="text-sm font-bold">11.2 Geplante Wartungen</h3>
          <p className="text-sm leading-relaxed">Geplante Wartungsarbeiten werden mindestens 48 Stunden im Voraus auf der Plattform angekündigt und finden in der Regel sonntags zwischen 2:00 und 4:00 Uhr statt.</p>

          <h3 className="text-sm font-bold">11.3 Ungeplante Ausfälle</h3>
          <p className="text-sm leading-relaxed">Bei ungeplanten technischen Störungen wird der Anbieter unverzüglich an der Behebung arbeiten. Ein Anspruch auf Schadensersatz oder Erstattung besteht nicht, es sei denn, die Störung beruht auf einer groben Pflichtverletzung des Anbieters.</p>
        </section>

        {/* 12. Preise und Zahlungsbedingungen */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">12. Schlussbestimmungen</h2>
          <h3 className="text-sm font-bold">12.1 Anwendbares Recht</h3>
          <p className="text-sm leading-relaxed">Für das Vertragsverhältnis gilt ausschließlich deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>

          <h3 className="text-sm font-bold">12.2 Gerichtsstand</h3>
          <p className="text-sm leading-relaxed">Gerichtsstand für alle Streitigkeiten ist, soweit gesetzlich zulässig, Aschaffenburg.</p>

          <h3 className="text-sm font-bold">12.3 Salvatorische Klausel</h3>
          <p className="text-sm leading-relaxed">Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so wird dadurch die Wirksamkeit der übrigen Bestimmungen nicht berührt. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem gewollten wirtschaftlichen Zweck am nächsten kommt.</p>

          <h3 className="text-sm font-bold">12.4 Verbraucherschlichtung</h3>
          <p className="text-sm leading-relaxed">Wir sind nicht zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle verpflichtet und nehmen nicht daran teil.</p>
          <h3 className="text-sm font-bold">12.5 EU-Online-Streitbeilegung</h3>
          <p className="text-sm leading-relaxed">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/</p>
        </section>

        <h3 className="font-semibold">Diese AGB treten am 01.10.2025 in Kraft.</h3>
      </main>
    </div>
  );
}
