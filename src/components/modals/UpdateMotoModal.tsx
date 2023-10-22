import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';
import { Button } from '@/components/Button';
import { Error } from '@/components/Error';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Title } from '@/components/Title';
import { Toast } from '@/components/Toast';
import { updateMotoFn } from '@/services/motoApi';
import { MotoData } from '@/types';

type Props = {
    moto: MotoData;
    onClose?: () => void;
};

const UpadateMotoModel = ({ moto, onClose }: Props) => {
    const [error, setError] = useState('');

    const schema = z.object({
        marca: z.string().min(1),
        modelo: z.string().min(1),
        anio: z.number().min(1),
        placa: z.string().min(1),
        motor: z.string().min(1),
        color: z.string().min(1),
        peso: z.number().min(1),
        kilometraje: z.number().min(1),
        estado: z.string().min(1),
        fecha_compra: z.string().min(1),
        precio_compra: z.number().min(1),
        client_id: z.number().min(1),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            marca: moto.marca,
            modelo: moto.modelo,
            anio: moto.anio,
            placa: moto.placa,
            motor: moto.motor,
            color: moto.color,
            peso: moto.peso,
            kilometraje: moto.kilometraje,
            estado: moto.estado,
            fecha_compra: moto.fecha_compra,
            precio_compra: moto.precio_compra,
            client_id: moto.client_id,
        },
    });

    const onSubmit = handleSubmit(async ({ marca, modelo, anio, placa, motor, color, peso, kilometraje, estado, fecha_compra, precio_compra, client_id }) => {
        /*   const response = await updateMotoFn(pizza.id, name, ingredients, {
               small: +smallPrice,
               medium: +mediumPrice,
               large: +largePrice,
           });
   
           if (response.status === 'success') {
               if (onClose) {
                   onClose();
               }
   
               toast(<Toast text={response.message} />);
           } else {
               setError(response.message);
           }*/
    });

    return (
        <Modal onClose={onClose} addBackground={true}>
            <Title title="Editar." description="Editar moto." />
            <form onSubmit={onSubmit}>
                <div className="mt-4">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Placa" {...register('placa')} />
                            {errors.placa?.message && <Error>{errors.placa.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Marca" {...register('marca')} />
                            {errors.marca?.message && <Error>{errors.marca.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Modelo" {...register('modelo')} />
                            {errors.modelo?.message && <Error>{errors.modelo.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Año" {...register('anio')} />
                            {errors.anio?.message && <Error>{errors.anio.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Motor" {...register('motor')} />
                            {errors.motor?.message && <Error>{errors.motor.message}</Error>}
                        </div>
                    </div>
                </div>

                <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-sm">
                        <label className="font-semibold text-gray-600 py-2">Color</label>
                        <Input placeholder="Color" {...register('color')} />
                        {errors.color?.message && <Error>{errors.color.message}</Error>}
                    </div>
                    <div className="mb-3 space-y-2 w-full text-sm">
                        <label className="font-semibold text-gray-600 py-2">Peso</label>
                        <Input placeholder="peso" {...register('peso')} />
                        {errors.peso?.message && <Error>{errors.peso.message}</Error>}
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between">
                        <Button variant="white" type="button" onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary">Actualizar</Button>
                    </div>
                    <div className={twMerge('text-right', !error && 'hidden')}>
                        <Error>{error}</Error>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
export default UpadateMotoModel;