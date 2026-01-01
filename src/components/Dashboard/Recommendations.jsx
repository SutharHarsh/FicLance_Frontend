"use client"; // if you're using Next.js App Router

import { RiArrowRightLine } from "react-icons/ri";
import { recommendations as recommendationsData } from "@/data/dashboard";

const RecommendationCard = ({ icon, iconBg, iconColor, title, description, buttonText }) => (
  <div className="p-4 rounded-lg dark:hover:bg-card-foreground hover:bg-secondary transition">
    <div className="flex items-center mb-3">
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center mr-3`}>
        {icon}
      </div>
      <h3 className="font-medium text-foreground">{title}</h3>
    </div>
    <p className="text-sm text-low-foreground mb-3">{description}</p>
    <button className="text-primary text-sm font-medium hover:underline flex items-center whitespace-nowrap">
      {buttonText}
      <div className="w-4 h-4 ml-1 flex items-center justify-center">
        <RiArrowRightLine />
      </div>
    </button>
  </div>
);

const Recommendations = ({ items = recommendationsData }) => {
  return (
    <div className="grid grid-cols-1 p-8 rounded-2xl bg-card gap-4 cursor-pointer">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recommended For You
      </h2>

      {items.map((item, index) => (
        <RecommendationCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Recommendations;