import { MotoCreate, PositionData } from "@/types";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    Popup,
    TileLayer
} from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import { LoaderTiny } from "../LoaderTiny";
import { toMoney, toStr } from "@/libs/format";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: marketIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface Props {
    moto: MotoCreate;
    position: PositionData;
}

const MapHome = ({ moto, position }: Props) => {

    return (
        <div className="map__container z-0">
            {position ? (
                <MapContainer
                    center={[
                        position.latitude ?? -17.7829645,
                        position.longitude ?? -63.1824842,
                    ]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className={`rounded-lg`}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <ReactLeafletDriftMarker
                        position={{ lat: position.latitude, lng: position.longitude }}
                        duration={1000}
                    >
                        {moto ?

                            <Popup>
                                <div className="bg-base-100 m-4 p-2">
                                    <div className="flex flex-col space-y-2 ">
                                        <div className="text-xl font-semibold">Placa: {moto.placa}</div>
                                        <div>{moto.modelo}</div>
                                        <div> {moto.marca}</div>
                                        <div>{toMoney(moto.precio_compra)}</div>
                                        <div>{toStr(moto.fecha_compra)}</div>
                                    </div>

                                </div>
                            </Popup>
                            : <Popup>
                                😪
                            </Popup>
                        }

                    </ReactLeafletDriftMarker>
                </MapContainer>
            ) : (
                <LoaderTiny />
            )}
        </div>
    );
}

export default MapHome;