"use client";

import React from "react";
import RecentActivities from "./RecentActivities";
import Recommendations from "./Recommendations";


const BelowGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RecentActivities />
      <Recommendations />
    </div>
  );
};

export default BelowGrid;