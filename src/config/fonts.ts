import { Poppins, Montserrat_Alternates } from "next/font/google";


export const poppins = Poppins({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
});


export const titleFont = Montserrat_Alternates({
    subsets: ['latin'],
    weight: ['500', '700']
});