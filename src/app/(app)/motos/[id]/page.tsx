"use client"
import { SimpleLoading } from "@/components/SimpleLoading";
import { getMotoFn } from "@/services/motoApi";
import { MotoData } from "@/types";
import { useQuery } from "react-query";
import Link from "next/link";
import QRCode from 'react-qr-code';

const Page = ({ params, }: {
    params: { id: string };
}) => {
    const val = params.id;

    const {
        isLoading,
        isError,
        error,
        data: moto } = useQuery<MotoData, Error>({ queryKey: ['moto', val], queryFn: () => getMotoFn(val + "") });

    if (isLoading) return <SimpleLoading />;
    if (isError) return <div>error al cargar datos..☠️</div>;

    return (
        <>
            {moto ?
                <div>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><Link href='/'>Inicio</Link></li>
                            <li><Link href='/motos'>Motos</Link></li>
                            <li>{moto.id}</li>
                        </ul>
                    </div>
                    <div>
                        <div className="card lg:card-side bg-base-200 shadow-xl">
                            <div className="card-body">
                                <div className="grid place-items-center">
                                    <h1 className="card-title">Informacion de Moto</h1>
                                    <p><b>Placa : </b>{moto.placa}</p>
                                    <p><b>Serial : </b> {moto.marca}</p>
                                    <p><b>Serial : </b> {moto.modelo}</p>
                                    <p><b>Color : </b>{moto.color}</p>
                                    <p><b>Estado : </b>{moto.estado}</p>
                                    <p><b>Precio : </b>{moto.precio_compra}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <p>Cargando...😶‍🌫️</p>
            }
        </>
    );
};

export default Page;