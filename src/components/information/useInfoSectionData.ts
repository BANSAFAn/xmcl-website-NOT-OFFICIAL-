
import { useState, useEffect } from "react";
import { infoSectionTitles, infoSections, InfoSection } from "./translations";
import { useLanguage } from "@/components/navbar/LanguageContext";

export function useInfoSectionData() {
  const { currentLanguage } = useLanguage();
  const [title, setTitle] = useState(infoSectionTitles.en);
  const [sections, setSections] = useState(infoSections.en);
  
  // Update translations when language changes
  useEffect(() => {
    setTitle(infoSectionTitles[currentLanguage] || infoSectionTitles.en);
    setSections(infoSections[currentLanguage] || infoSections.en);
  }, [currentLanguage]);

  return { currentLanguage, title, sections };
}
