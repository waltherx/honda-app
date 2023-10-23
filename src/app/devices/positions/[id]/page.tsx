"use client"
import { SimpleLoading } from "@/components/SimpleLoading";
import { getDeviceFn } from "@/services/deviceApi";
import { DeviceData, PositionData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
//import Positio
import dynamic from 'next/dynamic';

const Mapa = dynamic(() => import('@/app/devices/positions/[id]/Positions'), {
    ssr: false,
});

const MapaLast = dynamic(() => import('@/components/MapLast'), {
    ssr: false,
});

const Page = ({ params, }: {
    params: { id: string };
}) => {
    const [deviceId, setDeviceId] = useState<string>(params.id);
    const [lastPosition, setLastPosition] = useState<boolean>(true);

    const {
        isLoading: isLoadingDevice,
        //isError,
        error: errorDevice,
        data: dataDevice } = useQuery<DeviceData, Error>({ queryKey: ['device', deviceId], queryFn: () => getDeviceFn(deviceId + "") });

    if (isLoadingDevice) return <SimpleLoading />;
    if (errorDevice) return <div>error al cargar datos..☠️</div>;

    const checkHandler = () => {
        setLastPosition(!lastPosition)
    }

    return (
        <>
            {dataDevice ?
                <div>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><Link href='/'>Inicio</Link></li>
                            <li><Link href='/devices'>Dispositivos</Link></li>
                            <li>{dataDevice.serial}</li>
                        </ul>
                    </div>
                    <div>

                        <div className="card lg:card-side bg-base-200 shadow-xl">

                            <div className="card-body w-full">
                                <div className="form-control max-w-max ">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Ultima ubicacion :</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={lastPosition}
                                            onChange={checkHandler}
                                        />
                                    </label>
                                </div>
                                {lastPosition ?
                                    <MapaLast device_id={deviceId} />
                                    : <Mapa device_id={deviceId} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : <p><Skeleton />Cargando...😶‍🌫️</p>
            }
        </>
    );
};

export default Page;