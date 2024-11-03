import React, { useState } from "react";
import { faq } from "../data/data";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const ToggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-gray-50 py-16" id="faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div key={index}>
              <button
                className="flex justify-between w-full p-4 text-left text-white bg-[#F37335] rounded-lg"
                onClick={() => ToggleFaq(index)}
              >
                <span className="font-semibold">{item.question}</span>
                <span className="text-lg">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="p-4 text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
