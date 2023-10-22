'use client';

import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

type Props = {
    position: [number, number];
};

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

export default function MapDef() {
    return (
        <MapContainer
            center={[-17.7846831, -63.1778363]}
            zoom={13}
            scrollWheelZoom={true}
            className={`rounded-lg`}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*<Marker position={position} />*/}
        </MapContainer>
    );
}