interface HomeThumbnailStripProps {
    id: string;
    images: readonly string[];
  }
  
  /** Decorative chapter previews. Hidden below desktop exactly as before. */
  export default function HomeThumbnailStrip({ id, images }: HomeThumbnailStripProps) {
    return (
      <div className="strip absolute right-0 top-0 z-[60] hidden h-full w-[8vw] translate-x-[120%] flex-col lg:flex" id={id} aria-hidden="true">
        {images.map((image) => (
          <div className="relative flex-1 border-b border-white/10" key={image}>
            <img className="absolute inset-0 h-full w-full object-cover" src={image} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    );
  }