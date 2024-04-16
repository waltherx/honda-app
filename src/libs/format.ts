import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { format } from "date-fns/format";
import { getErrorMessage } from "./errorMessage";

export function toStr(value: string): string {
    try {
        const date = new Date(value);
        return format(date, 'dd LLL yyyy hh:mm:ss aaa');
    } catch (error) {
        console.log(getErrorMessage(error));
        return "";
    }
}

export function toMoney(value: number): string {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'BOB' }).format(value);
}


export function difDateNow(fecha: Date): string {
    const fechaNow = new Date();
    const horas = differenceInHours(fechaNow, fecha);
    const minutos = differenceInMinutes(fechaNow, fecha) % 60;
    const segundos = differenceInSeconds(fechaNow, fecha) % 60;

    return `${horas}:${minutos}:${segundos}`;
}
