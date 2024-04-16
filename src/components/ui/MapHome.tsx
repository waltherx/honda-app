import { MotoCreate, PositionData } from "@/types";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    Popup,
    TileLayer,
    Tooltip
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

                            <Tooltip direction="top" opacity={1} permanent>
                                <div className="relative max-w-sm">
                                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-primary rounded-lg"></span>
                                    <div className="relative h-full border-2 border-base-100 rounded-lg bg-base-100 p-3">
                                        <div className="flex flex-col space-y-2 text-pretty">
                                            <div className="flex items-center -mt-1">

                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M4 13.2561V12H2V10H8.36547L11.2 8H14.6915L13.5996 5H11V3H15L16.0919 6H20V9H17.1838L18.6405 13.0022C21.0608 13.0764 23 15.0617 23 17.5C23 19.9853 20.9853 22 18.5 22C16.0147 22 14 19.9853 14 17.5C14 15.6722 15.0897 14.0989 16.6549 13.3944L15.4194 10H14.4718L12.89 15.87L12.8876 15.8689L12.8897 15.8745L9.96536 16.9389C9.98822 17.1227 10 17.31 10 17.5C10 19.9853 7.98528 22 5.5 22C3.01472 22 1 19.9853 1 17.5C1 15.5407 2.25221 13.8738 4 13.2561ZM6 13.0275C7.37617 13.1796 8.56531 13.9523 9.28138 15.0595L11.2383 14.3472L12.4032 10H11.8563L9 12H6V13.0275ZM5.5 20C6.88071 20 8 18.8807 8 17.5C8 16.1193 6.88071 15 5.5 15C4.11929 15 3 16.1193 3 17.5C3 18.8807 4.11929 20 5.5 20ZM18.5 20C19.8807 20 21 18.8807 21 17.5C21 16.1193 19.8807 15 18.5 15C17.1193 15 16 16.1193 16 17.5C16 18.8807 17.1193 20 18.5 20Z"></path></svg>
                                                <h3 className="my-2 ml-3 text-lg font-bold">{moto.placa}</h3>
                                            </div>
                                            <div className="font-semibold">Placa: </div>
                                            <div>{moto.modelo}</div>
                                            <div> {moto.marca}</div>
                                            <div>{toMoney(moto.precio_compra)}</div>
                                            <div>{toStr(moto.fecha_compra)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Tooltip>
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