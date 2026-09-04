export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-2 sm:top-3.5 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none flex justify-center">
      <div className="w-full max-w-4xl mx-auto pointer-events-auto flex items-center justify-between glass-heavy rounded-full px-4 sm:px-6 py-3 sm:py-3.5 min-h-[52px] sm:min-h-[64px] gap-2 sm:gap-4">
        {/* Brand - Left */}
        <div className="flex-1 flex items-center justify-start">
          <div
            onClick={scrollToTop}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 cursor-pointer ml-[12px]"
            style={{ marginLeft: '12px' }}
          >
            <img
              alt="RiddleEdits"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover"
              src="/riddle-avatar.png"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-base text-secondary hidden sm:block">
              RiddleEdits
            </span>
          </div>
        </div>

        {/* Navigation Links - Center */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 flex-shrink-0">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('work');
            }}
            className="no-emoji group relative inline-flex items-center justify-center px-2.5 sm:px-3 py-1 sm:py-1 rounded-md text-[11px] sm:text-[13px] font-medium text-[#9AA8AD] no-underline transition-colors duration-200 hover:text-secondary"
          >
            <span
              className="absolute inset-0 rounded-md pointer-events-none opacity-0 scale-95 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.10)' }}
            />
            <span className="relative z-10 leading-none">Work</span>
          </a>
          <a
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('testimonials');
            }}
            className="no-emoji group relative inline-flex items-center justify-center px-2.5 sm:px-3 py-1 sm:py-1 rounded-md text-[11px] sm:text-[13px] font-medium text-[#9AA8AD] no-underline transition-colors duration-200 hover:text-secondary"
          >
            <span
              className="absolute inset-0 rounded-md pointer-events-none opacity-0 scale-95 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.10)' }}
            />
            <span className="relative z-10 leading-none">Testimonials</span>
          </a>
        </div>

        {/* Header CTA Button - Right */}
        <div className="flex-1 flex items-center justify-end">
          <div className="relative inline-flex items-center justify-center mr-[12px]" style={{ marginRight: '12px' }}>
            <a
              href="https://x.com/RiddlePlayZz"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center font-semibold uppercase tracking-wider
                text-white cursor-pointer select-none no-underline relative z-10
                btn-nav
                px-6 sm:px-8 py-2 sm:py-2.5 text-[11px] sm:text-[12px] rounded-full gap-2 sm:gap-2.5 whitespace-nowrap min-h-[36px] sm:min-h-[40px]
              "
              style={{ minWidth: '155px', paddingLeft: '22px', paddingRight: '22px' }}
              tabIndex={0}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <span className="relative z-10 leading-none">Let's cook now!</span>
              <svg
                className="relative z-10 flex-shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
