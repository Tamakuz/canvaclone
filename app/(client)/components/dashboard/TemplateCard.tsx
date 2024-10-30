interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
}

const TemplateCard = ({ imageSrc, title, description, width, height, onClick, disabled }: TemplateCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
      <div
        style={{ aspectRatio: `${width}/${height}` }}
        className="relative w-full overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="absolute top-2 right-2 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white"
      >
        Open
      </button>
    </div>
  );
};

export default TemplateCard;
