"use client"
import { SimpleLoading } from "@/components/SimpleLoading";
import { getAllClientsFn } from "@/services";
import { ClientData } from "@/types";
import { useQuery } from "react-query";
import Link from "next/link";

export default function Page() {
  const {
    isLoading,
    isError,
    //error,
    data: clients,
  } = useQuery<ClientData[], Error>(["clients"], getAllClientsFn);

  if (isError) return <div>error al cargar datos..☠️</div>
  if (isLoading) return <SimpleLoading />
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link href='/'>Inicio</Link></li>
          <li>Clientes</li>
        </ul>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-center">Lista de Clientes</h2>
          <div className="overflow-x-auto">
            {clients ?
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>CI</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
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
                      <td>{c.phone}</td>
                      <td><Link className="btn btn-ghost btn-xs" href={`/client/${c.id}`}>Ver</Link></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>CI</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th></th>
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
