
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
  category: "windows" | "macos" | "linux" | "unknown";
  distribution?: string;
}

/**
 * Detects user's operating system and Linux distribution if applicable
 */
export function detectOS(): OSInfo {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Windows detection
  if (userAgent.indexOf("win") !== -1) {
    return {
      name: "windows",
      displayName: "Windows",
      category: "windows"
    };
  }
  
  // macOS detection
  if (userAgent.indexOf("mac") !== -1) {
    return {
      name: "macos",
      displayName: "macOS",
      category: "macos"
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
