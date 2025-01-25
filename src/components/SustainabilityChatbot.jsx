import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Leaf, MessageCircle } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

const SustainabilityChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const [typingMessage, setTypingMessage] = useState('');

  const customPrompt = `
You are a friendly and helpful chatbot for a sustainability-focused app similar to Reddit. The app aims to connect people and provide solutions for environmental problems.
Here's how the app works:
* Homepage: Introduces the app's mission and key features.
* Problem/Solution Forum: Users post environmental problems, others offer solutions.
* Reduce/Reuse: Articles and blog posts about reducing consumption and reusing items.
* Recycle: Marketplace for buying and selling recycled goods.
Respond in a clear, concise, and engaging manner about sustainability.
`.trim();

  useEffect(() => {
    const initializeChatSession = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-exp-1206" });
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{text: customPrompt}]
          },
          {
            role: 'model',
            parts: [{text: "I understand. I'm ready to help with sustainability-related queries."}]
          }
        ]
      });
      setChatSession(chat);
    };

    initializeChatSession();
  }, []);

  const typeMessage = (message) => {
    let index = 0;
    setTypingMessage('');
    
    const typingEffect = setInterval(() => {
      if (index < message.length) {
        setTypingMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(typingEffect);
        // Add the fully typed message to messages
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          { type: 'bot', text: message }
        ]);
        setTypingMessage('');
      }
    }, 30); // Adjust typing speed (lower number = faster typing)
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !chatSession) return;

    const newMessages = [
      ...messages, 
      { type: 'user', text: userInput }
    ];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage(userInput);
      const response = result.response;
      const text = response.text();

      // Add a temporary loading message
      setMessages(prevMessages => [
        ...prevMessages, 
        { type: 'bot', text: typingMessage }
      ]);

      // Start typing effect
      typeMessage(text);
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages, 
        { type: 'bot', text: 'Error processing request: ' + error.message }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-green-50 flex flex-row items-center space-x-2">
        <Leaf className="text-green-600" />
        <CardTitle className="text-green-800">Sustainability Chatbot</CardTitle>
      </CardHeader>
      
      <CardContent className="h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-2 p-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-100 text-right self-end' 
                : 'bg-green-100 text-left self-start'
            }`}
          >
            {message.type === 'bot' && typingMessage && message === messages[messages.length - 1]
              ? typingMessage
              : message.text}
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="flex space-x-2">
        <Input 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about sustainability..."
          className="flex-grow"
          disabled={isLoading || !chatSession}
        />
        <Button 
          onClick={handleSendMessage}
          className="bg-green-600 hover:bg-green-700"
          disabled={isLoading || !chatSession}
        >
          <MessageCircle className="mr-2" /> Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SustainabilityChatbot;