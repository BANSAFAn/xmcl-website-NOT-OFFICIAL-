
type LinuxDistribution = {
  name: string;
  displayName: string;
};

// List of Linux distributions and their identification strings
const LINUX_DISTRIBUTIONS: LinuxDistribution[] = [
  { name: "ubuntu", displayName: "Ubuntu" },
  { name: "fedora", displayName: "Fedora" },
  { name: "debian", displayName: "Debian" },
  { name: "arch", displayName: "Arch Linux" },
  { name: "centos", displayName: "CentOS" },
  { name: "redhat", displayName: "Red Hat" },
  { name: "opensuse", displayName: "openSUSE" },
  { name: "mint", displayName: "Linux Mint" },
  { name: "manjaro", displayName: "Manjaro" },
  { name: "elementary", displayName: "Elementary OS" },
  { name: "zorin", displayName: "Zorin OS" },
  { name: "kali", displayName: "Kali Linux" },
  { name: "gentoo", displayName: "Gentoo" },
  { name: "slackware", displayName: "Slackware" },
  { name: "raspbian", displayName: "Raspbian" },
  { name: "pop", displayName: "Pop!_OS" },
  { name: "suse", displayName: "SUSE Linux" },
];

export interface OSInfo {
  name: string;
  displayName: string;
  category: "windows" | "macos" | "linux" | "android" | "ios" | "unknown";
  distribution?: string;
  version?: string;
}

/**
 * Detects user's operating system including mobile platforms
 */
export function detectOS(): OSInfo {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';
  
  // iOS detection (iPhone, iPad, iPod)
  if (/iphone|ipad|ipod/.test(userAgent) || (platform === 'macintel' && navigator.maxTouchPoints > 1)) {
    const version = userAgent.match(/os (\d+)_(\d+)/);
    return {
      name: "ios",
      displayName: "iOS",
      category: "ios",
      version: version ? `${version[1]}.${version[2]}` : undefined
    };
  }
  
  // Android detection
  if (userAgent.indexOf("android") !== -1) {
    const version = userAgent.match(/android (\d+\.?\d*)/);
    return {
      name: "android",
      displayName: "Android",
      category: "android",
      version: version ? version[1] : undefined
    };
  }
  
  // Windows detection
  if (userAgent.indexOf("win") !== -1) {
    let version = "Unknown";
    if (userAgent.indexOf("windows nt 10.0") !== -1) version = "10/11";
    else if (userAgent.indexOf("windows nt 6.3") !== -1) version = "8.1";
    else if (userAgent.indexOf("windows nt 6.2") !== -1) version = "8";
    else if (userAgent.indexOf("windows nt 6.1") !== -1) version = "7";
    
    return {
      name: "windows",
      displayName: "Windows",
      category: "windows",
      version
    };
  }
  
  // macOS detection (desktop only, not iOS)
  if (userAgent.indexOf("mac") !== -1 && navigator.maxTouchPoints === 0) {
    const version = userAgent.match(/mac os x (\d+[._]\d+)/);
    return {
      name: "macos",
      displayName: "macOS",
      category: "macos",
      version: version ? version[1].replace('_', '.') : undefined
    };
  }
  
  // Linux detection
  if (userAgent.indexOf("linux") !== -1 || userAgent.indexOf("x11") !== -1) {
    // Try to detect specific Linux distribution
    for (const distro of LINUX_DISTRIBUTIONS) {
      if (userAgent.indexOf(distro.name) !== -1) {
        return {
          name: "linux",
          displayName: "Linux",
          category: "linux",
          distribution: distro.displayName
        };
      }
    }
    
    // Default to generic Linux if distribution not found
    return {
      name: "linux",
      displayName: "Linux",
      category: "linux"
    };
  }
  
  // Default to unknown if no match
  return {
    name: "unknown",
    displayName: "Unknown OS",
    category: "unknown"
  };
}
