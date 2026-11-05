interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
}

export function OptimizedImage({
  aspectRatio,
  className,
  alt,
  ...props
}: OptimizedImageProps) {
  return (
    <div
      className={`overflow-hidden ${aspectRatio ? `aspect-[${aspectRatio}]` : ""} ${className}`}>
      <img
        loading="lazy"
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        {...props}
      />
    </div>
  );
}
