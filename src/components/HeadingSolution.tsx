interface HeadingSolutionProps {
  icon?: React.ReactNode;
  iconName?: string;
  title: string;
  iconClass?: string;
  titleClass?: string;
}

function HeadingSolution({
  icon,
  iconName = "code",
  title,
  iconClass = "h-8 w-8 text-green-600",
  titleClass = "text-2xl font-bold text-black",
}: HeadingSolutionProps) {
  // Các icon mặc định
  const defaultIcons: Record<string, React.ReactNode> = {
    code: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-code ${iconClass}`}
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    globe: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-globe ${iconClass}`}
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
    briefcase: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-briefcase ${iconClass}`}
      >
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
      </svg>
    ),
    // Thêm các icon khác tại đây
  };

  const selectedIcon = icon || defaultIcons[iconName] || defaultIcons.code;

  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      {selectedIcon}
      <h3 className={titleClass}>{title}</h3>
    </div>
  );
}

export default HeadingSolution;
