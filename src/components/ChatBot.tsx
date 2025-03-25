
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, MinusSquare, Loader2 } from "lucide-react";
import { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

// Mock products data for recommendations
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Casual Shirt",
    description: "Comfortable cotton shirt for casual occasions",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHx8fDA%3D",
    category: "Clothing",
    tags: ["shirt", "casual", "cotton"],
    inStock: true
  },
  {
    id: "2",
    name: "Formal Blazer",
    description: "Elegant blazer for formal events",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhemVyfGVufDB8fDB8fHww",
    category: "Clothing",
    tags: ["formal", "blazer", "elegant"],
    inStock: true
  },
  {
    id: "3",
    name: "Sneakers",
    description: "Comfortable sneakers for daily use",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNuZWFrZXJzfGVufDB8fDB8fHww",
    category: "Footwear",
    tags: ["shoes", "sneakers", "comfortable"],
    inStock: true,
    discount: 15
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your shopping assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Clear any previous recommendations
    setRecommendations([]);
    
    // Simulate API delay
    setTimeout(() => {
      let botResponse = "I'm not sure how to help with that. Can you provide more details about what you're looking for?";
      let productRecs: Product[] = [];
      
      // Simple keyword matching for demo purposes
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("college") || lowerInput.includes("annual day") || lowerInput.includes("event")) {
        botResponse = "For a college annual day, I'd recommend smart casual attire that looks presentable yet comfortable. Here are some suggestions:";
        productRecs = mockProducts;
      } else if (lowerInput.includes("shirt") || lowerInput.includes("clothing")) {
        botResponse = "I found some great clothing options that might interest you:";
        productRecs = mockProducts.filter(p => p.category === "Clothing");
      } else if (lowerInput.includes("shoes") || lowerInput.includes("sneakers")) {
        botResponse = "Here are some footwear options you might like:";
        productRecs = mockProducts.filter(p => p.tags.includes("shoes") || p.tags.includes("sneakers"));
      }
      
      // Add bot response
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setRecommendations(productRecs);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 rounded-full shadow-lg p-3 h-14 w-14",
          "bg-primary hover:bg-primary/90 text-white",
          "transition-all duration-300 animate-scale-in z-50"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
      
      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-40",
          "transition-all duration-300 transform",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
          isMinimized ? "h-16" : "h-[500px]",
          "w-[350px] sm:w-[400px]"
        )}
      >
        <Card className="w-full h-full overflow-hidden glass-panel shadow-lg flex flex-col">
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/assistant-avatar.png" />
                <AvatarFallback className="bg-primary/10 text-primary">SA</AvatarFallback>
              </Avatar>
              Shopping Assistant
            </CardTitle>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={toggleMinimize}
              >
                <MinusSquare className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7" 
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1">
                <CardContent className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] px-4 py-2 rounded-lg animate-fade-in",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 block text-right mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] px-4 py-3 rounded-lg bg-muted flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span className="text-sm">Typing...</span>
                      </div>
                    </div>
                  )}
                  
                  {recommendations.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                      <p className="text-sm text-muted-foreground">Recommendations:</p>
                      {recommendations.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </CardContent>
              </ScrollArea>
              
              <CardFooter className="p-2 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                  <Input
                    ref={inputRef}
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default ChatBot;
