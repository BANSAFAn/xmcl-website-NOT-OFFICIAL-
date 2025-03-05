
import { SectionHeader } from "./SectionHeader";
import { InfoSectionItem } from "./InfoSectionItem";
import { useInfoSectionData } from "./useInfoSectionData";

export function InformationSection() {
  const { title, sections } = useInfoSectionData();

  return (
    <section className="py-24 bg-minecraft-dark-blue" id="features">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} />

        <div className="space-y-32">
          {sections.map((section, index) => (
            <InfoSectionItem key={index} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
