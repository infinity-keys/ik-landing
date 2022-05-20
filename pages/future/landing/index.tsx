import Head from "next/head";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/solid";
import {
  InboxIcon,
  SparklesIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline";

import Wrapper from "@components/wrapper";
import Puzzle from "@components/puzzle";
import Discord from "@components/svg/discord-svg";

import type { NextPage } from "next";
import Twitter from "@components/svg/twitter-svg";
import TwitterIcon from "@components/svg/twitter-icon-svg";
import MaterialLock from "@components/svg/material-lock-svg";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Hunts", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Docs", href: "#" },
];

const navigationFooter = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

interface PageProps {
  count: number;
}

const Landing: NextPage<PageProps> = ({ count }) => {
  return (
    <Wrapper>
      <Head>
        <title>Infinity Keys</title>
      </Head>

      <div className="scanlines">
        {/* Nav */}
        <header className="w-full fixed z-50 bg-blue">
          <nav className="container px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div className="w-full py-6 flex items-center justify-evenly border-b border-indigo-500 lg:border-none">
              {/* left */}
              <div className="flex items-center">
                <a href="#">
                  <span className="sr-only">Infinity Keys</span>
                  <Image src="/logo.svg" width={80} height={50} alt="IK logo" />
                  {/* <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt=""
                /> */}
                </a>
              </div>
              {/* center */}
              <div className="hidden space-x-8 lg:block">
                {navigation.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium hover:text-indigo-50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-6">
                <TwitterIcon />
                <Discord />
              </div>

              {/* right */}
              <div className="ml-10 space-x-4">
                <a
                  href="#"
                  className="inline-block bg-blue py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-50"
                >
                  Play
                </a>
              </div>
            </div>
            <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </header>

        {/* Top puzzle */}
        <div className="slice--top w-full h-screen min-h-[54rem] flex items-center radial-bg relative z-0">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Image src="/logo.svg" width={150} height={94} alt="IK logo" />
            </div>
            <p className="mt-6 text-base text-center text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              <p>This is an Infinity Keys hunt.</p>
              <p>You find the clues you and enter the key.</p>
              <p>Hunt for clues anywhere, like embedded in this page</p>
              <p>(find the underlined letters!)</p>
            </p>
            <Puzzle count={count} puzzleUri="landing" />
          </div>
          <div className="absolute top-0 inset-x-0 h-40 pointer-events-none bg-gradient-to-b from-black opacity-40"></div>
          {/* <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none bg-gradient-to-t from-blue-800"></div> */}
        </div>
        {/* Bottom of puzzle */}

        {/* About */}
        <main>
          <div className="pt-10 bg-blue-800 sm:pt-16 lg:pt-12 lg:pb-20 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-center text-white sm:mt-5 sm:text-6xl lg:mt-20 xl:text-6xl">
                      <span className="block">What is</span>
                      <span className="block text-turquoise">
                        Infinity Keys?
                      </span>
                    </h1>
                    <p className="mt-6 text-base text-center text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Infinity Keys is a puzzle game that takes players on hunts
                      through our digital world. Players find clues, decipher
                      keys, and claim treasure. It’s also a platform where
                      anyone can build their own hunts, keys, and treasure to
                      create engaging experiences for others.
                    </p>
                    <p className="mt-6 text-base text-center text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Find out how it works below.
                    </p>
                    {/* <div className="mt-10 sm:mt-12">
                      <form
                        action="#"
                        className="sm:max-w-xl sm:mx-auto lg:mx-0"
                      >
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Email address
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                          Start your free 14-day trial, no credit card
                          necessary. By providing your email, you agree to our{" "}
                          <a href="#" className="font-medium text-white">
                            terms of service
                          </a>
                          .
                        </p>
                      </form>
                    </div> */}
                  </div>
                </div>
                {/* <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">

                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* More main page content here... */}
        </main>

        {/* How it works */}

        <div className="relative pt-32 pb-32">
          <Image
            src="/blue-angles.jpeg"
            layout="fill"
            objectFit="cover"
            alt="Blue geoddesic background"
          />

          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24 relative">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    IK Treasure Hunts
                  </h2>
                  <p className="mt-4 text-lg text-gray-100">
                    1. Find clues across the web. 2. Decipher clues. 3. Enter
                    keys on the Infinity Keys App. 4. Claim digital treasure. 5.
                    Build your own.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-32 pb-32">
          {/* <Image
            src="/rainbow.jpeg"
            layout="fill"
            objectFit="cover"
            alt="Blue geoddesic background"
          /> */}
          <div className="flex self-start space-x-6">
            <MaterialLock />
          </div>
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24 relative">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    Build an Infinity Keys Hunt for your Project
                  </h2>
                  <p className="mt-4 text-lg text-gray-100">
                    Infinity Keys is a platform to build puzzles, hunts, and
                    treasure. If you’d like to use these tools to increase
                    engagement with your community, users, players, or fans,
                    please reach out. We are currently selecting projects to
                    work with on initial partner hunts, so please reach out for
                    business inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contactx*/}
        <div>
          <div className="pt-10 bg-blue-800 sm:pt-16 lg:pt-12 lg:pb-20 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    {/* <div className="text-center">
                      <Image
                        src="/logo.svg"
                        width={150}
                        height={94}
                        alt="IK logo"
                      />
                    </div> */}

                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-center text-white sm:mt-5 sm:text-6xl lg:mt-20 xl:text-6xl">
                      <span className="block"> Contact</span>
                      {/* <span className="block text-turquoise">everywhere.</span> */}
                    </h1>
                    <p className="mt-6 text-base text-center text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      If you are a brand interested in integrating an Infinity
                      Keys puzzle please contact us here
                    </p>

                    <div className="mt-10 sm:mt-12 flex justify-center">
                      <form
                        action="#"
                        className="sm:max-w-xl sm:mx-auto lg:mx-0"
                      >
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Email address
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">

                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                      alt=""
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <TwitterIcon />
          <Discord />
        </div>

        {/* Footer */}
        <footer className="">
          <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 bg-blue">
            <nav
              className="-mx-5 -my-2 flex flex-wrap justify-center"
              aria-label="Footer"
            >
              {navigationFooter.main.map((item) => (
                <div key={item.name} className="px-5 py-2">
                  <a
                    href={item.href}
                    className="text-base text-white hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
            <div className="mt-8 flex justify-center space-x-6">
              {navigationFooter.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-center text-base text-gray-500">
              &copy; 2022 Infinity Keys. All rights reserved.
            </p>
          </div>
        </footer>

        {/* End scanlines wrapper */}
      </div>
    </Wrapper>
  );
};

export default Landing;

export async function getStaticProps(): Promise<{ props: PageProps }> {
  return {
    props: {
      count: 5, // @TODO: change this when ready
    },
  };
}
