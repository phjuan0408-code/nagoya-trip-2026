export default function CityIntro({
  title,
  subtitle,
  paragraphs = [],
  imageSrc,
  imageAlt = "",
}) {
  return (
    <div className="bg-[#fdf6ef] font-serif">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 pt-5 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="h-full max-h-[500px] w-full rounded-lg object-cover object-center shadow-md"
          />
        </div>

        <div className="text-[#504339] md:col-span-7">
          <h3 className="mb-2 text-xl">{subtitle}</h3>
          <h2 className="mb-6 text-4xl font-bold">{title}</h2>
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`text-lg leading-relaxed text-[#504339] ${index === 0 ? "mb-4" : "mt-4"}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
