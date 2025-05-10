
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";

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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Assistant;
