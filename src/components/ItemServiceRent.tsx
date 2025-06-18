interface ItemServiceRentProps {
  icon?: React.ReactNode;
  iconText?: string;
  content: string;
  iconBgClass?: string;
  iconTextClass?: string;
  contentClass?: string;
  containerClass?: string;
}

function ItemServiceRent({
  icon,
  iconText = "💰",
  content,
  iconBgClass = "w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3",
  iconTextClass = "text-white font-bold",
  contentClass = "text-black",
  containerClass = "text-center p-4 bg-white rounded-lg shadow-sm border border-green-200",
}: ItemServiceRentProps) {
  return (
    <div className={containerClass}>
      <div className={iconBgClass}>
        {icon || <span className={iconTextClass}>{iconText}</span>}
      </div>
      <p className={contentClass}>{content}</p>
    </div>
  );
}

export default ItemServiceRent;
