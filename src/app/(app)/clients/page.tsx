"use client";
import { Button } from "@/components/Button";
import CreateClienteModal from "@/components/modals/CreateClientModal";
import UpadateClientModel from "@/components/modals/UpdateClientModal";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getAllClientsFn } from "@/services";
import { ClientData } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function Page() {
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [isCreateClientModalShown, setIsCreateClientModalShown] =
    useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: clients,
  } = useQuery<ClientData[], Error>(["clients"], getAllClientsFn);

  useEffect(() => {
    if (isCreateClientModalShown === false || selectedClient === null) {
      queryClient.invalidateQueries("clients");
    }
  }, [isCreateClientModalShown, selectedClient]);

  if (isError) return <div>error al cargar datos..☠️</div>;
  if (isLoading) return <SimpleLoading />;

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>Clientes</li>
        </ul>
      </div>
      <div className="card bg-base-200">
        {isCreateClientModalShown && (
          <CreateClienteModal
            onClose={() => setIsCreateClientModalShown(false)}
          />
        )}
        {selectedClient && (
          <UpadateClientModel
            cliente={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
        <div className="card-body">
          <div className="flex gap-x-8">
            <h2 className="card-title text-center">Lista de Clientes</h2>
            <Button
              variant="primary"
              onClick={() => setIsCreateClientModalShown(true)}
            >
              Crear
            </Button>
          </div>
          <div className="overflow-x-auto">
            {clients ? (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>CI</th>
                    <th>Nombre Completo</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c: ClientData) => (
                    <tr className="hover" key={c.id}>
                      <td className="px-6 py-4">
                        <Link href={`/client/${c.id}`}>{c.ci}</Link>
                      </td>
                      <td>{c.fullname}</td>
                      <td>{c.address}</td>
                      <td>{c.phone}</td>
                      <td>
                        <Link
                          className="btn btn-ghost btn-xs"
                          href={`/client/${c.id}`}
                        >
                          Ver
                        </Link>
                      </td>
                      <td>
                        <a
                          className="btn btn-ghost btn-xs"
                          onClick={() => setSelectedClient(c)}
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>CI</th>
                    <th>Nombre Completo</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th></th>
                    <th></th>
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
