"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { SucrusalData } from "@/types";
import Link from "next/link";
import { getAllSucrusalsFn } from "../../services/sucrusalApi";
import { useQuery } from "react-query";
import {} from "@/components/Button";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import CreateSucrusalModal from "@/components/modals/CreateSucrusalModal";
import UpdateSucrusalModal from "@/components/modals/UpdateSucrusalModal";

export default function Page() {
  const [selectedSucrusal, setSelectedSucrusal] = useState<SucrusalData | null>(
    null
  );
  const [isCreateSucrusalModalShown, setIsCreateSucrusalModalShown] =
    useState(false);
  const {
    data: sucrusals,
    isLoading,
    error,
  } = useQuery<SucrusalData[]>({
    queryKey: ["sucrusals"],
    queryFn: getAllSucrusalsFn,
  });

  useEffect(() => {
    if (isCreateSucrusalModalShown === false || selectedSucrusal === null) {
      //fetchPizzas();
    }
  }, [isCreateSucrusalModalShown, selectedSucrusal]);

  if (error) return <div>error al cargar datos..☠️</div>;
  if (isLoading) return <SimpleLoading />;

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>Sucrusales</li>
        </ul>
      </div>
      <div className="card bg-base-200 shadow-xl">
        {isCreateSucrusalModalShown && (
          <CreateSucrusalModal
            onClose={() => setIsCreateSucrusalModalShown(false)}
          />
        )}
        {selectedSucrusal && (
          <UpdateSucrusalModal
            sucrusal={selectedSucrusal}
            onClose={() => setSelectedSucrusal(null)}
          />
        )}
        <div className="card-body">
          <div className="flex gap-x-8">
            <h2 className="card-title text-center">Lista de Sucrusales</h2>
            <Button
              variant="primary"
              onClick={() => setIsCreateSucrusalModalShown(true)}
            >
              Crear
            </Button>
          </div>
          <div className="overflow-x-auto">
            {sucrusals ? (
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
                  {sucrusals.map((c: SucrusalData, index) => (
                    <tr className="hover" key={c.id}>
                      <td className="px-6 py-4">
                        <Link href={`/sucrusal/${c.id}`}>{index + 1}</Link>
                      </td>
                      <td>{c.nombre}</td>
                      <td>{c.direccion}</td>
                      <td>
                        <a
                          className="btn btn-ghost btn-xs"
                          onClick={() => setSelectedSucrusal(c)}
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
