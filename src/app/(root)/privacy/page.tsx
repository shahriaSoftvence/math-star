import React from "react";

export const metadata = {
  title: "Datenschutzerklärung — Math Star",
  description: "Datenschutzerklärung für Math Star. Erfahren Sie, wie wir Ihre Daten sammeln, verwenden und schützen.",
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
              <a href="mailto:info@star-math.de" className="text-blue-600 hover:underline">
                info@star-math.de
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
          


          
        </section>
      </main>
    </div>
  );
}