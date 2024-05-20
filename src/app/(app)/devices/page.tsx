"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getAllDevicesFn } from "@/services";
import { DeviceData } from "@/types";
import { useQuery, useQueryClient } from "react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreateDeviceModal from "@/components/modals/CreateDeviceModal";
import UpadateDeviceModel from "@/components/modals/UpdateDeviceModal";
import { Button } from "@/components/Button";

export default function Page() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);
  const [isCreateDeviceModalShown, setIsCreateDeviceModalShown] =
    useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    //error,
    data: devices,
  } = useQuery<DeviceData[], Error>(["devices"], getAllDevicesFn);

  useEffect(() => {
    if (isCreateDeviceModalShown === false || selectedDevice === null) {
      queryClient.invalidateQueries("devices");
    }
  }, [isCreateDeviceModalShown, selectedDevice]);

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
        {isCreateDeviceModalShown && (
          <CreateDeviceModal
            onClose={() => setIsCreateDeviceModalShown(false)}
          />
        )}
        {selectedDevice && (
          <UpadateDeviceModel
            device={selectedDevice}
            onClose={() => setSelectedDevice(null)}
          />
        )}
        <div className="card-body">
          <div className="flex gap-x-8">
            <h2 className="card-title text-center">Lista de Dispositivos</h2>
            <Button
              variant="primary"
              onClick={() => setIsCreateDeviceModalShown(true)}
            >
              Crear
            </Button>
          </div>
          <div className="overflow-x-auto">
            {devices ? (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Serial</th>
                    <th>Chip</th>
                    <th>Ver</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((c: DeviceData) => (
                    <tr className="hover" key={c.id}>
                      <td className="px-6 py-4">
                        <Link href={`/devices/${c.id}`}>{c.id}</Link>
                      </td>
                      <td>{c.serial}</td>
                      <td>{c.chipgsm}</td>
                      <td>
                        <Link
                          className="btn btn-ghost btn-xs"
                          href={`/devices/${c.id}`}
                        >
                          Ver
                        </Link>
                        <Link
                          className="btn btn-ghost btn-xs"
                          href={`/devices/positions/${c.id}`}
                        >
                          Ver Mapa
                        </Link>
                        <Link
                          className="btn btn-ghost btn-xs"
                          href={`/devices/table/${c.id}`}
                        >
                          Ver Tabla
                        </Link>
                      </td>
                      <td>
                        <a
                          className="btn btn-ghost btn-xs"
                          onClick={() => setSelectedDevice(c)}
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Serial</th>
                    <th>Chip</th>
                    <th>Ver</th>
                    <th>Operaciones</th>
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
}
