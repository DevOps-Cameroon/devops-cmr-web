import { Link } from 'react-router-dom'
import { nav, socials, site } from '../data/community'
import Container from './ui/container'
import { Mail, MoveRight } from 'lucide-react'

const socialGlyphs = {
  GitHub: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
      />
    </svg>
  ),
  Slack: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8"
      fill="currentColor"
    >
      <path d="M7.36 14.11C7.36 14.4423 7.26147 14.7671 7.07687 15.0434C6.89227 15.3196 6.62989 15.535 6.32291 15.6621C6.01593 15.7893 5.67814 15.8225 5.35225 15.7577C5.02636 15.6929 4.72701 15.5329 4.49206 15.2979C4.25711 15.063 4.0971 14.7636 4.03228 14.4378C3.96746 14.1119 4.00073 13.7741 4.12788 13.4671C4.25504 13.1601 4.47037 12.8977 4.74664 12.7131C5.02292 12.5285 5.34773 12.43 5.68 12.43H7.36V14.11ZM8.21 14.11C8.21 13.6644 8.387 13.2371 8.70206 12.9221C9.01712 12.607 9.44444 12.43 9.89 12.43C10.3356 12.43 10.7629 12.607 11.0779 12.9221C11.393 13.2371 11.57 13.6644 11.57 14.11V18.32C11.57 18.7656 11.393 19.1929 11.0779 19.5079C10.7629 19.823 10.3356 20 9.89 20C9.44444 20 9.01712 19.823 8.70206 19.5079C8.387 19.1929 8.21 18.7656 8.21 18.32V14.11ZM9.89 7.36C9.55773 7.36 9.23292 7.26147 8.95664 7.07687C8.68037 6.89227 8.46504 6.62989 8.33788 6.32291C8.21073 6.01593 8.17746 5.67814 8.24228 5.35225C8.3071 5.02636 8.46711 4.72701 8.70206 4.49206C8.93701 4.25711 9.23636 4.0971 9.56225 4.03228C9.88814 3.96746 10.2259 4.00073 10.5329 4.12788C10.8399 4.25504 11.1023 4.47037 11.2869 4.74664C11.4715 5.02292 11.57 5.34773 11.57 5.68V7.36H9.89ZM9.89 8.21C10.3356 8.21 10.7629 8.387 11.0779 8.70206C11.393 9.01712 11.57 9.44444 11.57 9.89C11.57 10.3356 11.393 10.7629 11.0779 11.0779C10.7629 11.393 10.3356 11.57 9.89 11.57H5.68C5.23444 11.57 4.80712 11.393 4.49206 11.0779C4.177 10.7629 4 10.3356 4 9.89C4 9.44444 4.177 9.01712 4.49206 8.70206C4.80712 8.387 5.23444 8.21 5.68 8.21H9.89ZM16.64 9.89C16.64 9.55773 16.7385 9.23292 16.9231 8.95664C17.1077 8.68037 17.3701 8.46504 17.6771 8.33788C17.9841 8.21073 18.3219 8.17746 18.6478 8.24228C18.9736 8.3071 19.273 8.46711 19.5079 8.70206C19.7429 8.93701 19.9029 9.23636 19.9677 9.56225C20.0325 9.88814 19.9993 10.2259 19.8721 10.5329C19.745 10.8399 19.5296 11.1023 19.2534 11.2869C18.9771 11.4715 18.6523 11.57 18.32 11.57H16.64V9.89ZM15.79 9.89C15.79 10.3356 15.613 10.7629 15.2979 11.0779C14.9829 11.393 14.5556 11.57 14.11 11.57C13.6644 11.57 13.2371 11.393 12.9221 11.0779C12.607 10.7629 12.43 10.3356 12.43 9.89V5.68C12.43 5.23444 12.607 4.80712 12.9221 4.49206C13.2371 4.177 13.6644 4 14.11 4C14.5556 4 14.9829 4.177 15.2979 4.49206C15.613 4.80712 15.79 5.23444 15.79 5.68V9.89ZM14.11 16.64C14.4423 16.64 14.7671 16.7385 15.0434 16.9231C15.3196 17.1077 15.535 17.3701 15.6621 17.6771C15.7893 17.9841 15.8225 18.3219 15.7577 18.6478C15.6929 18.9736 15.5329 19.273 15.2979 19.5079C15.063 19.7429 14.7636 19.9029 14.4378 19.9677C14.1119 20.0325 13.7741 19.9993 13.4671 19.8721C13.1601 19.745 12.8977 19.5296 12.7131 19.2534C12.5285 18.9771 12.43 18.6523 12.43 18.32V16.64H14.11ZM14.11 15.79C13.6644 15.79 13.2371 15.613 12.9221 15.2979C12.607 14.9829 12.43 14.5556 12.43 14.11C12.43 13.6644 12.607 13.2371 12.9221 12.9221C13.2371 12.607 13.6644 12.43 14.11 12.43H18.32C18.7656 12.43 19.1929 12.607 19.5079 12.9221C19.823 13.2371 20 13.6644 20 14.11C20 14.5556 19.823 14.9829 19.5079 15.2979C19.1929 15.613 18.7656 15.79 18.32 15.79H14.11Z" fill="currentColor" />
    </svg>
  ),
  'X / Twitter': (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 271"
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
    </svg>
  ),
  YouTube: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 -3 20 20"
      aria-hidden="true"
      className="h-8 w-8"
      fill="currentColor"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-300.000000, -7442.000000)" fill="currentColor">
          <g transform="translate(56.000000, 160.000000)">
            <path d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289" fill="currentColor" />
          </g>
        </g>
      </g>
    </svg>
  ),
  Discord: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8"
      fill="currentColor"
    >
      <path d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z" fill="currentColor" />
    </svg>
  ),
  WhatsApp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8"
      fill="currentColor"
    >
      <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="currentColor" />
    </svg>
  ),
}

const footerColumns = [
  {
    title: 'Links',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Platform', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/join' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'Our Platform', href: '/services' },
      { label: 'Why DevOps Cameroon?', href: '/about' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Case Studies', href: '/projects' },
      { label: 'FAQ', href: '/about' },
    ],
  },
  {
    title: 'Socials',
    items: [
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'X (Formerly Twitter)', href: 'https://x.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] text-primary-100">
      <Container className="py-10 lg:py-14">
        <div className="space-y-10">

          <div className="grid gap-8 pt-8 lg:grid-cols-[1.2fr_1.8fr]">
            <div>
              <div className="text-3xl font-sans font-mono tracking-[-0.08em] text-primary-100">DEVOPS CAMEROON</div>
              <p className="mt-4 max-w-md text-base leading-7 text-primary-200/80">
                Blending deep tech with local context for shared prosperity across the Global South.
              </p>
            </div>

            <div className="lg:justify-self-end lg:pt-2">
              <p className="text-xs uppercase tracking-[0.28em] text-primary-200/80">Subscribe to our newsletter</p>

              <div className="mt-4 flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-[#171d27] p-2 pr-2 shadow-inner shadow-black/10">
                <div className="flex flex-1 items-center gap-3 px-3 text-primary-100">
                  <Mail />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="w-full bg-transparent text-sm text-primary-100 placeholder:text-primary-200/50 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex gap-2 px-2 h-10 items-center justify-center rounded-full bg-primary-400 text-sm font-medium text-ink cursor-pointer transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                  aria-label="Subscribe"
                >
                  Join Us
                  <MoveRight className="text-ink" />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4 md:gap-8">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center text-primary-200 transition-colors hover:text-primary-100"
                    aria-label={social.label}
                  >
                    {typeof socialGlyphs[social.label] === 'string' ? (
                      <span className="text-[20px] font-bold tracking-[0.12em]">{socialGlyphs[social.label]}</span>
                    ) : (
                      <span className="inline-flex items-center justify-center text-primary-200">{socialGlyphs[social.label]}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-10 grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-200/70">{column.title}</h3>
                <ul className="mt-5 space-y-3 text-sm text-primary-200/80">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith('http') ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary-100">
                          {item.label}
                        </a>
                      ) : (
                        <Link to={item.href} className="transition-colors hover:text-primary-100">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.25em] text-primary-200/70 sm:flex-row sm:items-center sm:justify-end">
            <span>© Copyright 2025 {site.name}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
