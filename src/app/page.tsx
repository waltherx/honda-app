"use client"
import AutoComplete from "@/components/AutoComplete";
import SearchIcon from "@/components/SearchIcon";
import { toMoney, toStr } from "@/libs/format";
import { getAllPlacaFn, getAllPlacas } from "@/services/motoApi";
import { MotoData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import dynamic from 'next/dynamic';
import Link from "next/link";
import { useEffect, useState } from "react";

const Mapa = dynamic(() => import('@/app/devices/positions/[id]/Positions'), {
  ssr: false,
});

const MapaDefer = dynamic(() => import('@/components/MapDef'), {
  ssr: false,
});

export default function Home() {

  const [val, setVal] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [placas, setPlacas] = useState<string[]>([]);

  const {
    // isLoading,
    //isError,
    //error: errorMoto,
    data: dataMoto } = useQuery<MotoData, Error>({ queryKey: ['placa', val], queryFn: () => getAllPlacaFn(val) });

  useEffect(() => {
    async function fetchData() {
      const placas = await getAllPlacas();
      const newItems = placas.map((p) => p.placa).sort();
      setPlacas(newItems);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!val) {
      setItems(placas);
      return;
    }
    const newItems = placas
      .filter((p) => p.toLowerCase().includes(val.toLowerCase()))
      .sort();
    setItems(newItems);
  }, [placas, val]);

  return (
    <>
      <div className="flex">
        <div className="w-3/4 bg-base-200 rounded-s-lg p-4">
          <div className="card bg-base-200 w-full">
            <div className='z-10'>
              <div className="w-full rounded-lg p-5">
                <div className="flex">
                  <div className="flex w-10 items-center justify-center border-r p-5">
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-primary transition">
                      <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                    </svg>
                  </div>
                  <AutoComplete items={items} value={val} onChange={setVal} />
                </div>
              </div>
            </div>
            <div className="map__container card-body z-0" >
              {dataMoto ?
                <Mapa device_id={dataMoto?.dispositivo?.id.toString() ?? "0"} />
                : <MapaDefer />
              }
            </div>
          </div>
        </div>
        <div className="w-1/4 h-screen bg-base-200 rounded-e-lg sticky top-0 p-2">
          <div className="max-w-xs mx-auto bg-base-200 rounded-lg shadow-md overflow-hidden mt-24">
            <div className="bg-base-200 px-4 py-2">
              <h2 className="text-lg font-medium">Informacion Moto </h2>
            </div>
            {dataMoto ?
              <div className="px-4 py-3 sm:p-5">
                <div className="flex flex-col items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Placa </span>
                  <span className="text-lg font-medium ">{dataMoto.placa}</span>
                </div>
                <div className="flex flex-col items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Modelo</span>
                  <span className="text-lg font-medium ">{dataMoto.marca + ", " + dataMoto.modelo}</span>
                </div>
                <div className="flex flex-col items-start justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Serial Dispositivo</span>
                  <div className="tooltip" data-tip="Ver dispositivo"><Link className="btn-md btn-ghost text-lg font-medium rounded-xl" href={`/devices/positions/${dataMoto.dispositivo?.id}`}>{dataMoto.dispositivo?.serial}</Link></div>
                </div>
                <div className="flex flex-row items-start justify-between mb-3">
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-500">Fecha</span>
                    <span className="text-lg font-medium ">{toStr(dataMoto.fecha_compra)}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-500">Precio Compra</span>
                    <span className="text-lg font-medium ">{toMoney(dataMoto.precio_compra)}</span>
                  </div>
                </div>
                <div className="flex flex-row items-start justify-between">
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-500">Id cliente</span>
                    <span className="text-lg font-medium ">{dataMoto.client_id}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-500">Id Moto</span>
                    <span className="text-lg font-medium ">{dataMoto.id}</span>
                  </div>
                </div>
              </div>
              : <div className="w-32 h-32"><SearchIcon loop /></div>}
          </div>

        </div>
      </div>
    </>
  );
}
