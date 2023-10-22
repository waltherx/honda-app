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
import { createMotoFn } from '@/services/motoApi';

type Props = {
    onClose?: () => void;
};

const CreateMotoModal = ({ onClose }: Props) => {
    const [error, setError] = useState('');

    const schema = z.object({
        modelo: z.string().min(1),
        placa: z.string().min(1),
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
    });

    const onSubmit = handleSubmit(async (data) => {

        console.log(data);
        /* const response = await createMotoFn(name, ingredients, {
             small: +smallPrice,
             medium: +mediumPrice,
             large: +largePrice,
         });
 
         if (response?.status === 'success') {
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
            <Title title="Registrar moto" description="Registar una nueva moto." />
            <form onSubmit={onSubmit}>
                <div className="mt-4">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Modelo" {...register('modelo')} />
                            {errors.modelo?.message && <Error>{errors.modelo.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Placa" {...register('placa')} />
                            {errors.placa?.message && <Error>{errors.placa.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Fecha compra" type='date' {...register('fecha_compra')} />
                            {errors.fecha_compra?.message && <Error>{errors.fecha_compra.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Precio compra" type='number' {...register('precio_compra')} />
                            {errors.precio_compra?.message && <Error>{errors.precio_compra.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Cliente id" {...register('client_id')} />
                            {errors.client_id?.message && <Error>{errors.client_id.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between">
                        <Button variant="white" type="button" onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary">Guardar</Button>
                    </div>
                    <div className={twMerge('text-right', !error && 'hidden')}>
                        <Error>{error}</Error>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CreateMotoModal;