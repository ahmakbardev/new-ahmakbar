"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Lightbulb, Smile, Layers, User } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  user: <User size={24} className="text-white" />,
  lightbulb: <Lightbulb size={24} className="text-white" />,
  layers: <Layers size={24} className="text-white" />,
  smile: <Smile size={24} className="text-white" />,
};

export default function WorkProcessTimeline() {
  const { slug } = useParams();
  const t = useTranslations(`${slug as string}.projectTimeline`);
  const tRoot = useTranslations(slug as string); // untuk ambil data di root seperti color

  const steps = Array.from({ length: 4 }, (_, i) => {
    const iconKey = t(`steps.${i}.icon`);
    return {
      title: t(`steps.${i}.title`),
      description: t(`steps.${i}.description`),
      icon: iconMap[iconKey] || <User size={24} className="text-white" />,
    };
  });

  const primaryColor = tRoot("color.hex"); // "#DFBE65" misalnya
  const title = t("title");
  const [first, ...rest] = title.split(" ");

  return (
    <section className="px-6 py-12 bg-white text-center">
      <p className="text-sm font-medium mb-2" style={{ color: primaryColor }}>
        {t("subtitle")}
      </p>
      <h2 className="text-3xl font-bold mb-10">
        {first} <span style={{ color: primaryColor }}>{rest.join(" ")}</span>
      </h2>

      <div className="flex justify-between items-center max-w-5xl mx-auto relative">
        {/* Horizontal line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0" />

        {steps.map((step, i) => (
          <div
            key={i}
            className="relative z-10 w-1/4 flex flex-col items-center"
          >
            {/* Icon Bulat */}
            <div
              className="rounded-full w-14 h-14 flex items-center justify-center mb-3 relative shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              {step.icon}
              <div
                className="absolute top-0 right-0 bg-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full"
                style={{
                  border: `1px solid ${primaryColor}`,
                  color: primaryColor,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
            {/* Text */}
            <h3 className="text-sm font-bold mb-1">{step.title}</h3>
            <p className="text-xs text-gray-500 max-w-[140px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
