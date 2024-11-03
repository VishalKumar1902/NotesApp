import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Notely?",
      answer:
        "Notely is a productivity app that helps you manage your notes and tasks efficiently.",
    },
    {
      question: "How can I create an account?",
      answer:
        "You can create an account by clicking the signup button on the homepage and filling out the required information.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Yes, Notely is available on both iOS and Android platforms for easy access on the go.",
    },
    {
      question: "What features does Notely offer?",
      answer:
        "Notely offers features such as note-taking, task management, reminders, and collaboration tools.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact support through the contact page on our website or by emailing support@notesapp.com.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16" id="faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 ">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="flex justify-between w-full p-4 text-left 
                text-white bg-[#F37335] rounded-lg   "
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className="text-lg">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="p-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
