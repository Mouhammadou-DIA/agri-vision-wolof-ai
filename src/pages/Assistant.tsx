
import { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Mic, VolumeX, Volume2, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  translation?: string;
  timestamp: Date;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant agricole. Comment puis-je vous aider aujourd'hui ?",
      translation: "Salaamaalekum! Man laay seeni ndimbal ci mbay mi. Nan ma leen mana dimbali tey?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Liste de suggestions de questions
  const suggestions = [
    "Comment augmenter le rendement de mes cultures ?",
    "Quand est le meilleur moment pour planter le maïs ?",
    "Comment lutter contre les ravageurs naturellement ?",
    "Quelles sont les meilleures cultures pour cette saison ?",
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsSending(true);
    
    // Simuler une réponse après un délai
    setTimeout(() => {
      let response = "";
      let translation = "";
      
      // Réponses basées sur des mots clés simples
      const message = inputMessage.toLowerCase();
      
      if (message.includes("rendement") || message.includes("augmenter") || message.includes("améliorer")) {
        response = "Pour augmenter le rendement de vos cultures, je vous recommande d'optimiser l'irrigation, d'utiliser des engrais organiques, de pratiquer la rotation des cultures et de surveiller régulièrement l'état de santé des plantes. L'analyse des sols peut également vous aider à identifier les nutriments manquants.";
        translation = "Ngir yokk meññeef yi, dama leen di digal nga xool bu baax ni ngay suyé suuf si, jëfandikoo dënnub jubo ju baax, soppi ji gi ak waxtu, te seetaan yaram wi gàncax yi. Seet suuf si man na la dimbali nga xam luy néew ci suuf si.";
      } else if (message.includes("maïs") || message.includes("planter") || message.includes("quand")) {
        response = "Le meilleur moment pour planter le maïs dépend de votre région, mais généralement, plantez quand la température du sol atteint au moins 10-12°C. Au Sénégal, cela correspond souvent à la période mai-juin, au début de la saison des pluies. Assurez-vous que le risque de gel est passé et que le sol est suffisamment humide.";
        translation = "Jamono ji gën ci ji mbooñ dafa laalo ci réew mi nga ne, waaye ci Sénégal, Maajé-Suwe moo gën, bu nawet bi tambee. Xaaral ba suuf si sedd te tooy bu baax.";
      } else if (message.includes("ravageurs") || message.includes("insectes") || message.includes("natural")) {
        response = "Pour lutter contre les ravageurs naturellement, vous pouvez utiliser des prédateurs naturels (coccinelles pour les pucerons), planter des plantes répulsives (comme la lavande ou l'ail), utiliser des décoctions de plantes (purin d'ortie), maintenir la biodiversité dans vos cultures, et pratiquer la rotation des cultures pour briser les cycles des ravageurs.";
        translation = "Ngir xeex ak ay boroom doole yi, mën nga jëfandikoo yëpp yi leen di rey (koccinel ngir afiron yi), jiwoo ay gàncax yu am xeeñ (lawand walla lajj), jëfandikoo ndoxum ay gàncax, denc xeeti gàncax yu bari ci tool yi, te soppi yi gi ak waxtu ngir dog doxinu boroom doole yi.";
      } else if (message.includes("cultures") || message.includes("saison") || message.includes("meilleures")) {
        response = "Les meilleures cultures pour cette saison dépendent de votre région et du climat actuel. Pour la saison des pluies (hivernage) au Sénégal, les cultures recommandées sont le mil, le sorgho, le maïs, l'arachide et le niébé. Pour la saison sèche, avec irrigation, vous pouvez cultiver des légumes comme les tomates, oignons, choux et carottes.";
        translation = "Gàncax yi gën ci jamono bii dañu laalo ci sa réew mi ak jamono ji. Ci nawet, ci Sénégal, dugub, mbooñ, gerte ak ñébé ñoo gën. Ci noor, soo amee ndox moo, mën nga ji xorom, lajj, suu, ak karott.";
      } else {
        response = "Merci pour votre question. Pour vous répondre précisément, j'aurais besoin de plus de détails sur votre situation agricole spécifique. N'hésitez pas à me donner plus d'informations sur vos cultures, votre région, ou à préciser votre question.";
        translation = "Jërajëf ci laaj bi. Ngir mën la tontu, dama soxla yeneen xibaar ci sa mbey. Bul tiit ci may yeneen xibaar ci say gàncax, sa réew, walla nga wax ma bu baax sa laaj.";
      }
      
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        translation,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsSending(false);
      setIsTranslating(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    // Focus on input after setting suggestion
    setTimeout(() => {
      const inputElement = document.getElementById("chat-input");
      if (inputElement) {
        inputElement.focus();
      }
    }, 0);
  };

  return (
    <AppLayout title="Assistant IA">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau de chat */}
        <Card className="lg:col-span-2 flex flex-col h-[calc(100vh-12rem)]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Assistant Agricole</CardTitle>
                <CardDescription>
                  Posez vos questions en français, recevez des réponses traduites en wolof
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslations(!showTranslations)}
                className="flex items-center space-x-2"
              >
                {showTranslations ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span className="hidden sm:inline">Masquer traduction</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Afficher traduction</span>
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-4 max-w-[80%] shadow ${
                      message.role === "user"
                        ? "bg-agri-green text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-1">
                        <MessageSquare className="h-4 w-4 mr-2 text-agri-green" />
                        <span className="text-xs font-semibold text-agri-green">
                          Assistant
                        </span>
                      </div>
                    )}
                    <p>{message.content}</p>
                    
                    {message.translation && showTranslations && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm italic text-gray-600 dark:text-gray-300">
                          {message.translation}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-1 text-right">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                title="Enregistrer un message vocal"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                id="chat-input"
                placeholder="Tapez votre message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyUp={handleKeyPress}
                className="flex-grow"
                disabled={isSending}
              />
              <Button
                className="flex-shrink-0 bg-agri-green hover:bg-agri-green-dark"
                size="icon"
                onClick={handleSendMessage}
                disabled={isSending || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Panneau d'aide et suggestions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suggestions de questions</CardTitle>
              <CardDescription>
                Des questions populaires qui pourraient vous aider
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left hover:bg-agri-green/5"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ArrowRight className="h-4 w-4 mr-2 text-agri-green" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Conseils du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-agri-green-dark">Irrigation optimale</h4>
                  <p className="text-sm text-gray-600">
                    Arrosez tôt le matin pour minimiser l'évaporation et prévenir les maladies fongiques.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-agri-green-dark">Protection des sols</h4>
                  <p className="text-sm text-gray-600">
                    Utilisez du paillis pour conserver l'humidité, réduire les mauvaises herbes et enrichir le sol.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Assistant;
