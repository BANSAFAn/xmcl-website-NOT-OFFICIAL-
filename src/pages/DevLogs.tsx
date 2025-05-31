
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { DevLogHeader } from "@/components/devlogs/DevLogHeader";
import { DevLogCard } from "@/components/devlogs/DevLogCard";
import { DevLog } from "@/types/devlog";
import { fetchDevLogs } from "@/utils/devlogFetcher";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const DevLogs = () => {
  const [devLogs, setDevLogs] = useState<DevLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const logs = await fetchDevLogs();
        setDevLogs(logs);
        
        if (logs.length === 0) {
          toast({
            title: "DevLogs",
            description: "No dev logs available at the moment.",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error fetching dev logs:", error);
        setError("Failed to load development logs. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load development logs. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <DevLogHeader 
            title="Development Logs"
            subtitle="Stay up-to-date with the latest development updates from the XMCL team"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : devLogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {devLogs.map((log, index) => (
                <DevLogCard key={log.id} log={log} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/70 text-lg">No development logs available at the moment.</p>
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <a 
              href="https://discord.com/channels/405213567118213121/990258414900879390" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent/20 text-accent hover:bg-accent/30 transition-colors rounded-md"
            >
              <MessageSquare size={20} />
              View on Discord
            </a>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DevLogs;
