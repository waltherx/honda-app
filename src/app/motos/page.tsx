"use client"
import { SimpleLoading } from "@/components/SimpleLoading";
import { MotoData } from "@/types";
import Link from "next/link";
import { getAllMotos } from "../../services/motoApi";
import { useQuery } from "@tanstack/react-query";


export default function Page() {

  //const [motos, setMotos] = useState<MotoData[]>([]);
  const { data: motos, isLoading, isFetching, error } = useQuery<MotoData[]>({
    queryKey: ["motos"],
    queryFn: getAllMotos,
  });

  if (error) return <div>error al cargar datos..☠️</div>
  if (isLoading) return <SimpleLoading />

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link href='/'>Inicio</Link></li>
          <li>Motos</li>
        </ul>
      </div>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex gap-x-8">
            <h2 className="card-title text-center">
              Lista de Motos
            </h2>
            <Link href={'/add'} className="btn btn-primary">Crear</Link>
          </div>
          <div className="overflow-x-auto">
            {motos ?
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
                      <td><Link className="btn btn-ghost btn-xs" href={`/motos/${c.id}`}>Ver</Link></td>
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
              : <p>Cargando...😶‍🌫️</p>
            }
          </div>
        </div>
      </div>
    </>
  );
}

