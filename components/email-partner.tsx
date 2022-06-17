import React from "react";
import { useForm } from "@formspree/react";

export default function PartnerForm() {
  const [state, handleSubmit] = useForm("mdobjayl");
  if (state.succeeded) {
    return <div>Thank you for signing up!</div>;
  }
  return (
    <form
      action="https://formspree.io/f/mdobjayl"
      onSubmit={handleSubmit}
      method="POST"
      className="sm:max-w-xl sm:mx-auto lg:mx-0"
    >
      <div className="sm:flex">
        <div className="min-w-0 flex-1 mb-4">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="name"
            placeholder="Enter your email"
            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
          />
        </div>
        <div className="sm: mb-4 sm:ml-3">
          <button
            type="submit"
            disabled={state.submitting}
            className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
