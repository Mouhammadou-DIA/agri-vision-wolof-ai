
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail, MapPin, Calendar, Edit2, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Données fictives du profil de l'agriculteur
const userProfile = {
  nom: "Mamadou Diop",
  email: "mamadou.diop@exemple.com",
  telephone: "+221 77 123 45 67",
  adresse: "Dakar, Sénégal",
  dateInscription: "12/05/2023",
  bio: "Agriculteur spécialisé dans la culture maraîchère et céréalière depuis plus de 15 ans. Expérience dans la gestion de l'irrigation et l'optimisation des rendements.",
  photo: "/placeholder.svg",
  competences: ["Maraîchage", "Irrigation", "Culture bio", "Gestion des sols"],
  cultures: ["Maïs", "Tomates", "Oignons", "Riz"],
  certifications: [
    { titre: "Agriculture biologique", annee: 2019, organisme: "Org Bio Sénégal" },
    { titre: "Gestion de l'eau en agriculture", annee: 2021, organisme: "FAO" },
  ],
  formation: [
    { titre: "Licence en Agronomie", annee: "2010-2013", ecole: "Université de Dakar" },
    { titre: "Formation en entrepreneuriat agricole", annee: "2015", ecole: "Centre de formation agricole de Thiès" },
  ],
};

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    });
  };

  return (
    <AppLayout title="Mon Profil">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.photo} alt={profile.nom} />
                    <AvatarFallback className="text-3xl bg-agri-green text-white">
                      {profile.nom.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-agri-green text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold mt-4">{profile.nom}</h2>
                <p className="text-gray-500">Agriculteur</p>
                {!isEditing && (
                  <Button 
                    className="mt-4 bg-agri-green hover:bg-agri-green-dark" 
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" /> Modifier le profil
                  </Button>
                )}
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{profile.telephone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{profile.adresse}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <span>Membre depuis {profile.dateInscription}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">À propos</h3>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Compétences</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.competences.map((competence, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {competence}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Cultures</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.cultures.map((culture, index) => (
                    <span 
                      key={index}
                      className="bg-agri-green/10 text-agri-green-dark px-3 py-1 rounded-full text-sm"
                    >
                      {culture}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Modifier mon profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet</Label>
                    <Input 
                      id="nom" 
                      value={profile.nom}
                      onChange={(e) => setProfile({...profile, nom: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input 
                      id="telephone" 
                      value={profile.telephone}
                      onChange={(e) => setProfile({...profile, telephone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse</Label>
                    <Input 
                      id="adresse" 
                      value={profile.adresse}
                      onChange={(e) => setProfile({...profile, adresse: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">À propos de moi</Label>
                  <Textarea 
                    id="bio" 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competences">Compétences (séparées par des virgules)</Label>
                  <Input 
                    id="competences" 
                    value={profile.competences.join(', ')}
                    onChange={(e) => setProfile({...profile, competences: e.target.value.split(',').map(s => s.trim())})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cultures">Cultures (séparées par des virgules)</Label>
                  <Input 
                    id="cultures" 
                    value={profile.cultures.join(', ')}
                    onChange={(e) => setProfile({...profile, cultures: e.target.value.split(',').map(s => s.trim())})}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                  <Button 
                    className="bg-agri-green hover:bg-agri-green-dark"
                    onClick={handleSaveProfile}
                  >
                    Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="certifications">
              <TabsList className="w-full">
                <TabsTrigger value="certifications" className="flex-1">Certifications</TabsTrigger>
                <TabsTrigger value="formation" className="flex-1">Formation</TabsTrigger>
                <TabsTrigger value="statistiques" className="flex-1">Statistiques</TabsTrigger>
              </TabsList>
              
              <TabsContent value="certifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profile.certifications.map((certification, index) => (
                      <div 
                        key={index}
                        className="p-4 border rounded-md mb-4 bg-white"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{certification.titre}</h3>
                          <span className="text-agri-green">{certification.annee}</span>
                        </div>
                        <p className="text-gray-600">{certification.organisme}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      <span className="mr-2">+</span> Ajouter une certification
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="formation">
                <Card>
                  <CardHeader>
                    <CardTitle>Formation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profile.formation.map((formation, index) => (
                      <div 
                        key={index}
                        className="p-4 border rounded-md mb-4 bg-white"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{formation.titre}</h3>
                          <span className="text-agri-green">{formation.annee}</span>
                        </div>
                        <p className="text-gray-600">{formation.ecole}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      <span className="mr-2">+</span> Ajouter une formation
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="statistiques">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques d'activité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md border">
                        <p className="text-gray-500 text-sm mb-1">Nombre de terrains</p>
                        <p className="text-2xl font-bold text-agri-green">4</p>
                      </div>
                      <div className="bg-white p-4 rounded-md border">
                        <p className="text-gray-500 text-sm mb-1">Surface totale cultivée</p>
                        <p className="text-2xl font-bold text-agri-green">19.7 ha</p>
                      </div>
                      <div className="bg-white p-4 rounded-md border">
                        <p className="text-gray-500 text-sm mb-1">Rendement moyen</p>
                        <p className="text-2xl font-bold text-agri-yellow">8.7 t/ha</p>
                      </div>
                      <div className="bg-white p-4 rounded-md border">
                        <p className="text-gray-500 text-sm mb-1">Activations d'irrigation</p>
                        <p className="text-2xl font-bold text-agri-blue">23 ce mois</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Dernières activités</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between">
                            <p>Irrigation activée - Parcelle Nord</p>
                            <span className="text-sm text-gray-500">Aujourd'hui, 10:23</span>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between">
                            <p>Analyse des cultures - Parcelle Sud</p>
                            <span className="text-sm text-gray-500">Hier, 16:45</span>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between">
                            <p>Ajout d'engrais - Parcelle Est</p>
                            <span className="text-sm text-gray-500">18/04/2025, 08:30</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Profil;
