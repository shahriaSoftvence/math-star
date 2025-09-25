import React from 'react';
import { Mail, MapPin, Building2} from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all duration-500 ease-out hover:scale-[1.02] animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 animate-slideDown">
          <h1 className="text-3xl font-bold text-white text-center">
            Kontakt
          </h1>
          
        </div>

        

        {/* Content */}
        <div className="p-8 space-y-6">
          <p className="p-4 text-blue-700 text-center border border-blue-200 rounded-lg">Bei Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung Ihrer personenbezogenen Daten kontaktieren Sie uns:</p>
          {/* Provider Information */}
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg transition-transform duration-300 hover:scale-[1.02] animate-fadeIn delay-100">
            <Building2 className="text-blue-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Anbieter:</h3>
              <div className="text-gray-700 leading-relaxed">
                <div className="font-medium">Stefan Breitkreuz</div>
                <div>Bayernstraße 30</div>
                <div>63739 Aschaffenburg</div>
                <div>Deutschland</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg transition-transform duration-300 hover:scale-[1.02] animate-fadeIn delay-200">
            <Mail className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">E-Mail:</h3>
              <a
                href="mailto:kontakt@math-star.de"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                kontakt@math-star.de
              </a>
            </div>
          </div>

          {/* Legal Form */}
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg transition-transform duration-300 hover:scale-[1.02] animate-fadeIn delay-400">
            <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Rechtsform:</h3>
              <div className="text-gray-700">
                Einzelunternehmen nach deutschem Recht
              </div>
            </div>
          </div>

          {/* Additional Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200 animate-fadeIn delay-500">
            <div className="bg-blue-50 text-center  p-4 rounded-lg transition-transform duration-300 hover:scale-[1.02]">
              <h3 className="font-semibold text-blue-800 mb-2">
                Kontaktieren Sie uns
              </h3>
              <p className="text-blue-700 text-sm text-justify">
                Diese Datenschutzerklärung wurde auf Grundlage der aktuellen DSGVO-Anforderungen erstellt und berücksichtigt die besonderen Bedürfnisse von Bildungsplattformen sowie den Schutz von Minderjährigen. Sie sollte regelmäßig auf Aktualität geprüft und bei Bedarf angepasst werden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
