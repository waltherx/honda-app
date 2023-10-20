import format from "date-fns/format";
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