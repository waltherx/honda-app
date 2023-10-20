import { LoginModal } from '@/modals/LoginModal';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
};

export default async function Login() {

    return <LoginModal isDashboard={true} />;
}
