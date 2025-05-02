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

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  "monitor-check": <MonitorCheck className="w-6 h-6 text-blue-500" />,
  "book-open-check": <BookOpenCheck className="w-6 h-6 text-blue-500" />,
  "layout-dashboard": <LayoutDashboard className="w-6 h-6 text-blue-500" />,
  smartphone: <Smartphone className="w-6 h-6 text-blue-500" />,
  code: <Code className="w-6 h-6 text-blue-500" />,
  users: <Users className="w-6 h-6 text-blue-500" />,
};

export default function KeyFeatures() {
  const { slug } = useParams();
  const t = useTranslations(`${slug as string}.keyFeatures`);
  const features = t.raw("features") as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;

  return (
    <section className="w-full px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-2">
          {t("title")} <span className="text-blue-500">{t("highlight")}</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg hover:scale-105 duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
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
