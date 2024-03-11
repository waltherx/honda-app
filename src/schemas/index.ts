import * as z from 'zod'

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