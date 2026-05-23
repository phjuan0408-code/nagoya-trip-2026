import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Lightbox from "yet-another-react-lightbox";
import { places } from "../data/tripData.js";
import { getFoodTagIcon } from "../utils/foodTags.js";
import "keen-slider/keen-slider.min.css";
import "yet-another-react-lightbox/styles.css";

const placeById = new Map(places.map((place) => [place.id, place]));

export default function StorySectionGrid({ title, sections, fallbackImage, imageVariant = "square" }) {
  if (!sections?.length) return null;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4">
      <h2 className="mb-6 font-serif text-2xl font-bold text-[#504339]">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <StoryCard
            key={section.title}
            section={section}
            fallbackImage={fallbackImage}
            imageVariant={imageVariant}
          />
        ))}
      </div>
    </section>
  );
}

function StoryCard({ section, fallbackImage, imageVariant }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const media = section.images?.length
    ? section.images
    : [{ src: fallbackImage, alt: section.title }];
  const hasMultipleSlides = media.length > 1;

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: hasMultipleSlides,
    slides: { perView: 1, spacing: 10 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const imageFrameClass = imageVariant === "square" ? "aspect-square w-full" : "h-48 w-full";
  const mainTag = section.tags?.[0];
  const sectionPlaces = section.placeIds?.map((id) => placeById.get(id)).filter(Boolean) || [];
  const primaryPlace = sectionPlaces[0];
  const googleMapsUrl = section.googleMapsUrl;
  const showFoodMeta = section.category === "food" && primaryPlace;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white p-4 shadow-md">
      <div className="relative overflow-hidden rounded-lg bg-[#fdf6ef]">
        {mainTag && (
          <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold leading-none text-[#504339] shadow-[0_3px_12px_rgba(80,67,57,0.14)] ring-1 ring-[#efe5da]">
            <span aria-hidden="true">{getFoodTagIcon(mainTag)}</span>
            <span>{mainTag}</span>
          </div>
        )}

        <div ref={sliderRef} className="keen-slider">
          {media.map((image, index) => (
            <button
              type="button"
              key={`${image.src}-${index}`}
              className={`keen-slider__slide ${imageFrameClass} overflow-hidden rounded-lg`}
              onClick={() => {
                setCurrentSlide(index);
                setLightboxOpen(true);
              }}
            >
              <img
                src={image.src}
                alt={image.alt || `${section.title} ${index + 1}`}
                loading="lazy"
                className={`${imageFrameClass} object-cover`}
                style={{ objectPosition: image.position || "center" }}
              />
            </button>
          ))}
        </div>

        {hasMultipleSlides && (
          <>
            <button
              type="button"
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-[#504339] shadow transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => instanceRef.current?.next()}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-[#504339] shadow transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {hasMultipleSlides && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {media.map((image, index) => (
              <button
                type="button"
                key={`${image.src}-dot-${index}`}
                onClick={() => instanceRef.current?.moveToIdx(index)}
                className={`h-2 w-2 rounded-full transition ${
                  currentSlide === index ? "bg-[#504339]" : "bg-gray-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentSlide}
        slides={media.map((image) => ({ src: image.src, alt: image.alt }))}
      />

      <div className="flex flex-grow flex-col pt-4">
        <h3 className="font-serif text-lg font-semibold leading-normal text-[#504339]">{section.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{section.body}</p>
        {showFoodMeta && (
          <div className="mt-3 space-y-1 font-serif">
            <p className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={13} />
              {primaryPlace.name}
            </p>
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-xs text-blue-600 transition hover:text-blue-500 hover:underline"
              >
                在 Google 地圖查看 →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
