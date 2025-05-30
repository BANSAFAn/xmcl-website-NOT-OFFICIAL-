
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { detectOS, OSInfo } from '../utils/detectOS';

interface OSContextType {
  osInfo: OSInfo;
  selectedOS: string;
  setSelectedOS: (os: string) => void;
  showOSWarning: boolean;
  setShowOSWarning: (show: boolean) => void;
  acknowledgeWarning: () => void;
  warningAcknowledged: boolean;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [osInfo, setOSInfo] = useState<OSInfo>({
    name: "unknown",
    displayName: "Unknown OS",
    category: "unknown"
  });
  
  const [selectedOS, setSelectedOS] = useState<string>("windows");
  const [showOSWarning, setShowOSWarning] = useState<boolean>(false);
  const [warningAcknowledged, setWarningAcknowledged] = useState<boolean>(false);

  useEffect(() => {
    // Detect OS on client-side only
    const detected = detectOS();
    setOSInfo(detected);
    
    // Set appropriate default OS for desktop platforms
    if (detected.category === "android" || detected.category === "ios") {
      setSelectedOS("windows"); // Default to Windows for mobile users
    } else {
      setSelectedOS(detected.category);
    }
  }, []);
  
  const acknowledgeWarning = () => {
    setWarningAcknowledged(true);
    setShowOSWarning(false);
  };

  return (
    <OSContext.Provider value={{
      osInfo,
      selectedOS,
      setSelectedOS: (os: string) => {
        // Show warning for mobile users trying to download desktop apps
        if ((osInfo.category === "android" || osInfo.category === "ios") && !warningAcknowledged) {
          setShowOSWarning(true);
        } else if (os !== osInfo.category && !warningAcknowledged && 
                  !(osInfo.category === "android" || osInfo.category === "ios")) {
          setShowOSWarning(true);
        } else {
          setSelectedOS(os);
        }
      },
      showOSWarning,
      setShowOSWarning,
      acknowledgeWarning,
      warningAcknowledged
    }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
}
