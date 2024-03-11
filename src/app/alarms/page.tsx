"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { AlarmaData, AlarmaCreate } from "@/types";
import Link from "next/link";
import { getAllAlarmasFn } from "../../services/alarmaApi";
import { useQuery } from "react-query";
import {} from "@/components/Button";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import CreateAlarmaModal from "@/components/modals/CreateAlarmaModal";
import UpdateAlarmaModal from "@/components/modals/UpdateAlarmaModal";

export default function Page() {
  const [selectedAlarma, setSelectedAlarma] = useState<AlarmaData | null>(null);
  const [isCreateAlarmaModalShown, setIsCreateAlarmaModalShown] =
    useState(false);
  const {
    data: alarmas,
    isLoading,
    error,
  } = useQuery<AlarmaData[]>({
    queryKey: ["sucrusals"],
    queryFn: getAllAlarmasFn,
  });

  useEffect(() => {
    if (isCreateAlarmaModalShown === false || selectedAlarma === null) {
      //fetchPizzas();
    }
  }, [isCreateAlarmaModalShown, selectedAlarma]);

  if (error) return <div>error al cargar datos..☠️</div>;
  if (isLoading) return <SimpleLoading />;

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>Alarmas</li>
        </ul>
      </div>
      <div className="card bg-base-200 shadow-xl">
        {isCreateAlarmaModalShown && (
          <CreateAlarmaModal
            onClose={() => setIsCreateAlarmaModalShown(false)}
          />
        )}
        {selectedAlarma && (
          <UpdateAlarmaModal
            alarma={selectedAlarma}
            onClose={() => setSelectedAlarma(null)}
          />
        )}
        <div className="card-body">
          <div className="flex gap-x-8">
            <h2 className="card-title text-center">Lista de Alarmas</h2>
            <Button
              variant="primary"
              onClick={() => setIsCreateAlarmaModalShown(true)}
            >
              Crear
            </Button>
          </div>
          <div className="overflow-x-auto">
            {alarmas ? (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alarmas.map((c: AlarmaData, index) => (
                    <tr className="hover" key={c.id}>
                      <td className="px-6 py-4">
                        <Link href={`/alarma/${c.id}`}>{index + 1}</Link>
                      </td>
                      <td>{c.nombre}</td>
                      <td>{c.estado}</td>
                      <td>
                        <a
                          className="btn btn-ghost btn-xs"
                          onClick={() => setSelectedAlarma(c)}
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Acciones</th>
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
