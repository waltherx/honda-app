import { toStr } from "@/libs/format";
import { PositionData } from "@/types";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { SimpleLoading } from "./SimpleLoading";

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
  const gson = positions.map(({ latitude, longitude }) => ({
    lat: latitude,
    lng: longitude,
  }));
  const limeOptions = { color: "lime" };

  return (
    <div className="map__container z-0">
      {positions ? (
        <MapContainer
          center={[
            positions.at(1)?.latitude ?? -17.7829645,
            positions.at(1)?.longitude ?? -63.1824842,
          ]}
          zoom={13}
          scrollWheelZoom={true}
          className={`rounded-lg`}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline pathOptions={limeOptions} positions={gson} />
          <Marker
            position={[
              positions.at(0)?.latitude ?? -17.7829645,
              positions.at(0)?.longitude ?? -63.1824842,
            ]}
          >
            <Tooltip direction="top" opacity={1} permanent>
              <span className="text-xs shadow-sm border-spacing-3 p-1">
                Inicio
              </span>
            </Tooltip>
          </Marker>
          {positions.map((position) => (
            <>
              <CircleMarker
                key={position.id}
                center={[position.latitude, position.longitude]}
              >
                <Popup>
                  <span>fecha : </span>
                  <span>{toStr(position.date)}</span>
                </Popup>
                <Circle
                  center={[position.latitude, position.longitude]}
                  fillColor="red"
                  radius={5}
                />
                <Tooltip direction="top" offset={[0, 20]} opacity={1}>
                  <div className="text-xs shadow-sm border-spacing-3 p-1">
                    <span>{position.id}</span>
                    <br />
                    <span>fecha : </span>
                    <span>{toStr(position.date)}</span>
                  </div>
                </Tooltip>
              </CircleMarker>
            </>
          ))}
          <Marker
            position={[
              positions.at(positions.length - 1)?.latitude ?? -17.7829645,
              positions.at(positions.length - 1)?.longitude ?? -63.1824842,
            ]}
          >
            <Tooltip direction="top" opacity={1} permanent>
              <span className="text-xs shadow-sm border-spacing-3 p-1">
                Fin
              </span>
            </Tooltip>
          </Marker>
          {/*<CircleMarker center={[position.latitude, position.longitude]} radius={1} color='red'/>*/}
        </MapContainer>
      ) : (
        <SimpleLoading />
      )}
    </div>
  );
}
