import React from "react";

export const metadata = {
  title: "Datenschutzerklärung — Math Star",
  description: "Datenschutzerklärung für Math Star. Erfahren Sie, wie wir Ihre Daten sammeln, verwenden und schützen. Informationen zu Datenverarbeitung, Cookies und Ihren Rechten gemäß DSGVO.",
  keywords: "Datenschutz, Datenschutzerklärung, DSGVO, Math Star, Datenverarbeitung, Cookies, Datensicherheit",
  authors: [{ name: "Math Star" }],
  robots: "index, follow",
};
export default function PrivacyPage() {
  return (
    <div>
      <main className="max-w-7xl mx-auto p-3 md:p-8 space-y-8 mt-24 text-zinc-900 text-justify">
        <h1 className="text-2xl font-bold font-Quicksand">
          Datenschutzerklärung für Math-Star.de
        </h1>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">1. Verantwortlicher</h2>
          <div className="text-sm leading-relaxed space-y-1.5">
            <p>
              <span className="font-semibold">Stefan Breitkreuz </span>(Einzelunternehmen)
              <br />
              Bayernstraße 30
              <br />
              63739 Aschaffenburg
              <br />
              Deutschland
            </p>

            <p>
              <span className="font-bold">Kontakt:</span> <br />
              <span className="font-semibold">E-Mail: </span>
              <a href="mailto:kontakt@math-star.de" className="text-blue-600 hover:underline">
                kontakt@math-star.de
              </a>
            </p>
          </div>
        </section>

        {/* section 2 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">2. Überblick über die Datenverarbeitung</h2>
          <p className="text-sm leading-relaxed">Wir verarbeiten personenbezogene Daten unserer Nutzer zur Bereitstellung unserer Online-Mathematik-Lernplattform Math-Star.de. Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zwecke der Verarbeitung personenbezogener Daten sowie über Ihre Rechte als betroffene Person.
          </p>
          <p className="text-sm leading-relaxed"><span className="font-semibold">Wichtiger Hinweis für Minderjährige: </span> Nutzer unter 16 Jahren benötigen die Einwilligung ihrer Erziehungsberechtigten zur Nutzung unserer Plattform.
          </p>
        </section>

        {/* section 3 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">3. Rechtsgrundlagen der Verarbeitung</h2>
          <p className="text-sm leading-relaxed">Wir verarbeiten Ihre personenbezogenen Daten auf Grundlage der folgenden Rechtsgrundlagen:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li><strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung des Betroffenen</li>
            <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Erfüllung eines Vertrags oder vorvertragliche Maßnahmen</li>
            <li><strong>Art. 6 Abs. 1 lit. c DSGVO:</strong> Erfüllung rechtlicher Verpflichtungen</li>
            <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Wahrung berechtigter Interessen</li>
          </ul>
        </section>

        {/* section 4  */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">4. Kategorien verarbeiteter Daten und Verarbeitungszwecke</h2>

          <h3 className="text-sm font-bold">4.1 Kontaktdaten und Registrierungsdaten</h3>
          <p className="text-sm leading-relaxed"><strong>Verarbeitete Daten:</strong> Vor- und Nachname, E-Mail-Adresse, gewähltes Passwort, Geburtsdatum (zur Altersverifikation)
          </p>
          <p className="text-sm font-semibold">Zwecke:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Bereitstellung individualisierter Lerninhalte</li>
            <li>Verfolgung des Lernfortschritts</li>
            <li>Optimierung der Lernplattform</li>
            <li>Entwicklung neuer Bildungsfunktionen</li>
          </ul>
          <p className="text-sm leading-relaxed"><strong>Rechtsgrundlage: </strong>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</p>
          <p className="text-sm leading-relaxed"><strong>Speicherdauer: </strong>Bis zur Löschung des Nutzerkontos, mindestens jedoch für die Dauer der Nutzung unserer Dienste. Nach Löschung des Kontos werden die Daten unverzüglich gelöscht, es sei denn, gesetzliche Aufbewahrungspflichten stehen dem entgegen.</p>


          <h3 className="text-sm font-bold">4.2 Lernfortschrittsdaten und Nutzungsdaten</h3>
          <p className="text-sm leading-relaxed"><strong>Verarbeitete Daten:</strong>Lernfortschritt, bearbeitete Aufgaben, Lernergebnisse, Nutzungszeiten, Schwierigkeitseinstellungen, individuelle Lernpfade</p>
          <p className="text-sm font-semibold">Zwecke:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Bereitstellung individualisierter Lerninhalte</li>
            <li>Verfolgung des Lernfortschritts</li>
            <li>Optimierung der Lernplattform</li>
            <li>Entwicklung neuer Bildungsfunktionen</li>
          </ul>

          <p className="text-sm font-semibold">Rechtsgrundlage:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</li>
          </ul>

          <p className="text-sm leading-relaxed"><strong>Interessenabwägung zu lit. f: </strong>Unser berechtigtes Interesse liegt in der Bereitstellung einer optimalen, personalisierten Lernumgebung. Die Analyse der Lernfortschritte ermöglicht es uns, individuelle Schwächen zu identifizieren und gezielt zu fördern, was dem pädagogischen Zweck der Plattform dient. Diese Verarbeitung erfolgt ausschließlich zur Verbesserung des Lernerfolgs und nicht zu Marketingzwecken. Die Grundrechte der Nutzer werden durch Datenschutz-freundliche Voreinstellungen, Transparenz und die Möglichkeit des Widerspruchs gewahrt. Das berechtigte Interesse überwiegt, da die Datenverarbeitung für die Kernfunktion der Bildungsplattform erforderlich ist.</p>

          <p className="text-sm leading-relaxed"><strong>Speicherdauer: </strong>Für die Dauer der aktiven Nutzung des Nutzerkontos. Bei Inaktivität von mehr als 3 Jahren werden Lernfortschrittsdaten anonymisiert. Nach Löschung des Nutzerkontos werden persönlich zuordenbare Lernfortschrittsdaten unverzüglich gelöscht.</p>


          <h3 className="text-sm font-bold">4.3 Zahlungsdaten</h3>
          <p className="text-sm leading-relaxed"><strong>Verarbeitete Daten: </strong>Zahlungsinformationen (Kreditkartendaten, Rechnungsadresse), Transaktionshistorie</p>
          <p className="text-sm font-semibold">Zwecke:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Abwicklung von Zahlungen</li>
            <li>Rechnungsstellung</li>
            <li>Betrugsprävention</li>
            <li>Erfüllung steuerlicher Pflichten</li>
          </ul>

          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
            <li>Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtungen)</li>
          </ul>

          <p className="text-sm leading-relaxed"><strong>Speicherdauer: </strong>Zahlungsdaten werden gemäß den gesetzlichen Aufbewahrungspflichten für 10 Jahre nach Ende des Kalenderjahres gespeichert, in dem der Umsatz erzielt wurde (§ 147 AO).</p>

          <h3 className="text-sm font-bold">4.4 Technische Daten und IP-Adressen</h3>

          <p className="text-sm leading-relaxed"><strong>Verarbeitete Daten: </strong>IP-Adresse, Browser-Informationen, Betriebssystem, Zugriffszeiten, besuchte Seiten</p>
          <p className="text-sm font-semibold">Zwecke:</p>
          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Bereitstellung der Website-Funktionalität</li>
            <li>IT-Sicherheit und Schutz vor Angriffen</li>
            <li>Fehlerdiagnose und technische Optimierung</li>
            <li>Compliance mit rechtlichen Verpflichtungen</li>
          </ul>

          <p className="text-sm leading-relaxed"><strong>Rechtsgrundlage: </strong>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</p>

          <p className="text-sm leading-relaxed"><strong>Interessenabwägung: </strong>Unser berechtigtes Interesse liegt in der zuverlässigen technischen Bereitstellung der Lernplattform. Ohne professionelle Hosting-Infrastruktur wäre die Plattform nicht verfügbar. Da Hostinger in der EU ansässig ist und einem Auftragsverarbeitungsvertrag mit angemessenen Schutzmaßnahmen unterliegt, sind die Auswirkungen auf die Grundrechte der Nutzer minimal. Das technische Interesse an der Plattformbereitstellung überwiegt eindeutig.</p>

          <p className="text-sm leading-relaxed"><strong>Interessenabwägung: </strong>Unser berechtigtes Interesse liegt in der Gewährleistung der IT-Sicherheit, Funktionalität und Verfügbarkeit unserer Bildungsplattform. Die Verarbeitung technischer Daten ist erforderlich, um Cyberangriffe abzuwehren, technische Probleme zu diagnostizieren und eine stabile Lernumgebung zu gewährleisten. Da es sich um anonyme oder pseudonyme technische Daten handelt und die Speicherdauer auf das Minimum begrenzt ist (7 Tage), sind die Auswirkungen auf die Grundrechte der Nutzer gering. Das Sicherheitsinteresse überwiegt, da ohne diese Maßnahmen die gesamte Plattform gefährdet wäre.</p>

          <p className="text-sm leading-relaxed"><strong>Speicherdauer: </strong>IP-Adressen in Logfiles werden nach 7 Tagen automatisch gelöscht oder anonymisiert, es sei denn, ein konkreter Sicherheitsvorfall erfordert eine längere Speicherung.</p>
        </section>


        {/* section 5  */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">5. Empfänger und Übermittlung an Dritte</h2>

          <h3 className="text-sm font-bold">5.1 Hosting-Dienstleister</h3>
          <p className="text-sm leading-relaxed"><strong>Empfänger: </strong>Hostinger International Ltd., Jonavos g. 60C, Kaunas 44192, Litauen</p>

          <p className="text-sm leading-relaxed"><strong>Verarbeitete Daten: </strong>Alle auf der Website verarbeiteten Daten</p>

          <p className="text-sm leading-relaxed"><strong>Zweck: </strong>Bereitstellung der technischen Infrastruktur</p>

          <p className="text-sm leading-relaxed"><strong>Rechtsgrundlage: </strong>Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)</p>

          <p className="text-sm leading-relaxed"><strong>Datenschutz: </strong>Hostinger ist in der EU ansässig. Es besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.</p>

          <h3 className="text-sm font-bold">5.2 Zahlungsdienstleister</h3>
          <p className="text-sm leading-relaxed"><strong>Empfänger: </strong>Stripe, Inc., 354 Oyster Point Blvd, South San Francisco, CA 94080, USA</p>

          <p className="text-sm leading-relaxed"><strong>Verarbeitete Daten: </strong>Zahlungsdaten, Transaktionsdaten, zur Zahlung erforderliche Kontaktdaten</p>

          <p className="text-sm leading-relaxed"><strong>Zweck: </strong>Abwicklung von Zahlungen</p>

          <p className="text-sm leading-relaxed"><strong>Rechtsgrundlage: </strong>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</p>

          <p className="text-sm leading-relaxed"><strong>Drittlandsübertragung: </strong>Die Übermittlung von Daten an Stripe in den USA erfolgt auf Grundlage der Standardvertragsklauseln der Europäischen Kommission (Art. 46 Abs. 2 lit. c DSGVO). Es besteht ein Auftragsverarbeitungsvertrag mit angemessenen technischen und organisatorischen Schutzmaßnahmen. Sie haben das Recht, eine Kopie der getroffenen Garantien anzufordern.</p>
        </section>

        {/* section 6  */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">6. Besondere Bestimmungen für Minderjährige</h2>

          <p className="text-sm leading-relaxed"><strong>Altersgrenze: </strong>Nutzer unter 16 Jahren benötigen die Einwilligung ihrer Erziehungsberechtigten zur Nutzung unserer Plattform.</p>

          <p className="text-sm leading-relaxed"><strong>Einwilligungsverfahren:</strong></p>

          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Verifizierte Einwilligung der Erziehungsberechtigten erforderlich</li>
            <li>Beide (Erziehungsberechtigte und Kind) werden über die Datenverarbeitung informiert</li>
            <li>Granulare Einwilligungsoptionen für verschiedene Funktionen</li>
            <li>Jährliche Überprüfung der Einwilligung</li>
          </ul>

          <p className="text-sm leading-relaxed"><strong>Besondere Schutzmaßnahmen:</strong></p>

          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>Erhöhte Datensicherheitsmaßnahmen</li>
            <li>Begrenzte Datensammlung auf das pädagogisch Notwendige</li>
            <li>Keine Profilbildung für Marketingzwecke</li>
            <li>Vereinfachte, kindergerechte Datenschutzinformationen</li>
          </ul>
        </section>

        {/* section 7  */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">7. Cookies und ähnliche Technologien</h2>

          <p className="text-sm leading-relaxed">Unsere Website verwendet Cookies und ähnliche Technologien. Wir unterscheiden zwischen:</p>

          <h3 className="text-sm font-bold">7.1 Technisch notwendige Cookies</h3>

          <div>
            <p className="text-sm leading-relaxed"><strong>Zweck: </strong>Grundlegende Funktionalität der Website</p>

            <p className="text-sm leading-relaxed"><strong>Rechtsgrundlage: </strong>Art. 6 Abs. 1 lit. fDSGVO (berechtigte Interessen)</p>
          </div>

          <p className="text-sm leading-relaxed"><strong>Interessenabwägung: </strong>Unser berechtigtes Interesse liegt in der Bereitstellung einer funktionsfähigen Website. Technisch notwendige Cookies sind unverzichtbar für grundlegende Funktionen wie Login-Status, Warenkorbfunktionen und Sicherheitsmaßnahmen. Da diese Cookies keine Verfolgung oder Profilbildung ermöglichen und nach der Sitzung gelöscht werden, ist der Eingriff in die Grundrechte minimal. Das technische Interesse überwiegt eindeutig, da ohne diese Cookies die Website nicht nutzbar wäre.</p>

          <p className="text-sm leading-relaxed"><strong>Speicherdauer: </strong>Session-Cookies werden nach Schließen des Browsers gelöscht</p>

          <h3 className="text-sm font-bold">7.2 Funktionale Cookies</h3>

          <div>
            <p className="text-sm leading-relaxed"><strong>Zweck: </strong>Verbesserung der Nutzererfahrung, Speicherung von Einstellungen</p>

            <p className="text-sm leading-relaxed"><strong>Rechtsgrundlage: </strong>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>

            <p className="text-sm leading-relaxed"><strong>Speicherdauer: </strong>Bis zu 12 Monate</p>
          </div>

          <h3 className="text-sm font-bold">7.3 Analyse-Cookies</h3>

          <div>
            <p className="text-sm leading-relaxed"><strong>Zweck: </strong>Verständnis der Website-Nutzung zur Optimierung</p>

            <p className="text-sm leading-relaxed"><strong>Rechtsgrundlage: </strong>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>

            <p className="text-sm leading-relaxed"><strong>Speicherdauer: </strong>Bis zu 24 Monate</p>
          </div>

          <p className="text-sm leading-relaxed"><strong>Cookie-Verwaltung: </strong>Sie können Ihre Cookie-Einstellungen jederzeit über unser Cookie-Banner oder in den Browsereinstellungen ändern.</p>
        </section>


        {/* section 8 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">8. Ihre Rechte als betroffene Person</h2>

          <p className="text-sm leading-relaxed">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>

          <h3 className="text-sm font-bold">8.1 Auskunftsrecht (Art. 15 DSGVO)</h3>
          <p className="text-sm leading-relaxed">Sie haben das Recht, Auskunft über die Sie betreffenden personenbezogenen Daten zu erhalten.</p>

          <h3 className="text-sm font-bold">8.2 Recht auf Berichtigung (Art. 16 DSGVO)</h3>
          <p className="text-sm leading-relaxed">Sie haben das Recht, die Berichtigung unrichtiger oder unvollständiger Daten zu verlangen.</p>

          <h3 className="text-sm font-bold">8.3 Recht auf Löschung (Art. 17 DSGVO)</h3>
          <p className="text-sm leading-relaxed">Sie haben das Recht auf Löschung Ihrer personenbezogenen Daten, sofern die Voraussetzungen erfüllt sind.</p>

          <h3 className="text-sm font-bold">8.4 Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
          <p className="text-sm leading-relaxed">Sie können die Einschränkung der Verarbeitung verlangen, wenn bestimmte Voraussetzungen vorliegen.</p>

          <h3 className="text-sm font-bold">8.5 Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
          <p className="text-sm leading-relaxed">Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</p>

          <h3 className="text-sm font-bold">8.6 Widerspruchsrecht (Art. 21 DSGVO)</h3>
          <p className="text-sm leading-relaxed">Sie haben das Recht, der Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zu widersprechen.</p>

          <h3 className="text-sm font-bold">8.7 Widerruf von Einwilligungen</h3>
          <p className="text-sm leading-relaxed">Soweit die Verarbeitung auf einer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.</p>

          <div>
            <h3 className="text-sm font-bold">Kontakt für Rechteausübung:</h3>
            <p>
              <span className="text-sm">E-Mail: </span>
              <a href="mailto:kontakt@math-star.de" className="hover:underline">
                kontakt@math-star.de
              </a>
            </p>
            <p className="text-sm">Postadresse: Stefan Breitkreuz, Bayernstraße 30, 63739 Aschaffenburg</p>
          </div>
        </section>

        {/* section 9 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">9. Beschwerderecht</h2>

          <p className="text-sm leading-relaxed">Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren:</p>

          <p className="text-sm leading-relaxed">
            <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong> <br />
            Promenade 18 <br />
            91522 Ansbach <br />
            Telefon: +49 (0)981 531-1300 <br />
            <p>
              <span className="text-sm">E-Mail: </span>
              <a href="poststelle@lda.bayern.de" className="hover:underline">
                poststelle@lda.bayern.de
              </a>
            </p>
          </p>

          <p className="text-sm leading-relaxed">Alternativ können Sie sich an den Bundesbeauftragten für den Datenschutz und die Informationsfreiheit wenden.</p>
        </section>

        {/* section 10 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">10. Datensicherheit und technisch-organisatorische Maßnahmen</h2>

          <p className="text-sm leading-relaxed">Wir setzen technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten zu schützen:</p>

          <ul className="ml-2.5 list-disc list-inside text-sm leading-relaxed">
            <li>SSL-/TLS-Verschlüsselung für alle Datenübertragungen</li>
            <li>Regelmäßige Sicherheitsupdates und -prüfungen</li>
            <li>Zugriffskontrollen und Berechtigungsmanagement</li>
            <li>Backup-Systeme mit Verschlüsselung</li>
            <li>Schulung der Mitarbeiter im Datenschutz</li>
            <li>Incident-Response-Verfahren für Datenschutzverletzungen</li>
          </ul>
        </section>

        {/* section 11 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">11. Automatisierte Entscheidungsfindung und Profiling</h2>

          <p className="text-sm leading-relaxed">Wir setzen automatisierte Entscheidungsfindung ausschließlich zur Personalisierung der Lerninhalte ein. Diese Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen).</p>

          <p className="text-sm leading-relaxed"><strong>Interessenabwägung: </strong>Unser berechtigtes Interesse liegt in der Bereitstellung einer optimalen, auf den individuellen Lernstand abgestimmten Bildungsdienstleistung. Die automatisierte Anpassung der Schwierigkeitsgrade und Lernpfade dient ausschließlich dem pädagogischen Zweck und verbessert den Lernerfolg. Da die Profilbildung nur zur Lernoptimierung und nicht zu Marketingzwecken erfolgt, und Nutzer jederzeit Einfluss auf die Empfehlungen nehmen können, ist der Eingriff in die Grundrechte verhältnismäßig. Das Bildungsinteresse überwiegt, da personalisiertes Lernen nachweislich effektiver ist.</p>

          <p className="text-sm leading-relaxed">Sie haben das Recht, nicht einer ausschließlich auf automatisierter Verarbeitung beruhenden Entscheidung unterworfen zu werden und können jederzeit eine manuelle Überprüfung verlangen.</p>
        </section>

        {/* section 12 */}
        <section>
          <h2 className="text-lg font-semibold">12. Änderungen dieser Datenschutzerklärung</h2>

          <p className="text-sm leading-relaxed">Diese Datenschutzerklärung kann aufgrund von Änderungen der rechtlichen Grundlagen oder unserer Datenverarbeitungspraktiken angepasst werden. Die aktuelle Version ist stets auf unserer Website verfügbar.</p>

          <p className="text-sm leading-relaxed"><strong>Letzte Aktualisierung: </strong>01.10.2025</p>

        </section>

        {/* section 13 */}
        <section>
          <h2 className="text-lg font-semibold">13. Kontakt</h2>

          <p className="text-sm leading-relaxed">Bei Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung Ihrer personenbezogenen Daten kontaktieren Sie uns:</p>

          <p className="text-sm leading-relaxed"><strong>Stefan Breitkreuz</strong> <br />
            Bayernstraße 30 <br />
            63739 Aschaffenburg <br />
            Deutschland <br />
            <span className="font-semibold">E-Mail: </span>
            <a href="mailto:kontakt@math-star.de" className="hover:underline">
              kontakt@math-star.de
            </a>
          </p>

          <p className="text-sm leading-relaxed">Diese Datenschutzerklärung wurde auf Grundlage der aktuellen DSGVO-Anforderungen erstellt und berücksichtigt die besonderen Bedürfnisse von Bildungsplattformen sowie den Schutz von Minderjährigen. Sie sollte regelmäßig auf Aktualität geprüft und bei Bedarf angepasst werden.</p>

        </section>

      </main>
    </div>
  );
}