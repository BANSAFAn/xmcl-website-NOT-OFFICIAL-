import { Github, Archive, Package, Download } from "lucide-react";
import { DownloadOption } from "./types";
import { LinuxAssets } from "./types";
import { useOSAssets } from "./fetchReleases";
import { ExtendedTranslations } from "./types";

type RenderFunctionProps = {
  getTranslation: (key: keyof ExtendedTranslations) => string;
  setDownloadProgress: (progress: number) => void;
  setCurrentAsset: (asset: string | null) => void;
  setShowConfirmation: (show: boolean) => void;
};

export const renderLinuxOptions = ({
  setDownloadProgress,
  setCurrentAsset,
  setShowConfirmation,
}: RenderFunctionProps): DownloadOption[] => {
  // Get Linux assets from GitHub
  const { assets } = useOSAssets("linux");
  const linuxAssets = assets as LinuxAssets;

  const options: DownloadOption[] = [];

  // Linux Flatpak (always included as it's a link to a different repo)
  options.push({
    id: "linux_flatpak",
    title: "Linux Flatpak",
    subtitle: "Community maintained Flatpak package",
    icon: <Github size={24} />,
    disabled: false,
    colorClass: "bg-white/5",
    isComingSoon: false,
    link: "https://github.com/v1mkss/io.github.voxelum.xmcl",
    onClick: () => {
      // External link, no download progress
      window.open("https://github.com/v1mkss/io.github.voxelum.xmcl", "_blank");
    },
  });

  // Linux AppImage
  if (linuxAssets?.appimage) {
    options.push({
      id: "linux_appimage",
      title: "AppImage",
      subtitle: "Portable Linux package",
      icon: <Package size={24} />,
      disabled: false,
      colorClass: "bg-white/5",
      isComingSoon: false,
      size: linuxAssets.appimage.size,
      link: linuxAssets.appimage.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.appimage?.url || "");
        setShowConfirmation(true);
      },
    });
  }

  // Linux tarball (tar.gz)
  if (linuxAssets?.tarball) {
    options.push({
      id: "linux_tarball",
      title: "tar.gz",
      subtitle: "Compressed tarball archive",
      icon: <Archive size={24} />,
      disabled: false,
      colorClass: "bg-white/5",
      isComingSoon: false,
      size: linuxAssets.tarball.size,
      link: linuxAssets.tarball.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.tarball?.url || "");
        setShowConfirmation(true);
      },
    });
  }

  // Linux RPM
  if (linuxAssets?.rpm) {
    options.push({
      id: "linux_rpm",
      title: "RPM",
      subtitle: "For Fedora/RHEL-based distributions",
      icon: <Package size={24} />,
      disabled: false,
      colorClass: "bg-white/5",
      isComingSoon: false,
      size: linuxAssets.rpm.size,
      link: linuxAssets.rpm.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.rpm?.url || "");
        setShowConfirmation(true);
      },
    });
  }

  // Linux DEB
  if (linuxAssets?.deb) {
    options.push({
      id: "linux_deb",
      title: "DEB",
      subtitle: "For Debian/Ubuntu-based distributions",
      icon: <Package size={24} />,
      disabled: false,
      colorClass: "bg-white/5",
      isComingSoon: false,
      size: linuxAssets.deb.size,
      link: linuxAssets.deb.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.deb?.url || "");
        setShowConfirmation(true);
      },
    });
  }

  // Linux ARM64
  if (linuxAssets?.arm64) {
    options.push({
      id: "linux_arm",
      title: "ARM64",
      subtitle: "For ARM-based systems like Raspberry Pi",
      icon: <Archive size={24} />,
      disabled: false,
      colorClass: "bg-white/5",
      isComingSoon: false,
      size: linuxAssets.arm64.size,
      link: linuxAssets.arm64.url,
      onClick: () => {
        setDownloadProgress(0);
        setCurrentAsset(linuxAssets.arm64?.url || "");
        setShowConfirmation(true);
      },
    });
  }

  return options;
};
