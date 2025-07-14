import React from "react";
import contactImd from '/Contact.png'
const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-full h-96 md:h-auto">
          <img
            src={contactImd}
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-6 md:p-10 text-white">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">Feel free to reach out by filling this form.</p>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Your Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-6 rounded bg-blue-600 hover:bg-blue-700 transition-all font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
