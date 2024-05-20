export type MotoData = {
    id: string;
    marca: string;
    modelo: string;
    placa: string;
    litrokm: number;
    estado: string;
    descripcion: string;
    client_id: string;
    sucrusal_id:string;
    dispositivo?: DeviceData;
    created_at?: Date;
    updated_at?: Date;
};

export type MotoCreate = Omit<MotoData, "id">;

export type ClientData = {
    id: number;
    ci: string;
    fullname: string;
    address?: string;
    phone?: string;
    created_at?: Date;
    updated_at?: Date;
};

export type ClientCreate = {
    ci: string;
    fullname: string;
    address?: string;
    phone?: string;
};

export type DeviceData = {
    id: number;
    serial: string;
    chipgsm: string;
    megas: Date;
    estado: string;
    created_at: Date;
    update_at: Date;
}

export type DeviceCreate = Omit<DeviceData, "id">;

export type PositionData = {
    id: number;
    date: string;
    latitude: number;
    longitude: number;
    timestamp: number;
    speed: number;
    batt: number;
    dispositivo_id: number;
}

export type UserData = {
    id: number;
    username: string;
    realname: string;
    password: string;
    email?: string;
    phone?: string;
    status: number;
    token?: string;
    created_at?: string;
    update_at?: string;
    role_id: number;
}

export type AuthStatus = "authorized" | "unauthorized" | "pending";

export type UserCreate = Omit<UserData, "id" | "email" | "phone" | "token" | "created_at" | "update_at">;

export type LoginPayload = {
    username: string;
    password: string;
};

export type User = {
    id: number;
    username: string;
    role: number;
}

export type LoginResponse = {
    user: User;
    token: string;
}

export type SucrusalData = {
    id: string;
    nombre: string;
    direccion: string;
    latitude: number;
    longitude: number;
}

export type SucrusalCreate = Omit<SucrusalData, "id">;


export type AlarmaData = {
    id: string;
    nombre: string;
    devices: string;
    created_at: string;
    update_at: string;
    estado: string;
    typealarma_id: string;
}

export type AlarmaCreate = Omit<AlarmaData, "id">;

/*export type LoginResponse = {
    access_token: string;
    refresh_token: string;
};*/

export type RoleData = {
    id: number;
    name: string;
    role: number;
    sequence: string,
    memo: string,
    status: number,
}