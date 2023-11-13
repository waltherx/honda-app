"use client"
import { Maps } from "@/components/Maps";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getPositionLimitFn } from "@/services/positionApi";
import { PositionData } from "@/types";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

interface Props {
    device_id: string;
    amount?: string;
    changeAmount?: (amount: string) => void;
}

const Positions = ({ device_id, amount = "5" }: Props) => {

    const [deviceId, setDeviceId] = useState<string>(device_id);
    const [amountPosition, setAmountPosition] = useState<string>(amount);

    const {
        isLoading,
        isError,
        data: positions
    } = useQuery<PositionData[], Error>({ queryKey: ["positionss", deviceId, amountPosition], queryFn: () => getPositionLimitFn(deviceId, amountPosition) });

    if (isError) return <span>Algo salio mal</span>
    if (isLoading) return <SimpleLoading />

    return (
        <div>
            {positions ?
                <Maps positions={positions} />
                :
                <div>☠</div>
            }
        </div>
    );
}

export default Positions;