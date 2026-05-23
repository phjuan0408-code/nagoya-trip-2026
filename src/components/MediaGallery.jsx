import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Lightbox from "yet-another-react-lightbox";
import "keen-slider/keen-slider.min.css";
import "yet-another-react-lightbox/styles.css";

export default function MediaGallery({ title, images }) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const slides = images.length ? images : [];
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: slides.length > 1,
    slides: { perView: 1, spacing: 10 },
    slideChanged(slider) {
      setCurrent(slider.track.details.rel);
    },
  });

  if (!slides.length) {
    return (
      <div className="grid aspect-[4/3] place-items-center rounded-lg bg-travel-mist text-center text-sm text-travel-slate">
        <span>Photo slot</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
      <div ref={sliderRef} className="keen-slider">
        {slides.map((image, index) => (
          <button
            type="button"
            key={image.src}
            className="keen-slider__slide aspect-[4/3] bg-travel-mist"
            onClick={() => {
              setCurrent(index);
              setOpen(true);
            }}
          >
            <img
              src={image.src}
              alt={image.alt || `${title} ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ objectPosition: image.position || "center" }}
            />
          </button>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 shadow transition hover:bg-white"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 shadow transition hover:bg-white"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={current}
        slides={slides.map((image) => ({ src: image.src, alt: image.alt }))}
      />
    </div>
  );
}
