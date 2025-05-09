
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Parametres = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true
  });
  
  const [theme, setTheme] = useState("light");

  const handleToggleChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newState = {...prev, [key]: !prev[key]};
      toast({
        title: `Notifications ${key} ${newState[key] ? 'activées' : 'désactivées'}`,
        duration: 2000,
      });
      return newState;
    });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: `Thème ${value} appliqué`,
      description: "Le thème a été changé avec succès.",
      duration: 2000,
    });
  };

  return (
    <AppLayout title="Paramètres">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Préférences de Notifications</CardTitle>
            <CardDescription>
              Gérez comment et quand vous recevez des notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Notifications par email</Label>
              <Switch 
                id="email-notif" 
                checked={notifications.email} 
                onCheckedChange={() => handleToggleChange('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notif">Notifications par SMS</Label>
              <Switch 
                id="sms-notif" 
                checked={notifications.sms} 
                onCheckedChange={() => handleToggleChange('sms')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-notif">Notifications dans l'application</Label>
              <Switch 
                id="app-notif" 
                checked={notifications.app} 
                onCheckedChange={() => handleToggleChange('app')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Apparence</CardTitle>
            <CardDescription>
              Personnalisez l'apparence de l'application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={theme} onValueChange={handleThemeChange}>
              <TabsList>
                <TabsTrigger value="light">Clair</TabsTrigger>
                <TabsTrigger value="dark">Sombre</TabsTrigger>
                <TabsTrigger value="system">Système</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidentialité et Sécurité</CardTitle>
            <CardDescription>
              Gérez vos paramètres de confidentialité et de sécurité
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing">Partage de données analytiques</Label>
              <Switch id="data-sharing" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
              <Switch id="two-factor" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Parametres;
