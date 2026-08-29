/* Hand-drawn stroke icon set — consistent 24px grid, 1.8px round strokes. */

function Svg({ filled = false, children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PawIcon(props) {
  return (
    <Svg filled {...props}>
      <ellipse cx="6.9" cy="9.4" rx="1.85" ry="2.45" />
      <ellipse cx="12" cy="7.7" rx="1.9" ry="2.6" />
      <ellipse cx="17.1" cy="9.4" rx="1.85" ry="2.45" />
      <ellipse cx="20" cy="14" rx="1.65" ry="2.15" />
      <ellipse cx="4" cy="14" rx="1.65" ry="2.15" />
      <path d="M12 11.4c-2.7 0-5.5 2.3-5.5 5 0 1.7 1.3 2.9 3 2.9.9 0 1.7-.35 2.5-.35s1.6.35 2.5.35c1.7 0 3-1.2 3-2.9 0-2.7-2.8-5-5.5-5Z" />
    </Svg>
  );
}

export function HeartIcon({ filled = false, ...props }) {
  return (
    <Svg filled={filled} {...props}>
      <path d="M12 20.2 5.5 13.7a4.55 4.55 0 0 1 0-6.45 4.55 4.55 0 0 1 6.45 0l.05.05.05-.05a4.55 4.55 0 0 1 6.45 0 4.55 4.55 0 0 1 0 6.45L12 20.2Z" />
    </Svg>
  );
}

export function StarIcon(props) {
  return (
    <Svg filled {...props}>
      <path d="m12 3.4 2.6 5.2 5.7.85-4.15 4.05 1 5.7L12 16.5l-5.15 2.7 1-5.7-4.15-4.05 5.7-.85L12 3.4Z" />
    </Svg>
  );
}

export function SparkleIcon(props) {
  return (
    <Svg filled {...props}>
      <path d="M12 2.8 13.9 9l6.2 1.9-6.2 1.9L12 19l-1.9-6.2L3.9 10.9 10.1 9 12 2.8Z" />
      <path d="M19 15.6l.9 2.9 2.9.9-2.9.9-.9 2.9-.9-2.9-2.9-.9 2.9-.9.9-2.9Z" opacity=".55" />
    </Svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </Svg>
  );
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.4 4.4L19 7.2" />
    </Svg>
  );
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 6.5l11 11" />
      <path d="M17.5 6.5l-11 11" />
    </Svg>
  );
}

export function MenuIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 7.5h16" />
      <path d="M4 12h16" />
      <path d="M4 16.5h10" />
    </Svg>
  );
}

export function QuoteIcon(props) {
  return (
    <Svg filled {...props}>
      <path d="M9.6 6.2C6.7 7.8 5.1 10 5.1 13c0 .4 0 .8.1 1.1.3 1.8 1.7 3.1 3.4 3.1 1.8 0 3.1-1.3 3.1-3.1 0-1.7-1.2-2.9-2.9-3-.1-1 .5-2.1 1.9-3.3l-1.1-1.6Zm8.2 0c-2.9 1.6-4.5 3.8-4.5 6.8 0 .4 0 .8.1 1.1.3 1.8 1.7 3.1 3.4 3.1 1.8 0 3.1-1.3 3.1-3.1 0-1.7-1.2-2.9-2.9-3-.1-1 .5-2.1 1.9-3.3l-1.1-1.6Z" />
    </Svg>
  );
}

export function CroissantIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4.5c4.3 0 7.8 3.5 7.8 8 0 1.4-.25 2.7-.75 3.9-.3.75-1.15 1.15-1.9.9l-2.55-.75a11.4 11.4 0 0 0-5.2 0l-2.55.75c-.75.25-1.6-.15-1.9-.9-.5-1.2-.75-2.5-.75-3.9 0-4.5 3.5-8 7.8-8Z" />
      <path d="M8.7 8.7 7.3 14.6" />
      <path d="M12 7.6v7.2" />
      <path d="m15.3 8.7 1.4 5.9" />
    </Svg>
  );
}

export function CoffeeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 9h11.5v5.2a5 5 0 0 1-5 5H9.5a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10h1.6a2.6 2.6 0 0 1 0 5.2H16" />
      <path d="M8.3 3.4c0 .9-.9.9-.9 1.8" />
      <path d="M12 3.4c0 .9-.9.9-.9 1.8" />
    </Svg>
  );
}

export function MapPinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s-6.6-5.4-6.6-10.2a6.6 6.6 0 0 1 13.2 0C18.6 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.6" r="2.4" />
    </Svg>
  );
}

export function PhoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7.2 3.8 9 3.2c.6-.2 1.2.1 1.5.6l1.2 2.3c.25.5.15 1.1-.25 1.5l-1.3 1.3a12.6 12.6 0 0 0 4.8 4.8l1.3-1.3c.4-.4 1-.5 1.5-.25l2.3 1.2c.5.3.8.9.6 1.5l-.6 1.8c-.25.7-.9 1.2-1.65 1.15C11.4 17.5 6.5 12.6 6 5.5c-.05-.75.45-1.45 1.2-1.7Z" />
    </Svg>
  );
}

export function MailIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </Svg>
  );
}

export function ClockIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5V12l3 1.8" />
    </Svg>
  );
}

export function InstagramIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.9" cy="7.1" r="0.5" fill="currentColor" strokeWidth="1.4" />
    </Svg>
  );
}

export function FacebookIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14.8 4.5h-1.9a3.2 3.2 0 0 0-3.2 3.2v2.1H7.5v3h2.2v7.7h3.1v-7.7h2.3l.5-3h-2.8V7.9c0-.5.4-.9.9-.9h1.9v-2.5Z" />
    </Svg>
  );
}

export function XSocialIcon(props) {
  return (
    <Svg filled {...props}>
      <path d="M4.5 4.5h3.9l4 5.4 4.6-5.4h2.5l-5.9 6.9 6.4 8.1h-3.9l-4.3-5.8-5 5.8H4.3l6.3-7.3L4.5 4.5Zm2.2 1.5 9.4 12h1.2L7.9 6H6.7Z" />
    </Svg>
  );
}
