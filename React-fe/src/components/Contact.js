import React from "react";
import PageHero from "./PageHero";

const Contact = () => {
  return (
    <div className="mt-20">
    <PageHero title="Contact us"/>
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-16 mt-24 mb-24 border-2 rounded-lg mx-14 border-black 2xl:mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold md:text-3xl md:leading-tight ">
            Subscribe to our newsletter
          </h2>
          <p className="mt-3 text-gray-600 ">
            and start making the most of every engagement.
          </p>
        </div>

        <form>
          <div className="w-full sm:max-w-lg md:ml-auto">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div className="w-full">
                <label htmlFor="hero-input" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="hero-input"
                  name="hero-input"
                  className="py-3 px-4 block w-full border border-black shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 "
                  placeholder="Enter your email"
                />
              </div>
              <a
                className="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center px-4 py-2 rounded-full border-2 border-black font-semibold bg-slate-500 text-white hover:bg-slate-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-lg dark:focus:ring-offset-gray-800"
                href="#"
              >
                Subscribe
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Unsubscribe at any time
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Contact;
