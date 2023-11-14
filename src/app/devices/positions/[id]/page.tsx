"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getDeviceFn } from "@/services/deviceApi";
import { DeviceData } from "@/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

const Mapa = dynamic(() => import("@/app/devices/positions/[id]/Positions"), {
  ssr: false,
});

const MapaLast = dynamic(() => import("@/components/MapLast"), {
  ssr: false,
});

const Page = ({ params }: { params: { id: string } }) => {
  const [deviceId, setDeviceId] = useState<string>(params.id);
  const [amount, setAmount] = useState<string>("5");
  const [lastPosition, setLastPosition] = useState<boolean>(true);

  const {
    isLoading: isLoadingDevice,
    error: errorDevice,
    data: dataDevice,
  } = useQuery<DeviceData, Error>({
    queryKey: ["device", deviceId],
    queryFn: () => getDeviceFn(deviceId + ""),
  });

  useEffect(() => {
    setAmount(amount);
  }, [amount]);

  if (isLoadingDevice) return <SimpleLoading />;
  if (errorDevice) return <div>error al cargar datos..☠️</div>;

  const checkHandler = () => {
    setLastPosition(!lastPosition);
  };

  const amountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setAmount(event.target.value);
  };

  const amountHandle = () => {
    console.log("perro");
  };

  return (
    <>
      {dataDevice ? (
        <div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              <li>
                <Link href="/devices">Dispositivos</Link>
              </li>
              <li>{dataDevice.serial}</li>
            </ul>
          </div>
          <div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body w-full">
                <div className="inline-flex">
                  <div className=" form-control w-32">
                    <label className="label cursor-pointer">
                      <span className="font-bold label-text text-xs">
                        Ultima ubicacion :
                      </span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={lastPosition}
                        onChange={checkHandler}
                      />
                    </label>
                  </div>
                  <div className=" inline-flex  w-auto ">
                    <label className="label cursor-pointer">
                      <span className="font-bold label-text text-xs">
                        Cantidad de ubicaciones : {amount}{" "}
                      </span>
                      <input
                        type="range"
                        min={5}
                        max={35}
                        step={5}
                        defaultValue={amount}
                        onChange={amountChange}
                        className="range range-primary range-xs"
                      />
                    </label>
                  </div>
                </div>
                <div className="relative w-full h-80">
                  <div className="absolute top-0 left-0 w-full h-full">
                    {lastPosition ? (
                      <MapaLast device_id={deviceId} />
                    ) : (
                      <Mapa
                        device_id={deviceId}
                        amount={amount}
                        changeAmount={amountHandle}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>
          <Skeleton />
          Cargando...😫
        </p>
      )}
    </>
  );
};

export default Page;
