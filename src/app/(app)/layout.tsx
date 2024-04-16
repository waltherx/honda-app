import LeftMenu from '@/components/LeftMenu';
import { NavBar } from '@/components/NavBar';
import { getYear } from 'date-fns';

export default function VianLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main >
            <div className="flex flex-col h-screen justify-between">

                <NavBar />

                <div className="mb-auto px-4">
                    <div className="flex flex-col">
                        <div className="devider py-2" />

                        <div className="gird">

                            {children}
                        </div>
                    </div>
                </div>
                <footer className="footer footer-center p-4 bg-base-100 text-base-content">
                    <div>
                        <p>Copyright © {getYear(new Date())} - JWP</p>
                    </div>
                </footer>

            </div>
        </main>

    )
}
