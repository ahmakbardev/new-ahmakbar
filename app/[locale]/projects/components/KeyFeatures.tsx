"use client";

import {
  MonitorCheck,
  BookOpenCheck,
  Smartphone,
  Code,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function KeyFeatures() {
  const { slug } = useParams();
  const t = useTranslations(`${slug as string}.keyFeatures`);
  const tRoot = useTranslations(slug as string); // buat ambil warna

  const colorHex = tRoot("color.hex") || "#3B82F6";

  const features = t.raw("features") as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;

  // IconMap dibungkus dengan memo supaya warnanya dinamis juga
  const iconMap = useMemo(
    () =>
      ({
        "monitor-check": (
          <MonitorCheck className="w-6 h-6" style={{ color: colorHex }} />
        ),
        "book-open-check": (
          <BookOpenCheck className="w-6 h-6" style={{ color: colorHex }} />
        ),
        "layout-dashboard": (
          <LayoutDashboard className="w-6 h-6" style={{ color: colorHex }} />
        ),
        smartphone: (
          <Smartphone className="w-6 h-6" style={{ color: colorHex }} />
        ),
        code: <Code className="w-6 h-6" style={{ color: colorHex }} />,
        users: <Users className="w-6 h-6" style={{ color: colorHex }} />,
      }) as Record<string, React.ReactNode>,
    [colorHex],
  );

  return (
    <section className="w-full px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-2">
          {t("title")} <span style={{ color: colorHex }}>{t("highlight")}</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg hover:scale-105 duration-300"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${colorHex}20` }} // 20 = approx 12.5% opacity
            >
              {iconMap[feature.icon]}
            </div>
            <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
