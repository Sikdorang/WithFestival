'use client';

import React from 'react';
import Spinner from '../exceptions/Spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'green' | 'gray' | 'red' | 'white' | 'black';
  width?: 'full' | 'fit';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '_3xl' | 'full';
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function CtaButton({
  text = '버튼',
  isLoading = false,
  size = 'medium',
  className = '',
  color = 'green',
  width = 'full',
  radius = 'lg',
  disabled,
  onClick,
  left,
  right,
  ...props
}: Props) {
  const sizeStyles = {
    small: 'px-4 py-2 gap-2',
    medium: 'px-6 py-4 gap-3',
    large: 'px-8 py-5 gap-4',
  };

  const textSizeStyles = {
    small: 'text-mb-6',
    medium: 'text-mb-6',
    large: 'text-mb-3',
  };

  const textColorStyles = {
    green: 'text-black',
    gray: 'text-gray-700',
    red: 'text-white',
    white: 'text-gray-700',
    black: 'text-white',
  };

  const backgroundColorStyles = {
    green: 'bg-primary-400',
    gray: 'bg-gray-100',
    red: 'bg-red-500',
    white: 'bg-white',
    black: 'bg-gray-800',
  };

  const hoverColorStyles = {
    green: 'hover:bg-primary-300',
    gray: 'hover:bg-gray-200',
    red: 'hover:bg-red-400',
    white: 'hover:bg-gray-100',
    black: 'hover:bg-gray-600',
  };

  const borderColorStyles = {
    green: 'border-primary-400',
    gray: 'border-gray-100',
    red: 'border-none',
    white: 'border-gray-200',
    black: 'border-gray-800',
  };

  const radiusStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    _3xl: 'rounded-3xl',
    full: 'rounded-full',
  };

  const flexStyle =
    width === 'fit'
      ? 'inline-flex items-center justify-center'
      : 'flex w-full items-center justify-center';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    onClick?.(e);
  };

  return (
    <button
      className={`${backgroundColorStyles[color]} ${borderColorStyles[color]} ${hoverColorStyles[color]} ${radiusStyles[radius]} ${flexStyle} border transition-colors duration-200 disabled:cursor-not-allowed ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <Spinner className="border-white" />
      ) : (
        <>
          {left && <span className="mr-2 flex items-center">{left}</span>}
          <span className={`${textSizeStyles[size]} ${textColorStyles[color]}`}>
            {text}
          </span>

          {right && <span className="ml-2 flex items-center">{right}</span>}
        </>
      )}
    </button>
  );
}
