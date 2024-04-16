'use client';

import { poppins } from '@/config/fonts';
import { twMerge } from 'tailwind-merge';

type Props = {
    text: string;
};

export const Toast = ({ text }: Props) => (
    <p className={twMerge('text-black font-medium', poppins.className)}>{text}</p>
);
