import { toStr } from '@/libs/format';
import { PositionData } from "@/types";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { SimpleLoading } from './SimpleLoading';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: marketIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface mapProps {
    positions: PositionData[];
    centers?: number[];
}

export function Maps({ positions }: mapProps) {

    console.table(positions.at(1)?.latitude);

    return (
        <div className="map__container z-0" >
            {positions ?
                <MapContainer
                    center={[positions.at(1)?.latitude ?? -17.7829645, positions.at(1)?.longitude ?? -63.1824842]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className={`rounded-lg`}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {positions.map(position => (
                        <Marker
                            key={position.id}
                            position={[position.latitude, position.longitude]}
                        >
                            <Popup>
                                <span>ID : </span>{position.id}
                                <br />
                                <span>fecha : </span>{toStr(position.date)}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                : <SimpleLoading />}
        </div>
    );
}
