
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, DollarSign, Share } from 'lucide-react';
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
      donate: "Donate",
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
      patreon: {
        title: "Patreon",
        value: "Support our development",
        description: "Help us continue to improve XMCL."
      },
      afdian: {
        title: "Afdian",
        value: "支持我们",
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
      donate: "Поддержать",
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
      patreon: {
        title: "Patreon",
        value: "Поддержите нашу разработку",
        description: "Помогите нам продолжать улучшать XMCL."
      },
      afdian: {
        title: "Afdian",
        value: "支持我们",
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
      donate: "Підтримати",
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
      patreon: {
        title: "Patreon",
        value: "Підтримайте нашу розробку",
        description: "Допоможіть нам продовжувати вдосконалювати XMCL."
      },
      afdian: {
        title: "Afdian",
        value: "支持我们",
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
      donate: "赞助",
      email: {
        title: "电子邮件",
        value: "cijhn@hotmail.com",
        description: "用于支持、反馈和业务咨询。"
      },
      discord: {
        title: "Discord",
        value: "加入我们的社区",
        description: "与开发者和其他用户聊天。"
      },
      patreon: {
        title: "Patreon",
        value: "支持我们的开发",
        description: "帮助我们继续改进XMCL。"
      },
      afdian: {
        title: "爱发电",
        value: "支持我们",
        description: "另一种支持XMCL开发的方式。"
      },
      kook: {
        title: "KOOK",
        value: "加入中文社区",
        description: "加入XMCL的中文社区交流。"
      }
    }
  };

  // Select the appropriate translation based on the current language
  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  const contacts = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: text.email.title,
      value: text.email.value,
      link: "mailto:cijhn@hotmail.com",
      description: text.email.description
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: text.discord.title,
      value: text.discord.value,
      link: "https://discord.gg/W5XVwYY7GQ",
      description: text.discord.description
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: text.patreon.title,
      value: text.patreon.value,
      link: "https://patreon.com/xmcl",
      description: text.patreon.description
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: text.afdian.title,
      value: text.afdian.value,
      link: "https://afdian.net/@ci010",
      description: text.afdian.description
    },
    {
      icon: <Share className="h-5 w-5" />,
      title: text.kook.title,
      value: text.kook.value,
      link: "https://kook.top/gqjSHh",
      description: text.kook.description
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8 text-center">{text.contactUs}</h1>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full justify-center">
                <TabsTrigger value="all">{text.allContacts}</TabsTrigger>
                <TabsTrigger value="support">{text.support}</TabsTrigger>
                <TabsTrigger value="community">{text.community}</TabsTrigger>
                <TabsTrigger value="donate">{text.donate}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {contacts.map((contact, index) => (
                    <ContactCard 
                      key={index}
                      icon={contact.icon}
                      title={contact.title}
                      value={contact.value}
                      link={contact.link}
                      description={contact.description}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <ContactCard 
                    icon={<Mail className="h-5 w-5" />}
                    title={text.email.title}
                    value={text.email.value}
                    link="mailto:cijhn@hotmail.com"
                    description={text.email.description}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="community" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <ContactCard 
                    icon={<MessageCircle className="h-5 w-5" />}
                    title={text.discord.title}
                    value={text.discord.value}
                    link="https://discord.gg/W5XVwYY7GQ"
                    description={text.discord.description}
                  />
                  <ContactCard 
                    icon={<Share className="h-5 w-5" />}
                    title={text.kook.title}
                    value={text.kook.value}
                    link="https://kook.top/gqjSHh"
                    description={text.kook.description}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="donate" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <ContactCard 
                    icon={<DollarSign className="h-5 w-5" />}
                    title={text.patreon.title}
                    value={text.patreon.value}
                    link="https://patreon.com/xmcl"
                    description={text.patreon.description}
                  />
                  <ContactCard 
                    icon={<DollarSign className="h-5 w-5" />}
                    title={text.afdian.title}
                    value={text.afdian.value}
                    link="https://afdian.net/@ci010"
                    description={text.afdian.description}
                  />
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
  delay?: number;
}

function ContactCard({ icon, title, value, link, description, delay = 0 }: ContactCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-accent/20 text-accent mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="mb-2 text-lg font-medium">{value}</p>
      <p className="text-sm text-white/70">{description}</p>
    </motion.a>
  );
}
