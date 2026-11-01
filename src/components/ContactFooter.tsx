import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactFooterProps {
  onOpenTerminal?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = () => {
  return (
    <footer className="mt-20 pb-8">
      <div className="text-center space-y-2">
        <div className="text-4xl font-Ovo dark:text-white">
          Manikanth
        </div>
        <div className="w-max flex items-center gap-2 mx-auto text-neutral-700 dark:text-neutral-300">
          <img
            alt="Email Icon"
            className="w-5 dark:hidden"
            src="/assets/mail_icon.png"
          />
          <img
            alt="Email Icon"
            className="w-5 hidden dark:block"
            src="/assets/mail_icon_dark.png"
          />
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:underline"
          >
            {PERSONAL_INFO.email}
          </a>
        </div>
      </div>

      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 dark:border-neutral-700 mx-[10%] mt-12 py-4 text-sm text-neutral-600 dark:text-neutral-400">
        <p>© 2026 Manikanth Panuganti. All rights reserved.</p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          <li>
            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition"
            >
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default ContactFooter;
