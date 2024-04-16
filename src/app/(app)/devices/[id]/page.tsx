"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getDeviceFn } from "@/services";
import { DeviceData } from "@/types";
import { useQuery } from "react-query";
import Link from "next/link";
import QRCode from "react-qr-code";

const Page = ({ params }: { params: { id: string } }) => {
  const val = params.id;
  console.log(params.id);

  const {
    isLoading,
    isError,
    error,
    data: device,
  } = useQuery<DeviceData, Error>({
    queryKey: ["device", val],
    queryFn: () => getDeviceFn(+val),
  });

  if (isLoading) return <SimpleLoading />;
  if (isError) return <div>error al cargar datos..☠️</div>;

  return (
    <>
      {device ? (
        <div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              <li>
                <Link href="/devices">Dispositivos</Link>
              </li>
              <li>{device.id}</li>
            </ul>
          </div>
          <div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
              <figure>
                <QRCode
                  className="card bg-white p-4 flex items-center justify-center"
                  value={JSON.stringify(device)}
                  bgColor={"#FFFFFF"}
                  fgColor={"#CC0000"}
                  size={350}
                />
              </figure>
              <div className="card-body">
                <h1 className="card-title">Informacion de Dispositivo</h1>
                <p>
                  <b>Serial : </b> {device.serial}
                </p>
                {/*<p><b>Moto Id : </b>{device. ? device.moto_id : 'Disponible'}</ps>*/}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...😶‍🌫️</p>
      )}
    </>
  );
};

export default Page;
