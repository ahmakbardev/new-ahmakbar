"use client";

import {
  MonitorCheck,
  BookOpenCheck,
  Smartphone,
  Code,
  Users,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: <MonitorCheck className="w-6 h-6 text-blue-500" />,
    title: "Live Coding",
    desc: "Collaborative and interactive sessions with mentors.",
  },
  {
    icon: <BookOpenCheck className="w-6 h-6 text-blue-500" />,
    title: "Modular Learning",
    desc: "Easy-to-follow modules that suit your own pace.",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-blue-500" />,
    title: "Custom Dashboard",
    desc: "Personalized dashboard for tracking learning progress.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    title: "Mobile Friendly",
    desc: "Optimized experience across all devices.",
  },
  {
    icon: <Code className="w-6 h-6 text-blue-500" />,
    title: "Real Projects",
    desc: "Build portfolio-worthy applications during the program.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "Community Support",
    desc: "Access to private groups and mentor discussions.",
  },
];

export default function KeyFeatures() {
  return (
    <section className="w-full px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-2">
          Discover our <span className="text-blue-500">Key Features</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Designed to help learners grow confidently with modern learning tools
          and collaborative guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg hover:scale-105 duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
