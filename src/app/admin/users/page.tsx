"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getAllClientsFn } from "@/services/clientApi";
import { getAllUsersFn } from "@/services/userApi";
import { UserData } from "@/types";
import { useQuery } from "react-query";
import Link from "next/link";
import Role from "./Role";

export default function Page() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<UserData[]>(["users"], getAllUsersFn);

  if (isError) return <div>error al cargar datos..☠️</div>;
  if (isLoading) return <SimpleLoading />;
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>Usuarios</li>
        </ul>
      </div>
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-center">Lista de Usuarios</h2>
          <div className="overflow-x-auto">
            {users ? (
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Nombre Completo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: UserData) => (
                    <tr className="hover" key={u.id}>
                      <td className="px-6 py-4">
                        <Link href={`/client/${u.id}`}>{u.username}</Link>
                      </td>
                      <td>{u.realname}</td>
                      <td>
                        <Role params={{ id: u.role_id.toString() }} />
                      </td>
                      <td>{u.status}</td>
                      <td>
                        <Link
                          className="btn btn-ghost btn-xs"
                          href={`/client/${u.id}`}
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Username</th>
                    <th>Nombre Completo</th>
                    <th>Rol</th>
                    <th>Estado</th>
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
