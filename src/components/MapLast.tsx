import { toStr } from "@/libs/format";
import { hashQueryKey, useQuery } from "react-query";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { PositionData } from '@/types'
import { useState } from "react";
import { getPositionLastFn } from "@/services/positionApi";
import Loader from "./Loader";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: marketIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface Props {
    device_id: string;
}

const MapLast = ({ device_id }: Props) => {
    const [deviceId, setDeviceId] = useState(device_id);

    const {
        data: position,
        isLoading,
        isError
    } = useQuery<PositionData>({
        queryKey: ['positionlast', deviceId],
        queryFn: async () => getPositionLastFn(deviceId),
        refetchInterval: 10000
    });

    console.log(position);

    if (isLoading) return <Loader />

    return (
        <div className="map__container z-0" >
            {position ?
                <MapContainer
                    center={[position.latitude, position.longitude]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className={`rounded-lg`}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                        position={[position.latitude, position.longitude]}
                    >
                        <Popup>
                            <span>Ultima ubicacion</span>
                            <br />
                            <span>ID : </span>{position.id}
                            <br />
                            <span>fecha : </span>{toStr(position.date)}
                        </Popup>
                    </Marker>
                </MapContainer>
                : <Loader />
            }
        </div>
    );
}

export default MapLast;