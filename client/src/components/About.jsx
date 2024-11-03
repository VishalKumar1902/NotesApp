import React from "react";
import { appFeatures } from "../data/data";

const About = () => {
  return (
    <section className="bg-gray-50 py-16" id="learn-more">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 scroll-m-10">
          Why Choose Our App?
        </h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Our app offers a seamless way to organize your notes, tasks, and
          important reminders all in one place. Whether you're a student,
          professional, or someone who loves to stay organized, our app makes it
          easy to manage your workflow and stay productive.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {appFeatures.map((item, index) => (
            <div
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={index}
            >
              <h3 className="text-2xl font-semibold text-[#F37335] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
