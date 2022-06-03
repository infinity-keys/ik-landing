<header className="w-full static z-50 bg-blue">
  <nav
    className="container px-4 sm:px-6 lg:px-8 border-b border-indigo-500 lg:border-none"
    aria-label="Top"
  >
    <div className="w-full py-6 flex items-center justify-between ">
      {/* left */}
      <div className="flex items-center">
        <a href="https://www.infinitykeys.io/future/landing">
          <span className="sr-only">Infinity Keys</span>
          <Image src="/logo.svg" width={100} height={100} alt="IK logo" />
          {/* <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt=""
                /> */}
        </a>
      </div>
      {/* center */}
      <div className="hidden space-x-8 md:block lg:block">
        {navigation.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-2xl font-medium hover:text-turquoise"
          >
            {link.name}
          </a>
        ))}
      </div>
      <div className="flex items-center space-x-6 icons">
        <div className="twitterIcon">
          <TwitterIcon />
        </div>
        <div className="discordIcon">
          <Discord />
        </div>
      </div>

      {/* right */}
      <div className="ml-10 space-x-4">
        <a
          href="#"
          className="inline-block bg-blue hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-2xl font-medium text-white hover:text-blue"
        >
          Play
        </a>
      </div>
    </div>
    {/* <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div> */}
  </nav>
</header>;
