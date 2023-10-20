"use client"
import { Maps } from "@/components/Maps";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getPositionLimitFn } from "@/services/positionApi";
import { PositionData } from "@/types";
import { useEffect, useState } from "react";

interface Props {
    device_id: string;
}

const Positions = ({ device_id }: Props) => {

    const [deviceId, setDeviceId] = useState<string>(device_id);
    const [positions, setPositions] = useState<PositionData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getPositionLimitFn(deviceId, "5").then((data) => {
            setPositions(data);
            setLoading(false);
        }).catch(() => {
            setError(true);
        });

    }, [deviceId]);

    if (error) return <span>Algo salio mal</span>
    if (loading) return <SimpleLoading />

    return (
        <div>
            <Maps positions={positions} />
        </div>
    );
}

export default Positions;