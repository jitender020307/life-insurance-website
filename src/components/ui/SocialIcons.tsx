'use client';

import { FacebookIcon as FacebookOutline, TwitterIcon as TwitterOutline, LinkedInIcon as LinkedInOutline, InstagramIcon as InstagramOutline } from '@heroicons/react/24/outline';

export function FacebookIcon({ className = 'h-5 w-5', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
  );
}

export function TwitterIcon({ className = 'h-5 w-5', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

export function LinkedInIcon({ className = 'h-5 w-5', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  );
}

export function InstagramIcon({ className = 'h-5 w-5', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.306.464a25.179 25.179 0 012.561 1.183 25.27 25.27 0 013.07 2.562c.413.868.583 1.595.465 2.306a28.284 28.284 0 01.06 3.807c0 1.025-.013 1.378-.06 3.808-.048 1.018-.216 1.745-.465 2.306a25.04 25.04 0 01-1.182 2.56 25.214 25.214 0 01-2.56 3.07c-.869.412-1.596.583-2.306.465a28.187 28.187 0 01-3.807.06c-1.024 0-1.377.013-3.807-.06a25.054 25.054 0 01-2.56-1.182 25.214 25.214 0 01-3.07-2.56c-.413-.868-.582-1.595-.464-2.306a28.286 28.286 0 01-.06-3.807c0-1.024.013-1.378.06-3.808.049 1.018-.216 1.745-.465 2.306a25.18 25.18 0 011.183-2.56 25.214 25.214 0 012.56-3.07c.869-.413 1.596-.583 2.306-.465a28.19 28.19 0 013.808-.06zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.801a3.334 3.334 0 110 6.668 3.334 3.334 0 010-6.668zm5.338-3.206a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}