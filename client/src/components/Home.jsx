import React from "react";
import { Link } from "react-router-dom";
Link;
import Signup from "./Signup";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import About from "./About";
import Faq from "./Faq";

const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <section className="bg-gradient-to-r from-customGradientStart to-customGradientEnd mt-10 py-20">
        <div className="container mx-auto px-4 flex flex-col  md:w-6xl ">
          <h1 className="text-4xl text-white pb-6 font-semibold">
            Unlock Your Productivity with
            <span className="text-yellow-200"> Notely</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 pt-4 text-white">
            Stay organized, boost creativity, and manage all your ideas in one
            place. Notely is the ultimate notes app that helps you stay on top
            of your tasks, ideas, and inspirations – all in a beautifully simple
            interface.
          </p>
          <p className="text-md md:text-lg mb-6 text-white">
            Whether you're a student, a professional, or just someone with a lot
            of ideas, <strong>Notely</strong> gives you the tools to quickly
            capture and organize your notes anytime, anywhere.
          </p>
          <div className=" flex space-x-4 pt-4">
            {!isAuthenticated && (
              <a href="#signup">
                <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300 ">
                  Get Started{" "}
                </button>
              </a>
            )}

            <a href="#learn-more">
              <button className="bg-transparent border border-white font-bold py-2 px-4 text-white rounded-lg hove:bg-white hover:text-gray-100 transition duration-300">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 p-8 max-w-6xl mx-auto ">
        {/* Signup Form Section */}
        {!isAuthenticated && <Signup />}
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/779/585/large_2x/online-learning-concept-online-class-teacher-at-chalkboard-video-lesson-distance-study-at-school-illustration-flat-style-vector.jpg"
            alt="Online Learning"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </section>
      <About />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
