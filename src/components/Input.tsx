'use client';

import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(({ ...props }, ref) => (
    <input
        className="input input-bordered w-full p-2 rounded outline-0 placeholder:text-textGray"
        ref={ref}
        {...props}
    />
));

Input.displayName = 'Input';
