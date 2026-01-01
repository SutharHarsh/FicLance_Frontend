"use client"; // ✅ Required if you're using App Router (Next.js 13+)

import { useState } from "react";
import ClientCommunicationSelector from "./ClientCommunicationSelector";
import DeadlinePressureSlider from "./DeadlinePressureSlider";
import AdditionalOptions from "./AdditionalOptions";

const SimulationParameters = () => {
  const [communicationStyle, setCommunicationStyle] = useState("casual");
  const [pressure, setPressure] = useState(3);
  const [additionalOptions, setAdditionalOptions] = useState({
    "real-time-feedback": true,
    "technical-challenges": true,
    "unexpected-requests": false,
    "record-session": true,
  });

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Customize Simulation Parameters
      </h2>

      {/* Client Communication Selector */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <ClientCommunicationSelector
          selected={communicationStyle}
          onChange={setCommunicationStyle}
        />
        {/* Debug / Info */}
        <p className="text-sm text-gray-500 mt-4">
          Selected style: <strong>{communicationStyle}</strong>
        </p>
      </div>

      {/* Deadline Pressure */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <DeadlinePressureSlider value={pressure} onChange={setPressure} />
      </div>

      {/* Additional Options */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <AdditionalOptions
          options={additionalOptions}
          onChange={setAdditionalOptions}
        />
      </div>
    </div>
  );
};

export default SimulationParameters;