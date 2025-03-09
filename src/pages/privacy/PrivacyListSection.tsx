
import { PrivacySection } from "./PrivacySection";

interface PrivacyListSectionProps {
  title: string;
  content: string;
  items: string[];
  variant?: "regular" | "subsection";
}

export const PrivacyListSection = ({ title, content, items, variant }: PrivacyListSectionProps) => {
  return (
    <PrivacySection
      title={title}
      variant={variant}
      content={
        <>
          <p className="text-white/70 mb-4">{content}</p>
          <ul className="list-disc pl-8 text-white/70 mb-6">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      }
    />
  );
};
