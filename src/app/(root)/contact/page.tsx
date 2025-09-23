import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Kontakt
          </h1>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold">Anbieter:</span> <br />
              Stefan Breitkreuz
              <br />
              Bayernstraße 30
              <br />
              63739 Aschaffenburg
              <br />
              Deutschland
            </p>

            <p>
              <span className="font-semibold">E-Mail:</span>{" "}
              <a
                href="mailto:kontakt@math-star.de"
                className="text-blue-600 hover:underline"
              >
                kontakt@math-star.de
              </a>
            </p>
            <p>
              <span className="font-semibold">Steuernummer:</span>{" "}
              <span className="italic text-gray-500">[Bitte ergänzen]</span>
            </p>

            <p>
              <span className="font-semibold">Rechtsform:</span> <br />
              Einzelunternehmen nach deutschem Recht
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
