import { toStr } from '@/libs/format';
import { PositionData } from "@/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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

interface mapProps {
    positions: PositionData[];
}


export function Maps({ positions }: mapProps) {
    return (
        <div className="map__container card-body z-0" >
            <MapContainer
                center={[-17.782070, -63.178765]}
                zoom={13}
                scrollWheelZoom={false}

            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {positions && positions.map(position => (
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
        </div>
    );
}