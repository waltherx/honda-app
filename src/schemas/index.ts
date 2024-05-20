import { z } from 'zod'

export const sucrusalSchema = z.object({
    id: z.string().min(1),
    nombre: z.string().min(1),
    direccion: z.string().min(1),
    latitude: z.number(),
    longitude: z.number(),
});

export const alarmaSchema = z.object({
    id: z.string().min(1),
    nombre: z.string().min(1),
    devices: z.string(),
    estado: z.string(),
    typealarma: z.string(),
});

export const deviceSchema = z.object({
    serial: z.string().min(10, "minimo 10 caracteres").max(100, "maximo 100 caracteres"),
    chipgsm: z.string().min(8, "minimo 8 caracteres").max(20, "maximo 20 caracteres"),
    estado: z.string().max(20, "maximo 20 caracteres"),
    megas_fin: z.date()
});

export const clientShema = z.object({
    ci: z
        .string()
        .min(8, "minimo 8 caracteres")
        .max(12, "maximo 12 caracteres"),
    fullname: z
        .string()
        .min(6, "minimo 6 caracteres")
        .max(250, "maximo 250 caracteres"),
    address: z.string().max(250, "maximo 12 caracteres").optional(),
    phone: z.string().max(20).optional()
});

export const motoSchema = z.object({
    modelo: z
        .string()
        .min(5, "minimo 5 caracteres")
        .max(50, "maximo 50 caracteres"),
    marca: z.string(),
    placa: z
        .string()
        .min(7, "minimo 7 caracteres")
        .max(12, "maximo 12 caracteres"),
    descripcion: z.string().max(450),
    litrokm: z.number({ invalid_type_error: "Solo números" }).optional(),
    estado: z.string(),
    client_id: z.string().uuid(),
    sucrusal_id: z.string().uuid().optional(),
});