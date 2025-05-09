
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTabs from "@/components/ui/custom-tabs";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { Leaf, LineChart, BarChart3, Info } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Données fictives pour les graphiques
const rendementData = [
  { mois: "Jan", mais: 8.5, riz: 7.2, haricots: 5.8 },
  { mois: "Fév", mais: 8.7, riz: 7.0, haricots: 6.0 },
  { mois: "Mar", mais: 9.2, riz: 7.5, haricots: 6.3 },
  { mois: "Avr", mais: 9.8, riz: 8.0, haricots: 6.5 },
  { mois: "Mai", mais: 10.3, riz: 8.2, haricots: 6.8 },
  { mois: "Jun", mais: 10.7, riz: 8.5, haricots: 7.0 },
];

const consommationEauData = [
  { mois: "Jan", mais: 450, riz: 820, haricots: 320 },
  { mois: "Fév", mais: 420, riz: 790, haricots: 300 },
  { mois: "Mar", mais: 480, riz: 850, haricots: 350 },
  { mois: "Avr", mais: 520, riz: 900, haricots: 380 },
  { mois: "Mai", mais: 550, riz: 950, haricots: 400 },
  { mois: "Jun", mais: 580, riz: 980, haricots: 420 },
];

const CulturesAnalysis = () => {
  const [activeMainTab, setActiveMainTab] = useState('rendement');

  const mainTabs = [
    { id: 'rendement', label: 'Rendement', icon: <LineChart size={16} /> },
    { id: 'eau', label: 'Consommation d\'eau', icon: <BarChart3 size={16} /> },
    { id: 'maladies', label: 'Suivi des maladies', icon: <Info size={16} /> },
  ];

  const cultureTabs = [
    { id: 'mais', label: 'Maïs', icon: <Leaf size={16} /> },
    { id: 'riz', label: 'Riz', icon: <Leaf size={16} /> },
    { id: 'haricots', label: 'Haricots', icon: <Leaf size={16} /> },
  ];

  return (
    <AppLayout title="Analyse des Cultures">
      <div className="mb-6">
        <p className="text-gray-600">
          Analysez les performances de vos cultures et comparez les rendements au fil du temps.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Vue d'ensemble des cultures</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTabs 
            items={mainTabs} 
            defaultValue="rendement" 
            onChange={setActiveMainTab} 
            variant="pills"
          />

          <div className="mt-6">
            <Tabs value={activeMainTab}>
              <TabsContent value="rendement" className="mt-0">
                <div className="mb-4">
                  <h3 className="font-medium text-lg">Évolution du rendement par culture (t/ha)</h3>
                </div>
                <div className="h-80">
                  <ChartContainer config={{ 
                    mais: { label: "Maïs", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                    riz: { label: "Riz", theme: { light: "#FFC107", dark: "#FFA000" } },
                    haricots: { label: "Haricots", theme: { light: "#2196F3", dark: "#1976D2" } },
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={rendementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="mais" 
                          stroke="#4CAF50" 
                          name="Maïs"
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="riz" 
                          stroke="#FFC107" 
                          name="Riz"
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="haricots" 
                          stroke="#2196F3" 
                          name="Haricots" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="eau" className="mt-0">
                <div className="mb-4">
                  <h3 className="font-medium text-lg">Consommation d'eau par culture (m³/ha)</h3>
                </div>
                <div className="h-80">
                  <ChartContainer config={{ 
                    mais: { label: "Maïs", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                    riz: { label: "Riz", theme: { light: "#FFC107", dark: "#FFA000" } },
                    haricots: { label: "Haricots", theme: { light: "#2196F3", dark: "#1976D2" } },
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={consommationEauData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="mois" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="mais" name="Maïs" fill="#4CAF50" />
                        <Bar dataKey="riz" name="Riz" fill="#FFC107" />
                        <Bar dataKey="haricots" name="Haricots" fill="#2196F3" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="maladies" className="mt-0">
                <div className="flex items-center justify-center h-80">
                  <p className="text-gray-500">Données de suivi des maladies non disponibles actuellement.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Analyse par culture</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomTabs 
              items={cultureTabs} 
              variant="boxes"
              className="mb-4" 
            />
            <div className="mt-4">
              {/* Contenu pour l'analyse par culture */}
              <p className="text-gray-600">
                Sélectionnez une culture ci-dessus pour voir les données détaillées.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Comparaison des technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomTabs 
              items={[
                { id: 'irrigation', label: 'Irrigation' },
                { id: 'fertilisation', label: 'Fertilisation' },
                { id: 'traitements', label: 'Traitements' },
              ]}
              variant="underline"
              className="mb-4"
            />
            <div className="mt-4">
              {/* Contenu pour la comparaison des technologies */}
              <p className="text-gray-600">
                Sélectionnez une technologie ci-dessus pour voir les données comparatives.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CulturesAnalysis;
