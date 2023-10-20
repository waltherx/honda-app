export type MotoData = {
    id: number;
    marca: string;
    modelo: string;
    anio: number;
    placa: string;
    motor: string;
    color: string;
    peso: number;
    kilometraje: number;
    estado: string;
    fecha_compra: string;
    precio_compra: number;
    client_id: number;
    //positions: PositionData[];
};

export type MotoCreate = Omit<MotoData, "id">;

export type ClientData = {
    id: number;
    ci: number;
    fullname: string;
    address: string;
    phone: string;
    status: number;
};

export type ClientCreate = {
    ci: number;
    fullname: string;
    address: string;
    phone: string;
};

export type DeviceData = {
    id: number;
    serial: string;
    moto_id: number;
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

export type UserCreate = Omit<UserData, "id" | "email" | "phone" | "token" | "created_at" | "update_at">;

export type LoginPayload = {
    username: string;
    password: string;
};

type User = {
    id: number;
    username: string;
    role: number;
}

export type LoginResponse = {
    user: User;
    token: string;
}

/*export type LoginResponse = {
    access_token: string;
    refresh_token: string;
};*/