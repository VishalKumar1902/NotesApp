import React from "react";

const Footer = () => {
  return (
    <div className="bg-red-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-200">
              We provide an intuitive, user-friendly app for managing notes,
              tasks, and productivity on the go. Our mission is to make your
              life simpler.
            </p>
          </div>

          {/* Quick Links Section */}

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-200 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#learn-more"
                  className="text-gray-200 hover:text-white"
                >
                  About
                </a>
              </li>

              <li>
                <a href="#faq" className="text-gray-200 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-200">
              123 Notes Street, Productivity City, 56789
            </p>
            <p className="text-gray-200">Email: support@notesapp.com</p>
            <p className="text-gray-200">Phone: +1 (123) 456-7890</p>
          </div>
          {/* Social Media Icons */}
          <div className="mt-4 flex space-x-4">
            <a href="">
              <img src="" alt="" />
            </a>
          </div>
          {/* Copyright */}
          <div>
            <p>
              &copy; {new Date().getFullYear()} NotesApp. All rights reserverd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
