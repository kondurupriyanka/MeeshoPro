import { useState, useRef, useEffect } from "react";
import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your ModernMeesho assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addMessage = (text: string, isBot: boolean) => {
    setMessages([...messages, { id: Date.now().toString(), text, isBot }]);
  };

  const processUserMessage = (userMessage: string) => {
    // Simple rule-based responses
    const lowerCaseMessage = userMessage.toLowerCase();
    
    setTimeout(() => {
      if (lowerCaseMessage.includes("where is my order") || lowerCaseMessage.includes("order status")) {
        addMessage("You can check your order status in the 'My Orders' section of your account. If you have any specific order number, please share it for more details.", true);
      } else if (lowerCaseMessage.includes("return policy")) {
        addMessage("Our return policy allows for returns within 7 days of delivery. The product must be unused and in its original packaging. We offer hassle-free returns with full refund or exchange options.", true);
      } else if (lowerCaseMessage.includes("kurti") && (lowerCaseMessage.includes("under") || lowerCaseMessage.includes("₹500") || lowerCaseMessage.includes("500"))) {
        addMessage("I found several kurtis under ₹500! Check out our 'Casual Cotton Kurta' at ₹399 or browse our special offers section for more affordable options.", true);
      } else if (lowerCaseMessage.includes("delivery")) {
        addMessage("Standard delivery takes 3-5 business days. Premium delivery options are available at checkout for faster service. Free delivery is available on orders above ₹499.", true);
      } else if (lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("pay")) {
        addMessage("We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery for eligible products.", true);
      } else {
        addMessage("I'm not sure I understand. Could you rephrase your question? You can ask about order status, return policy, product recommendations, or delivery information.", true);
      }
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    addMessage(inputValue, false);
    
    // Process response
    processUserMessage(inputValue);
    
    // Clear input
    setInputValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleChatbot}
        className="bg-primary hover:bg-pink-700 text-white rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <h3 className="font-medium">ModernMeesho Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-white hover:bg-pink-700"
                onClick={toggleChatbot}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex mb-4 ${!message.isBot && 'justify-end'}`}
                >
                  {message.isBot && (
                    <div className="flex-shrink-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div 
                    className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                      message.isBot 
                        ? 'bg-white text-neutral-dark' 
                        : 'bg-secondary text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-l-md py-2 px-3"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-pink-700 text-white rounded-r-md px-4 py-2"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>Try asking about: Where is my order? Suggest me kurtis under ₹500</p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
