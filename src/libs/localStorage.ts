import jwt_decode from 'jwt-decode';
import { UserData } from '../types';

export function setAccessToken(accessToken: string) {
    const decoded = jwt_decode(accessToken);
    console.log('decoded', decoded);
    localStorage.setItem('userInfo', JSON.stringify(decoded));
    localStorage.setItem('accessToken', accessToken);
}

export function setRefreshToken(accessToken: string) {
    localStorage.setItem('refreshToken', accessToken);
}

export function getRefreshToken(): string | undefined {
    const token = localStorage.getItem('refreshToken');
    return token == undefined ? undefined : token;
}

export function getAccessToken(): string | undefined {
    const token = localStorage.getItem('accessToken');
    return token == undefined ? undefined : token;
}

export function clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
}

export function getUserInfo(): UserData | undefined {
    const userInfoString = localStorage.getItem('userInfo');
    console.log(userInfoString);
    if (userInfoString !== null) {
        const user = JSON.parse(userInfoString) as UserData;
        return user;
    }
    return undefined;
}