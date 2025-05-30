
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, DollarSign, Share, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/components/navbar/LanguageContext';

export default function Contact() {
  const { currentLanguage } = useLanguage();
  
  // Translations for the Contact page
  const translations = {
    en: {
      contactUs: "Contact Us",
      allContacts: "All Contacts",
      support: "Support",
      community: "Community", 
      donate: "Support Us",
      email: {
        title: "Email",
        value: "cijhn@hotmail.com",
        description: "For support, feedback and business inquiries."
      },
      discord: {
        title: "Discord",
        value: "Join our community",
        description: "Chat with developers and other users."
      },
      kofi: {
        title: "Ko-fi",
        value: "Support our development",
        description: "Help us continue to improve XMCL with your support."
      },
      afdian: {
        title: "Afdian",
        value: "支持我们的发展",
        description: "另一种支持XMCL开发的方式。"
      },
      kook: {
        title: "Kook",
        value: "加入中文社区",
        description: "加入XMCL的中文社区交流。"
      }
    },
    ru: {
      contactUs: "Свяжитесь с нами",
      allContacts: "Все контакты",
      support: "Поддержка",
      community: "Сообщество",
      donate: "Поддержать нас",
      email: {
        title: "Электронная почта",
        value: "cijhn@hotmail.com",
        description: "Для поддержки, отзывов и деловых запросов."
      },
      discord: {
        title: "Discord",
        value: "Присоединяйтесь к сообществу",
        description: "Общайтесь с разработчиками и другими пользователями."
      },
      kofi: {
        title: "Ko-fi",
        value: "Поддержите нашу разработку",
        description: "Помогите нам продолжать улучшать XMCL своей поддержкой."
      },
      afdian: {
        title: "Afdian",
        value: "支持我们的发展",
        description: "Другой способ поддержать разработку XMCL."
      },
      kook: {
        title: "Kook",
        value: "加入中文社区",
        description: "Присоединяйтесь к китайскому сообществу XMCL."
      }
    },
    uk: {
      contactUs: "Зв'яжіться з нами",
      allContacts: "Всі контакти",
      support: "Підтримка",
      community: "Спільнота",
      donate: "Підтримати нас",
      email: {
        title: "Електронна пошта",
        value: "cijhn@hotmail.com",
        description: "Для підтримки, відгуків та ділових запитів."
      },
      discord: {
        title: "Discord",
        value: "Приєднуйтесь до спільноти",
        description: "Спілкуйтеся з розробниками та іншими користувачами."
      },
      kofi: {
        title: "Ko-fi",
        value: "Підтримайте наш розвиток",
        description: "Допоможіть нам продовжувати вдосконалювати XMCL своєю підтримкою."
      },
      afdian: {
        title: "Afdian",
        value: "支持我们的发展",
        description: "Інший спосіб підтримати розробку XMCL."
      },
      kook: {
        title: "Kook",
        value: "加入中文社区",
        description: "Приєднуйтесь до китайської спільноти XMCL."
      }
    },
    zh: {
      contactUs: "联系我们",
      allContacts: "所有联系方式",
      support: "支持",
      community: "社区",
      donate: "支持我们",
      email: {
        title: "电子邮件",
        value: "cijhn@hotmail.com",
        description: "用于支持、反馈和商业咨询。"
      },
      discord: {
        title: "Discord",
        value: "加入我们的社区",
        description: "与开发者和其他用户聊天。"
      },
      kofi: {
        title: "Ko-fi",
        value: "支持我们的开发",
        description: "通过您的支持帮助我们继续改进XMCL。"
      },
      afdian: {
        title: "爱发电",
        value: "支持我们的发展",
        description: "另一种支持XMCL开发的方式。"
      },
      kook: {
        title: "Kook",
        value: "加入中文社区",
        description: "加入XMCL的中文社区交流。"
      }
    },
    de: {
      contactUs: "Kontaktieren Sie uns",
      allContacts: "Alle Kontakte",
      support: "Support",
      community: "Community",
      donate: "Unterstützen Sie uns",
      email: {
        title: "E-Mail",
        value: "cijhn@hotmail.com",
        description: "Für Support, Feedback und geschäftliche Anfragen."
      },
      discord: {
        title: "Discord",
        value: "Treten Sie unserer Community bei",
        description: "Chatten Sie mit Entwicklern und anderen Benutzern."
      },
      kofi: {
        title: "Ko-fi",
        value: "Unterstützen Sie unsere Entwicklung",
        description: "Helfen Sie uns, XMCL mit Ihrer Unterstützung weiter zu verbessern."
      },
      afdian: {
        title: "Afdian",
        value: "支持我们的发展",
        description: "Eine andere Möglichkeit, die Entwicklung von XMCL zu unterstützen."
      },
      kook: {
        title: "Kook",
        value: "加入中文社区",
        description: "Treten Sie der chinesischen XMCL-Community bei."
      }
    },
    ja: {
      contactUs: "お問い合わせ",
      allContacts: "すべての連絡先",
      support: "サポート",
      community: "コミュニティ",
      donate: "サポートする",
      email: {
        title: "メール",
        value: "cijhn@hotmail.com",
        description: "サポート、フィードバック、ビジネスに関するお問い合わせ。"
      },
      discord: {
        title: "Discord",
        value: "コミュニティに参加する",
        description: "開発者や他のユーザーとチャットする。"
      },
      kofi: {
        title: "Ko-fi",
        value: "開発をサポートする",
        description: "あなたのサポートでXMCLの改善を続けるのを手伝ってください。"
      },
      afdian: {
        title: "Afdian",
        value: "支持我们的发展",
        description: "XMCLの開発をサポートする別の方法。"
      },
      kook: {
        title: "Kook",
        value: "加入中文社区",
        description: "XMCL中国語コミュニティに参加する。"
      }
    }
  };

  // Select the appropriate translation based on the current language
  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  const contacts = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: text.email.title,
      value: text.email.value,
      link: "mailto:cijhn@hotmail.com",
      description: text.email.description,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: text.discord.title,
      value: text.discord.value,
      link: "https://discord.gg/W5XVwYY7GQ",
      description: text.discord.description,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: text.kofi.title,
      value: text.kofi.value,
      link: "https://ko-fi.com/ci010",
      description: text.kofi.description,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: text.afdian.title,
      value: text.afdian.value,
      link: "https://afdian.net/@ci010",
      description: text.afdian.description,
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Share className="h-6 w-6" />,
      title: text.kook.title,
      value: text.kook.value,
      link: "https://kook.top/gqjSHh",
      description: text.kook.description,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <motion.h1 
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {text.contactUs}
              </motion.h1>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8 w-full justify-center bg-white/5 backdrop-blur-sm border border-white/10">
                <TabsTrigger value="all" tooltip={text.allContacts} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">{text.allContacts}</TabsTrigger>
                <TabsTrigger value="support" tooltip={text.support} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">{text.support}</TabsTrigger>
                <TabsTrigger value="community" tooltip={text.community} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">{text.community}</TabsTrigger>
                <TabsTrigger value="donate" tooltip={text.donate} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">{text.donate}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {contacts.map((contact, index) => (
                    <ContactCard 
                      key={index}
                      {...contact}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <ContactCard {...contacts[0]} />
                </div>
              </TabsContent>
              
              <TabsContent value="community" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <ContactCard {...contacts[1]} />
                  <ContactCard {...contacts[4]} />
                </div>
              </TabsContent>
              
              <TabsContent value="donate" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <ContactCard {...contacts[2]} />
                  <ContactCard {...contacts[3]} />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
  description: string;
  gradient: string;
  delay?: number;
}

function ContactCard({ icon, title, value, link, description, gradient, delay = 0 }: ContactCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" 
             style={{ background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))` }} />
        
        <div className="relative p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
          <div className="flex items-start mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                {title}
              </h3>
              <p className="text-lg font-medium text-white/90 mb-2">{value}</p>
            </div>
          </div>
          <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
            {description}
          </p>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out" />
        </div>
      </div>
    </motion.a>
  );
}
