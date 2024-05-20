"use client"

import AutoComplete from "@/components/AutoComplete";
import SearchIcon from "@/components/SearchIcon";
import { DevicesActives } from "@/components/ui/DevicesActives";

import { getAllPlacaFn, getAllPlacas } from "@/services/motoApi";
import { MotoData } from "@/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Mapa = dynamic(() => import("@/components/ui/MapHome"), {
    ssr: false,
});

const MapaDefer = dynamic(() => import("@/components/MapDef"), {
    ssr: false,
});

export default function Home() {
    const [val, setVal] = useState<string>("");
    const [items, setItems] = useState<string[]>([]);
    const [placas, setPlacas] = useState<string[]>([]);

    const {
        data: dataMoto,
    } = useQuery<MotoData, Error>({
        queryKey: ["placa", val],
        queryFn: () => getAllPlacaFn(val),
    });

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

            <div className="container m-auto grid grid-cols-4 md:grid-cols-12">
                <main className="col-span-4 md:col-span-8">
                    <div className="bg-base-200 rounded-s-lg shadow-sm sm:w-full">
                        <div className=" bg-base-200 w-full p-2">
                            <div className="z-100">
                                <div className="rounded-lg p-3">

                                    <div className="flex w-10 items-center justify-center border-r p-2">
                                        <svg
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                            className="pointer-events-none absolute w-5 fill-primary transition"
                                        >
                                            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                        </svg>
                                    </div>
                                    <AutoComplete items={items} value={val} onChange={setVal} />
                                </div>

                            </div>
                            <div className="top-0 left-0 w-full h-full">
                                <div className="map__container px-4 pb-4 rounded-lg shadow-md z-0">
                                    {dataMoto ? (
                                        <Mapa
                                            moto={dataMoto}
                                            position={{ latitude: -17.7829645, longitude: -63.1824842, id: 7, speed: 8, dispositivo_id: 6767, date: new Date().toDateString(), batt: 8, timestamp: 431 }}
                                        />
                                    ) : (
                                        <MapaDefer />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <aside className="col-span-4">
                    <div className="h-screen bg-base-200 rounded-e-lg sticky top-0 p-2">
                        <div className="max-w-xs mx-auto bg-base-100 rounded-lg shadow-md overflow-hidden">
                            <DevicesActives />
                            {/*<SearchIcon loop />*/}
                        </div>
                    </div>
                </aside>

            </div>
        </>
    );
}
