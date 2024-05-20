"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { MotoData } from "@/types";
import Link from "next/link";
import { getAllMotos } from "@/services";
import { useQuery } from "react-query";
import {} from "@/components/Button";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import CreateMotoModal from "@/components/modals/CreateMotoModal";
import UpdateMotoModal from "@/components/modals/UpdateMotoModal";

export default function Page() {
  const [selectedMoto, setSelectedMoto] = useState<MotoData | null>(null);
  const [isCreateMotoModalShown, setIsCreateMotoModalShown] = useState(false);

  const {
    data: motos,
    isLoading,
    error,
  } = useQuery<MotoData[]>({
    queryKey: ["motos"],
    queryFn: getAllMotos,
  });

  useEffect(() => {
    if (isCreateMotoModalShown === false || selectedMoto === null) {
      //fetchPizzas();
    }
  }, [isCreateMotoModalShown, selectedMoto]);

  if (error) return <div>error al cargar datos..☠️</div>;
  if (isLoading) return <SimpleLoading />;

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>Motos</li>
        </ul>
      </div>
      <div className="card bg-base-200 shadow-xl">
        {isCreateMotoModalShown && (
          <CreateMotoModal onClose={() => setIsCreateMotoModalShown(false)} />
        )}
        {selectedMoto && (
          <UpdateMotoModal
            moto={selectedMoto}
            onClose={() => setSelectedMoto(null)}
          />
        )}
        <div className="card-body">
          <div className="flex gap-x-8">
            <h2 className="card-title text-center">Lista de Motos</h2>
            <Button
              variant="primary"
              onClick={() => setIsCreateMotoModalShown(true)}
            >
              Crear
            </Button>
          </div>
          <div className="overflow-x-auto">
            {motos ? (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {motos.map((c: MotoData) => (
                    <tr className="hover" key={c.id}>
                      <td className="px-6 py-4">
                        <Link href={`/motos/${c.id}`}>{c.placa}</Link>
                      </td>
                      <td>{c.marca}</td>
                      <td>{c.modelo}</td>
                      <td>
                        <a
                          className="btn btn-ghost btn-xs"
                          onClick={() => setSelectedMoto(c)}
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Placa</th>
                    <th>Marca</th>
                    <th>Modelo</th>
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
