import React from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition text-white bg-gradient-to-br from-teal-300 to-sky-500 hover:brightness-110 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
