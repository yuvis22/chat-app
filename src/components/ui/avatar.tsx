import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  className?: string;
}

export function Avatar({ src, alt, fallback, className = "" }: AvatarProps) {
  return (
    <div
      className={`relative inline-block w-10 h-10 rounded-full overflow-hidden bg-gray-200 ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        fallback || <AvatarFallback />
      )}
    </div>
  );
}

export function AvatarImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

export function AvatarFallback({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center justify-center w-full h-full text-gray-500 ${className}`}
    >
      {children || (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}
    </span>
  );
}
