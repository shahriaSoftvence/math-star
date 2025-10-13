import React from 'react';
import { Mail, MapPin, Building2 } from 'lucide-react';
import { getDictionary } from '@/app/actions/dictionaries';

export const metadata = {
  title: "Kontakt — Math Star",
  description: "Kontaktieren Sie Math Star. Haben Sie Fragen, Anregungen oder benötigen Sie Unterstützung? Unser Team hilft Ihnen gerne weiter.",
  keywords: "Kontakt, Support, Math Star, Hilfe, Kontaktformular, Kundenservice",
  authors: [{ name: "Math Star" }],
  robots: "index, follow",
};

const ContactPage = async () => {
  const { contact } = await getDictionary();
  return (
    <div className='max-w-4xl mx-auto mt-28 min-h-screen p-4'>
      <div className=" from-blue-50 to-indigo-50">
        {/* Header */}
        <div className="text-center mb-10 animate-slideDown">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 tracking-tight mb-2 capitalize">
            {contact?.title}
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto">
            {contact?.description}
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 gap-6 w-full max-w-5xl animate-fadeIn">
          {/* Provider Information */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
            <div className="flex items-start gap-5">
              {/* Icon section */}
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:from-blue-200 group-hover:to-blue-300 transition-colors duration-300 shadow-inner">
                <Building2 className="text-blue-600" size={24} />
              </div>

              {/* Content section */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {contact?.provider?.title}
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-1.5">
                  <p className="font-semibold text-gray-900">{contact?.provider?.name}</p>
                  <p>{contact?.provider?.street} ,</p>
                  <p>{contact?.provider?.city} ,</p>
                  <p>{contact?.provider?.country} .</p>
                </div>
              </div>
            </div>
          </div>


          {/* Email */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">E-Mail</h3>
                <a
                  href="mailto:kontakt@math-star.de"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                >
                  kontakt@math-star.de
                </a>
              </div>
            </div>
          </div>

          {/* Legal Form */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{contact?.legalForm?.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {contact?.legalForm?.text}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-inner border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-blue-800 mb-2 text-center">
              {contact?.note?.title}
            </h3>
            <p className="text-blue-700 text-sm leading-relaxed text-justify">
              {contact?.note?.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
