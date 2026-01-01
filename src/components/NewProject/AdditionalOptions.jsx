"use client";

const optionsList = [
  {
    id: "real-time-feedback",
    label: "Enable real-time feedback",
    description:
      "Receive feedback from your client as you progress through the project.",
  },
  {
    id: "technical-challenges",
    label: "Include technical challenges",
    description:
      "Face realistic technical obstacles that you'll need to overcome during the project.",
  },
  {
    id: "unexpected-requests",
    label: "Add unexpected client requests",
    description:
      "Experience scope changes and additional requirements during the project lifecycle.",
  },
  {
    id: "record-session",
    label: "Record session for portfolio",
    description:
      "Save your work and client interactions to showcase in your Ficlance portfolio.",
  },
];

export default function AdditionalOptions({ options, onChange }) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Additional Options
      </h3>
      <p className="text-gray-600 mb-6">
        Customize your simulation experience with these optional features.
      </p>

      <div className="space-y-4">
        {optionsList.map((option) => (
          <div className="flex items-start" key={option.id}>
            <input
              type="checkbox"
              id={option.id}
              checked={options[option.id] || false}
              onChange={() =>
                onChange({ ...options, [option.id]: !options[option.id] })
              }
              className="mt-1.5 accent-blue-600 w-5 h-5 rounded-md border-gray-300 shadow-sm focus:ring-blue-500"
            />
            <label htmlFor={option.id} className="ml-3 text-gray-700">
              {option.label}
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}