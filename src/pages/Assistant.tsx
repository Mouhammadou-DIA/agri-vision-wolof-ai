
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, LogIn, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const Assistant = () => {
  return (
    <AppLayout title="Assistant IA" showLoginButton={true}>
      <div className="flex flex-col gap-6">
        <Card className="bg-white shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <MessageSquare className="h-8 w-8 text-agri-green" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Assistant Agricole IA
              </h3>
              <p className="mb-6 text-gray-600">
                Posez des questions sur vos cultures, le calendrier agricole ou des conseils
                d'optimisation
              </p>
              <div className="flex w-full flex-col gap-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Poser une question..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm focus:border-green-500 focus:outline-none"
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-agri-green hover:bg-agri-green-dark"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-500">
                    Suggestions de questions:
                  </p>
                  <Button
                    variant="ghost"
                    className="justify-start border border-gray-200 bg-white text-left text-sm text-gray-700"
                  >
                    Quel est le meilleur moment pour planter du maïs?
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start border border-gray-200 bg-white text-left text-sm text-gray-700"
                  >
                    Comment optimiser mon irrigation pendant la saison sèche?
                  </Button>
                </div>
                
                {/* Code QR pour notre application */}
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-3">
                    <QrCode className="h-5 w-5 text-agri-green" />
                    <p className="text-sm font-medium">Scannez pour télécharger l'application</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <QRCodeSVG 
                      value="https://agri-vision-wolof-ai.lovable.dev" 
                      size={150} 
                      bgColor={"#ffffff"} 
                      fgColor={"#2E7D32"} 
                      level={"L"} 
                      includeMargin={true} 
                    />
                  </div>
                </div>
                
                {/* Boutons de connexion */}
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Accédez à toutes les fonctionnalités:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/login">
                      <Button 
                        className="bg-agri-green hover:bg-agri-green-dark flex items-center gap-2 w-full"
                      >
                        <LogIn className="h-4 w-4" />
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button 
                        variant="outline"
                        className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white w-full"
                      >
                        Créer un compte
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Assistant;
