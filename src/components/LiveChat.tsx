
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, Bot } from 'lucide-react';

interface LiveChatProps {
  onBack: () => void;
  user: { name: string; email: string };
  balance?: number;
  transactions?: any[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LiveChat: React.FC<LiveChatProps> = ({ onBack, user, balance = 0, transactions = [] }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to fairmonie support how can I assist you?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Balance related queries
    if (lowerInput.includes('balance') || lowerInput.includes('money') || lowerInput.includes('account')) {
      return `Your current balance is ₦${balance.toLocaleString()}.00. You can:
• Add money by claiming bonuses
• Check transaction history (${transactions.length} transactions)
• Withdraw funds to your bank account
• Use your balance for airtime, data, TV, betting, and loans`;
    }
    
    // Airtime queries
    if (lowerInput.includes('airtime') || lowerInput.includes('recharge phone')) {
      return `To buy airtime:
1. Go to the Airtime section from dashboard
2. Select your network (MTN, Airtel, Glo, 9mobile)
3. Enter phone number and amount
4. Complete payment from your balance
Airtime is credited instantly! Minimum: ₦50, Maximum: ₦10,000`;
    }
    
    // Data queries
    if (lowerInput.includes('data') || lowerInput.includes('internet') || lowerInput.includes('bundle')) {
      return `For data purchase:
1. Navigate to Data section
2. Choose your network provider
3. Select from available data plans:
   • Daily plans (100MB - 1GB)
   • Weekly plans (1GB - 6GB)
   • Monthly plans (1.5GB - 40GB)
4. Enter phone number and pay
Data activates immediately!`;
    }
    
    // TV subscription queries
    if (lowerInput.includes('tv') || lowerInput.includes('dstv') || lowerInput.includes('gotv') || lowerInput.includes('cable')) {
      return `TV subscription services:
📺 Available providers: DSTV, GOTV, StarTimes
📦 Popular packages:
   • DSTV Compact (₦9,000/month)
   • GOTV Max (₦4,850/month)
   • StarTimes Classic (₦2,600/month)

Steps: Go to TV section → Select provider → Enter smartcard number → Choose package → Pay`;
    }
    
    // Loan queries
    if (lowerInput.includes('loan') || lowerInput.includes('borrow') || lowerInput.includes('credit')) {
      return `Quick Loan Service:
💰 Amount: ₦5,000 - ₦500,000
⏱️ Duration: 7 days - 12 months
📋 Requirements:
   • Valid bank account
   • Phone verification
   • Complete application form
   • Enter your faircode to approve your loan

Apply in Loan section. Approval within 24 hours!`;
    }
    
    // Betting queries
    if (lowerInput.includes('bet') || lowerInput.includes('sport') || lowerInput.includes('game')) {
      return `Betting Services:
🏈 Sports: Football, Basketball, Tennis
🎰 Games: Virtual games, Casino
💳 Fund your betting wallet directly
🏆 Popular bookmakers integrated

Access through Betting section for instant funding!`;
    }
    
    // Withdrawal queries
    if (lowerInput.includes('withdraw') || lowerInput.includes('transfer') || lowerInput.includes('send money')) {
      return `Withdrawal Process:
1. Go to Withdraw in quick actions
2. Enter bank details (account number, bank name)
3. Specify amount (minimum ₦100)
4. Confirm transaction

Processing time: 24-48 hours
Fee: ₦50 for amounts above ₦1,000`;
    }
    
    // Referral queries
    if (lowerInput.includes('refer') || lowerInput.includes('invite') || lowerInput.includes('friend') || lowerInput.includes('earn')) {
      return `Referral Program - Earn ₦6,500 per referral! 🎉
1. Go to Invitation section
2. Copy your unique referral link
3. Share with friends
4. Earn when they sign up and verify

Your earnings are credited automatically. Start inviting now!`;
    }
    
    // Payment issues - Fair code not received
    if (lowerInput.includes('payment') || lowerInput.includes('transfer') || lowerInput.includes('paid') || lowerInput.includes('fair code') || lowerInput.includes('faircode') || lowerInput.includes('receive')) {
      if (lowerInput.includes('not receive') || lowerInput.includes('didn\'t receive') || lowerInput.includes('haven\'t received') || lowerInput.includes('no code') || lowerInput.includes('missing')) {
        return `Oops! It looks like there was a network glitch from the confirmation server.
We sincerely apologize for the inconvenience. Kindly try again — everything should work fine now.
Thank you for your patience and understanding! 🙏

If the issue persists after retrying, please contact our support team with your transaction details.`;
      }
      return "For Fair Code purchases, please ensure you have sufficient balance and follow the payment instructions carefully. If you encounter any issues, don't hesitate to ask!";
    }

    // Login/Registration help queries
    if (lowerInput.includes('login') || lowerInput.includes('register') || lowerInput.includes('sign up') || lowerInput.includes('sign in') || (lowerInput.includes('account') && lowerInput.includes('help'))) {
      return `📱 How to Register on FairMonie Pay:

1️⃣ **Visit our platform**
   • Open FairMonie Pay website or app

2️⃣ **Click "Sign Up"**
   • Choose "Create new account"

3️⃣ **Fill your details**
   • Full name
   • Email address
   • Strong password
   • Phone number

4️⃣ **Verify your account**
   • Check your email for verification link
   • Click the verification link

5️⃣ **Complete your profile**
   • Add additional details if required

🔐 **To Login:**
   • Click "Sign In"
   • Enter your email and password
   • Click "Login"

Need help with a specific step? Just ask me!`;
    }

    // F-Code queries
    if (lowerInput.includes('f-code') || lowerInput.includes('fcode') || lowerInput.includes('f-code10883770q') || lowerInput.includes('code')) {
      return `F-Code Information:
💳 Get your faircode below 
🎯 Use of faircode is Required for premium services
📋 How to get your F-Code:
1. Go to Buy FairCode section
2. Fill in your details
3. Complete payment
4. Your Fair-Code will be activated instantly

Your F-Code: will be ready for use!`;
    }
    
    // Transaction history
    if (lowerInput.includes('transaction') || lowerInput.includes('history') || lowerInput.includes('statement')) {
      return `Transaction History:
📊 Total transactions: ${transactions.length}
🔔 Access via bell icon on dashboard
📝 Shows: Credits, debits, airtime, data, withdrawals
📅 Real-time updates

Recent activity and detailed records available!`;
    }
    
    // Support queries
    if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('contact') || lowerInput.includes('problem')) {
      return `24/7 Support Channels:
💬 Live Chat: Here with me!
📧 Email: managementcompany4886@gmail.com
📱 Telegram: @fairmonieadmin1
⚡ Response time: Instant to 24 hours

I'm here to help with any issues!`;
    }
    
    // Security queries
    if (lowerInput.includes('security') || lowerInput.includes('safe') || lowerInput.includes('secure') || lowerInput.includes('password')) {
      return `Security Features:
🔐 Password protection
🛡️ Encrypted transactions
💾 Secure data storage
🔒 Never share login details

Your account and funds are protected with bank-level security!`;
    }
    
    // Account/Profile queries
    if (lowerInput.includes('profile') || lowerInput.includes('account info') || lowerInput.includes('update details')) {
      return `Account Management:
👤 View profile info in More section
✏️ Update personal details
📧 Email: ${user.email}
👋 Name: ${user.name}

Access via Profile Menu for full account settings!`;
    }
    
    // General greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return `Hello! 😊 Great to see you here! 
I'm ready to help with any questions about FairMonie Pay. What would you like to know about today?`;
    }
    
    // Thank you responses
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return `You're very welcome! 😊 
Happy to help anytime. Is there anything else you'd like to know about FairMonie Pay?`;
    }
    
    // Default comprehensive response
    return `I can help you with all FairMonie Pay features:

💰 **Financial Services:**
• Balance management & transactions
• Withdrawals to bank accounts

📱 **Mobile Services:**
• Airtime for all networks
• Data bundles & plans

📺 **Entertainment:**
• DSTV, GOTV, StarTimes subscriptions

💳 **Additional Services:**
• Quick loans (₦5,000-₦500,000)
• Betting wallet funding
• F-Code services (F-CODE10883770Q)

👥 **Earning Opportunities:**
• Referral program (₦6,500/referral)

🔧 **Support:**
• 24/7 assistance available

What specific service can I help you with today?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">FairMonie Assistant</h1>
              <p className="text-xs text-green-600">Online • Ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div id="chat-messages" className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-xs ${message.sender === 'user' ? 'bg-green-600 text-white' : 'bg-white'}`}>
              <CardContent className="p-3">
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about FairMonie Pay..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
