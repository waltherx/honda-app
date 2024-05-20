
import { getAllDevicesFn, getPositionLastFn } from "@/services";
import { useQuery } from "react-query";
import LastPost from "./LastPos";
import { LoaderTiny } from "../LoaderTiny";
import Link from "next/link";

export function DevicesActives() {

    const { data, isLoading } = useQuery(['devices'], getAllDevicesFn)

    if (isLoading) return <LoaderTiny />

    return (
        <div className="bg-base-100">
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows">
                        <thead>
                            <tr>
                                <th>Dispositivo
                                </th>
                                <th>Informacion</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data ? (
                                data?.map((last, id) => (
                                    <tr key={id}>
                                        <th className="text-pretty">
                                            <Link className="btn btn-xs btn-ghost" href={`/devices/positions/${last.id}`}> {last.serial}</Link>
                                        </th>
                                        <th>
                                            <LastPost id={last.id.toString()} />
                                        </th>
                                    </tr>
                                ))) :
                                <LoaderTiny />
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Dispositivo</th>
                                <th>Informacion</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>


    );
}