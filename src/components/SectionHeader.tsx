interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle: string;
  className?: string;
  headingLevel?: "h1" | "h2";
}

export default function SectionHeader({ label, title, subtitle, className = "mb-16", headingLevel: Tag = "h2" }: SectionHeaderProps) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm text-center p-12 ${className}`}>
      <span className="section-label">{label}</span>
      <Tag className="section-title">{title}</Tag>
      <p className="section-subtitle mx-auto">{subtitle}</p>
    </div>
  );
}
