import Link from "next/link";

interface CtaBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  colorBlock?: "lime" | "coral" | "lilac" | "mint" | "navy" | "cream";
}

const colorMap: Record<string, string> = {
  lime: "color-block-panel color-block-panel-lime",
  coral: "color-block-panel color-block-panel-coral",
  lilac: "color-block-panel color-block-panel-lilac",
  mint: "color-block-panel color-block-panel-mint",
  navy: "color-block-panel color-block-panel-navy",
  cream: "color-block-panel color-block-panel-cream",
};

export function CtaBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryText,
  secondaryLink,
  colorBlock = "lime",
}: CtaBannerProps) {
  const isNavy = colorBlock === "navy";

  return (
    <div className="container mx-auto px-4 sm:px-6 my-12 md:my-24">
      <div className={colorMap[colorBlock]}>
        <div className="max-w-3xl">
          <div className={`eyebrow-mono mb-4 ${isNavy ? "text-white/60" : "text-ink/60"}`}>
            The Scene Co.
          </div>
          <h2
            className={`mb-6 ${isNavy ? "text-white" : "text-ink"}`}
            style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 340, lineHeight: 1.1, letterSpacing: "-0.96px" }}
          >
            {title}
          </h2>
          <p className={`mb-8 body-lg-figma ${isNavy ? "text-white/75" : "text-ink/75"}`}>
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={ctaLink}
              className={isNavy ? "inline-block bg-white text-ink hover:opacity-90 font-sans text-sm sm:text-base md:text-lg font-semibold px-6 py-3 rounded-full transition-all duration-200 text-center" : "btn-primary-figma"}
            >
              {ctaText}
            </Link>
            {secondaryText && secondaryLink && (
              <Link
                href={secondaryLink}
                className={isNavy ? "inline-block border border-white/30 text-white hover:bg-white/10 font-sans text-sm sm:text-base md:text-lg font-semibold px-6 py-3 rounded-full transition-all duration-200 text-center" : "btn-secondary-figma"}
              >
                {secondaryText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
