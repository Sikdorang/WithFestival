import CancelIcon from '@/assets/icons/ic_cancel.svg?react';
import React from 'react';
import Spinner from '../exceptions/Spinner';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  maxLength?: number;
  limitHide?: boolean;
  isLoading?: boolean;
  error?: boolean;
  onClear?: () => void;
}

export default function TextInput({
  label = '제목',
  labelClassName = '',
  value = '',
  onChange,
  onClear,
  placeholder = '상세를 입력해주세요.',
  maxLength = 50,
  disabled = false,
  error = false,
  limitHide = false,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <div className="w-full">
      {label === '제목' ? undefined : (
        <div className="mb-2 flex items-center gap-2">
          <div className={`text-mh-1 block text-gray-800 ${labelClassName}`}>
            {label}
          </div>
        </div>
      )}

      <div
        className={`relative flex items-center rounded-2xl border bg-white px-6 py-4 transition-colors ${
          error
            ? 'border-system-error'
            : disabled
              ? 'border-gray-200 bg-gray-50'
              : value
                ? 'border-primary-500'
                : 'focus-within:border-primary-500 border-gray-200'
        }`}
      >
        {!isLoading ? (
          <>
            <input
              value={value}
              onChange={onChange}
              maxLength={maxLength}
              disabled={disabled}
              placeholder={placeholder}
              className={`text-mb-2 w-full border-none bg-transparent text-gray-800 outline-none placeholder:text-gray-300 ${disabled ? 'text-gray-300' : ''} `}
              {...rest}
            />
            {!disabled && value && (
              <button
                type="button"
                onClick={onClear}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 transition hover:bg-gray-100"
                aria-label="입력값 삭제"
              >
                <CancelIcon />
              </button>
            )}
          </>
        ) : (
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>

      {!limitHide ? (
        <div className="mt-2 flex justify-end">
          <span className="text-mc-1 rounded-xl bg-gray-100 px-2 py-1 text-gray-400 select-none">
            {(value as string).length}/{maxLength}
          </span>
        </div>
      ) : undefined}
    </div>
  );
}
