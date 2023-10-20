'use client';

import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(({ ...props }, ref) => (
    <input
        className="input w-full p-2 text-black rounded outline-0 placeholder:text-textGray"
        ref={ref}
        {...props}
    />
));

Input.displayName = 'Input';
