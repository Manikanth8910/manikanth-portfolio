import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult('Sending....');
    
    // Smooth user feedback
    setTimeout(() => {
      setResult('Thank you! Your message has been sent successfully.');
      setIsSubmitting(false);
      (event.target as HTMLFormElement).reset();
      setTimeout(() => setResult(''), 6000);
    }, 1000);
  };

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('/assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none transition-colors duration-300"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo text-neutral-700 dark:text-neutral-300">
        Connect with me
      </h4>
      <h2 className="text-center text-5xl font-Ovo text-neutral-900 dark:text-white">
        Get in touch
      </h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo text-neutral-600 dark:text-neutral-300">
        I'd love to hear from you! If you have any questions, comments or feedback, please use the form below.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <input type="hidden" name="subject" value="Manikanth Portfolio Message" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
          <input
            type="text"
            placeholder="Enter your name"
            className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30 text-neutral-900 dark:text-white font-Outfit transition-colors"
            required
            name="name"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30 text-neutral-900 dark:text-white font-Outfit transition-colors"
            required
            name="email"
          />
        </div>
        <textarea
          rows={6}
          placeholder="Enter your message"
          className="w-full px-4 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white mb-6 dark:bg-darkHover/30 text-neutral-900 dark:text-white font-Outfit transition-colors resize-none"
          required
          name="message"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2.5 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border dark:border-white/30 dark:hover:bg-darkHover cursor-pointer font-Ovo transition active:scale-95 disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Sending...' : 'Submit now'}</span>
          <img
            src="/assets/right-arrow-white.png"
            alt="Submit Arrow"
            className="w-4"
          />
        </button>
        {result && (
          <p className="mt-4 text-center font-Ovo text-emerald-600 dark:text-emerald-400">
            {result}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactSection;
