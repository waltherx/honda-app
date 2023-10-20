import { zodResolver } from '@hookform/resolvers/zod';
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
import { UserData } from '../types';


type Props = {
    user: UserData;
    onClose?: () => void;
};

export const AccountModal = ({ user, onClose }: Props) => {
    const [error, setError] = useState('');

    const schema = z.object({
        password: z.string().min(4),
        newPassword: z.string().min(4),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
    });


    const onSubmit = handleSubmit(async (data) => {
        const { password, newPassword } = data;

        /*const response = await changePassword(password, newPassword);

        if (response.status === 'success') {
            if (onClose) {
                onClose();
            }

            toast(<Toast text={response.message} />);
        } else {
            setError(response.message);
        }*/
    });

    const styles = ['flex-1', 'w-20 justify-center items-center flex', 'w-20 justify-center items-center flex'];

    const head = ['order', 'price', 'status'];



    return (
        <Modal onClose={onClose} addBackground={true}>

            <div className=''>
                <Title title="Account" description="Your account details." />
                <div className="mt-4">
                    <p className="text-textGray">E-mail: {user.email}</p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mt-2">
                        <div className="flex">
                            <div className="w-full">
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    role="textbox"
                                    {...register('password')}
                                />
                                {errors.password?.message && <Error>{errors.password.message}</Error>}
                            </div>
                            <div className="w-full ml-2">
                                <Input
                                    placeholder="New password"
                                    type="password"
                                    role="textbox"
                                    {...register('newPassword')}
                                />
                                {errors.newPassword?.message && <Error>{errors.newPassword.message}</Error>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-end">
                            <Button variant="primary">Change password</Button>
                        </div>
                        <div className={twMerge('text-right', !error && 'hidden')}>
                            <Error>{error}</Error>
                        </div>
                    </div>
                </form>

                <div className="mt-4">
                    <div className="flex justify-between">
                        <Button variant="white" type="button" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
