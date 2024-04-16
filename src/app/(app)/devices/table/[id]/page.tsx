"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { toStr } from "@/libs/format";
import { getPositionDeviceAllFn } from "@/services";
import { PositionData } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";

const Page = ({ params }: { params: { id: string } }) => {
  const [deviceId, setDeviceId] = useState<string>(params.id);
  const {
    isLoading,
    isError,
    //error,
    data: positions,
  } = useQuery<PositionData[], Error>({
    queryKey: ["positiondeviceid", deviceId],
    queryFn: () => getPositionDeviceAllFn(deviceId + ""),
  });

  if (isError) return <div>error al cargar datos..☠️</div>;
  if (isLoading) return <SimpleLoading />;
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>Dispositivos</li>
        </ul>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-center">Lista de Dispositivos</h2>

          <div className="overflow-x-auto">
            {positions ? (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Longitud</th>
                    <th>Latitud</th>
                    <th>Velocidad</th>
                    <th>Bateria</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((c: PositionData) => (
                    <tr className="hover" key={c.id}>
                      <td className="px-6 py-4">{c.id}</td>
                      <td>{c.latitude}</td>
                      <td>{c.longitude}</td>
                      <td>{c.speed}</td>
                      <td>{c.batt}</td>
                      <td>{toStr(c.date)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Longitud</th>
                    <th>Latitud</th>
                    <th>Velocidad</th>
                    <th>Bateria</th>
                    <th>Fecha</th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p>Cargando...😶‍🌫️</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
