'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';
import { Button } from '../components/Button';
import { Error } from '../components/Error';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Title } from '../components/Title';
import { Toast } from '../components/Toast';

import { useStore } from '@/store'
import { useMutation } from '@tanstack/react-query';
import { login } from '@/services/authApi';
import { getUserInfo, setAccessToken } from '@/libs/localStorage';

type Props = {
    isDashboard: boolean;
    onClose?: () => void;
};

export const LoginModal = ({ isDashboard, onClose }: Props) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const { setUser } = useStore();

    const schema = z.object({
        username: z.string().min(5),
        password: z.string().min(4),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation(login, {
        onSuccess: (data) => {
            console.log(data.token);
            setAccessToken(data.token);
            //setRefreshToken(data.refresh);
            localStorage.setItem("token", data.token);
            localStorage.setItem("User", JSON.stringify(getUserInfo()));
            setUser(getUserInfo() ?? null);
            reset();
            toast(<Toast text="Bienvenido" />);
        },
        onError: (data) => {
            console.log(data);
            toast(<Toast text="hay un error" />);
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        ///const { username, password } = data;
        console.log(data)
        try {
            mutation.mutate(data);

        } catch (error) {
            console.log(error);
            alert("User created failed");
            alert(error);
        }

        /*const response = await login(email, password, isDashboard ? 'admin' : 'user');

        if (response?.status === 'success') {
            const userResponse = await getUser();

            setUser(userResponse?.data?.user ?? null);

            if (isDashboard) {
                router.push('/dashboard');
            } else {
                if (onClose) {
                    onClose();
                }
            }

            toast(<Toast text={response.message} />);
        } else {
            setError(response.message);
        }*/
    });

    return (
        <Modal onClose={onClose} addBackground={!isDashboard}>
            <Title title="Inicia session" description="Ingresa tu cuenta." />
            <form onSubmit={onSubmit}>
                <div className="mt-4">
                    <div className="flex">
                        <div className="w-full">
                            <Input placeholder="Username" type="text" {...register('username')} />
                            {errors.username?.message && <Error>{errors.username.message}</Error>}
                        </div>
                        <div className="w-full ml-2">
                            <Input placeholder="Password" type="password" {...register('password')} />
                            {errors.password?.message && <Error>{errors.password.message}</Error>}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className={twMerge('flex', isDashboard ? 'justify-end' : 'justify-between')}>
                        <div className={twMerge(isDashboard && 'hidden')}>
                            <Button variant="white" type="button" onClick={onClose}>
                                Close
                            </Button>
                        </div>

                        <Button disabled={mutation.isLoading ? true : false} variant="primary">Login</Button>
                    </div>
                    <div className={twMerge('text-right', !error && 'hidden')}>
                        <Error>{error}</Error>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
