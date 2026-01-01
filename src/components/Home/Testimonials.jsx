"use client";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const TestimonialCard = ({ name, role, image, rating, message }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
    } else if (i - rating <= 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300 w-5 h-5" />);
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center mb-6">{stars}</div>
      <p className="text-gray-700 mb-6">"{message}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={image}
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ananya Mehra",
      role: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      message:
        "Ficlance was the bridge I needed between learning to code and landing my first real clients. The simulated projects gave me confidence and real-world experience.",
    },
  ];

  return (
    <section className="py-20 mx-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories from users growing through real projects on Ficlance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
