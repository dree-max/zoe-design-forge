interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeader({ label, title, subtitle, className = "mb-16" }: SectionHeaderProps) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm text-center p-12 ${className}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle mx-auto">{subtitle}</p>
    </div>
  );
}
