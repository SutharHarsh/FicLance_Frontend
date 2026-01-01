"use client";

const communicationStyles = [
  {
    id: "casual",
    label: "Casual & Friendly",
    description:
      "Client uses informal language, is flexible with requirements, and provides positive feedback.",
    example:
      '"Hey there! The design looks great so far. Maybe we could try a slightly different color for the buttons? No rush though, whenever you have time. Thanks!"',
    styleClass: "border-primary bg-primary/5",
  },
  {
    id: "professional",
    label: "Professional & Direct",
    description:
      "Client communicates clearly and efficiently, with specific requirements and constructive feedback.",
    example:
      '"The current design meets most requirements, but the button colors need to match our brand guidelines. Please update by Thursday. Thank you."',
    styleClass: "border-gray-200 hover:border-gray-300",
  },
  {
    id: "detailed",
    label: "Detailed & Demanding",
    description:
      "Client provides extensive requirements, expects precise implementation, and gives thorough feedback.",
    example:
      '"The button colors (hex #3A86FF) must be implemented exactly as specified in section 2.3 of the requirements. The current implementation doesn\'t meet our standards. Please fix this by EOD."',
    styleClass: "border-gray-200 hover:border-gray-300",
  },
];

export default function ClientCommunicationSelector({ selected, onChange }) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Client Communication Style
      </h3>
      <p className="text-gray-600 mb-6">
        Choose how your simulated client will communicate with you throughout
        the project.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {communicationStyles.map((style) => (
          <label
            key={style.id}
            htmlFor={style.id}
            className={`cursor-pointer block rounded-xl p-5 border transition-all ${style.styleClass} ${
              selected === style.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-start gap-2 mb-3">
              <input
                type="radio"
                id={style.id}
                name="communication-style"
                value={style.id}
                checked={selected === style.id}
                onChange={() => onChange(style.id)}
                className="mt-1 accent-primary"
              />
              <span className="font-medium text-gray-900">{style.label}</span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{style.description}</p>

            <div className="bg-gray-100 rounded p-3 text-sm text-gray-700">
              <p className="mb-2">
                <span className="font-medium">Example:</span>
              </p>
              <p>{style.example}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}