"use client"
import { SimpleLoading } from "@/components/SimpleLoading";
import { toStr } from "@/libs/format";
import { getUserInfo } from "@/libs/localStorage";
import { perfilFn } from "@/services/authApi";
import { MotoData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page() {

    const [perfil, setPerfil] = useState<UserData>();

    useEffect(() => {
        setPerfil(getUserInfo());
    }, []);

    const val = perfil?.id;

    const {
        isLoading,
        error,
        data: userPerfil } = useQuery<UserData, Error>({ queryKey: ['perfil', val], queryFn: () => perfilFn(val ? val.toString() : "") });



    if (error) return <div>error al cargar datos..☠️</div>
    if (isLoading) return <SimpleLoading />

    return (
        <>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href='/'>Inicio</Link></li>
                    <li>Perfil</li>
                </ul>
            </div>
            <div className="card">
                <div className="card-body">
                    {perfil && userPerfil ?
                        <div className="bg-base-200 overflow-hidden shadow rounded-lg border">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium ">
                                    Datos de usuario
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Informacion del usuario.
                                </p>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Nombre
                                        </dt>
                                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                            {userPerfil?.realname}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Correo
                                        </dt>
                                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                            {userPerfil?.email}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Numero
                                        </dt>
                                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                            {userPerfil.phone}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500 ">
                                            fecha de registro
                                        </dt>
                                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                            {toStr(userPerfil.created_at + "")}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        : <SimpleLoading />
                    }
                </div>
            </div>
        </>
    );
}

