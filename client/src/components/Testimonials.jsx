import React from "react";
import { testimonials } from "../data/data";

const Testimonials = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800  mb-8 ">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src={item.image}
                alt="John Doe"
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="text-gray-700 italic mb-4">{item.review}</p>
              <h3 className="text-[#F37335] font-semibold">— {item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
