'use client';

import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(({ ...props }, ref) => (
    <input
        className="input input-bordered w-full max-w-xs"
        ref={ref}
        {...props}
    />
));

Input.displayName = 'Input';
