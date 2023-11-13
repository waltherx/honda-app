"use client"
import { SimpleLoading } from "@/components/SimpleLoading";
import { getAllDevicesFn } from "@/services/deviceApi";
import { DeviceData } from "@/types";
import { useQuery } from "react-query";
import Link from "next/link";

export default function Page() {
  const {
    isLoading,
    isError,
    //error,
    data: devices,
  } = useQuery<DeviceData[], Error>(["devices"], getAllDevicesFn);


  if (isError) return <div>error al cargar datos..☠️</div>
  if (isLoading) return <SimpleLoading />
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link href='/'>Inicio</Link></li>
          <li>Dispositivos</li>
        </ul>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-center">Lista de Dispositivos</h2>
          <div className="overflow-x-auto">
            {devices ?
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Serial</th>
                    <th>MotoID</th>
                    <th>Ver</th>
                    <th>Ubicaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((c: DeviceData) => (
                    <tr className="hover" key={c.id}>
                      <td className="px-6 py-4">
                        <Link href={`/devices/${c.id}`}>{c.id}</Link>
                      </td>
                      <td>{c.serial}</td>
                      <td>{c.moto_id ? c.moto_id : <div className="badge badge-primary">Sin asignar</div>}</td>
                      <td><Link className="btn btn-ghost btn-xs" href={`/devices/${c.id}`}>Ver</Link></td>
                      <td><Link className="btn btn-ghost btn-xs" href={`/devices/positions/${c.id}`}>Ubicaciones</Link></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Serial</th>
                    <th>MotoID</th>
                    <th>Ver</th>
                    <th>Ubicaciones</th>
                  </tr>
                </tfoot>
              </table>
              : <p>Cargando...😶‍🌫️</p>
            }
          </div>
        </div>
      </div>
    </>
  );

}
