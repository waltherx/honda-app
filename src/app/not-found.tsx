"use client"
import NotFoundAnimate from "@/components/NotFoundAnimate";
import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: '404 Not Found',
};

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className="w-full p-4">
        <div className="card w-full bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Upps!</h2>
            <figure className="w-60 h-60">
              <NotFoundAnimate loop />
            </figure>
            <p>
              <em>
                No se encontro..
              </em>
            </p>
            <div className="card-actions justify-end">
              <Link href="/" onClick={router.refresh}>
                <button className="btn btn-primary">Volver Inicio 🏠</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
