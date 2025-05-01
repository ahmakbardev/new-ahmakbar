"use client";

import { Lightbulb, Smile, Layers, User } from "lucide-react";

const steps = [
  {
    title: "Consultation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <User size={24} className="text-white" />,
  },
  {
    title: "Strategy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <Lightbulb size={24} className="text-white" />,
  },
  {
    title: "Implementation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <Layers size={24} className="text-white" />,
  },
  {
    title: "Final Result",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <Smile size={24} className="text-white" />,
  },
];

export default function WorkProcessTimeline() {
  return (
    <section className="px-6 py-12 bg-white text-center">
      <p className="text-sm text-blue-500 font-medium mb-2">Project Timeline</p>
      <h2 className="text-3xl font-bold mb-10">
        Project <span className="text-blue-600">Work Process</span>
      </h2>

      <div className="flex justify-between items-center max-w-5xl mx-auto relative">
        {/* Horizontal line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0" />

        {steps.map((step, i) => (
          <div
            key={i}
            className="relative z-10 w-1/4 flex flex-col items-center"
          >
            {/* Icon */}
            <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-3 relative shadow-lg">
              {step.icon}
              <div className="absolute -top-2 -right-2 bg-white border border-blue-600 text-blue-600 text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
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
