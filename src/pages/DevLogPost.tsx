
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { fetchDevLog } from "@/utils/devlogFetcher";
import { DevLog } from "@/types/devlog";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Calendar, User, ArrowLeft } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const DevLogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [devLog, setDevLog] = useState<DevLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchLog = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const log = await fetchDevLog(id);
        
        if (!log) {
          setError("DevLog not found");
          toast({
            title: "Error",
            description: "The requested development log could not be found.",
            variant: "destructive",
          });
          return;
        }
        
        setDevLog(log);
      } catch (error) {
        console.error("Error fetching dev log:", error);
        setError("Failed to load the development log. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load the development log. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLog();
  }, [id, toast]);

  const handleBack = () => {
    navigate('/devlogs');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            className="mb-8 text-white/70 hover:text-white"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to DevLogs
          </Button>

          {error ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : devLog ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {devLog.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 items-center mb-8 text-white/70">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {devLog.date}
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {devLog.author}
                </div>
              </div>
              
              {devLog.imageUrl && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img 
                    src={devLog.imageUrl} 
                    alt={devLog.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {devLog.content}
                </p>
              </div>
              
              <div className="mt-12 border-t border-white/10 pt-8">
                <p className="text-white/60 text-sm">
                  This development log was originally posted on our Discord channel. 
                  <a 
                    href="https://discord.com/channels/405213567118213121/990258414900879390" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 ml-1"
                  >
                    Join our Discord
                  </a> for real-time updates and discussions.
                </p>
              </div>
            </motion.div>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DevLogPost;
