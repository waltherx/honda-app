

export default async function VianLayout({ children }: {
    children: React.ReactNode;
}) {

    return (

        <main className="flex flex-col min-h-screen pt-36 sm:pt-52">
            {children}
        </main>
    );
}