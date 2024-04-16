"use client";
import { LoaderTiny } from "@/components/LoaderTiny";
import { Maps } from "@/components/Maps";
import { SimpleLoading } from "@/components/SimpleLoading";
import { getPositionLimitFn } from "@/services/positionApi";
import { PositionData } from "@/types";
import { useState } from "react";
import { useQuery } from "react-query";

interface Props {
  device_id: string;
  amount?: string;
  changeAmount?: (amount: string) => void;
}

const Positions = ({ device_id, amount = "5", changeAmount }: Props) => {
  const [deviceId, setDeviceId] = useState<string>(device_id);
  const [amountPosition, setAmountPosition] = useState<string>(amount);

  changeAmount?.("sas");

  const {
    isLoading,
    isError,
    data: positions,
  } = useQuery<PositionData[], Error>({
    queryKey: ["positionss", deviceId, amountPosition],
    queryFn: () => getPositionLimitFn(deviceId, amountPosition),
  });

  if (isError) return <span>Algo salio mal</span>;
  if (isLoading) return <SimpleLoading />;

  return <div>{positions ? <Maps positions={positions} /> : <LoaderTiny />}</div>;
};

export default Positions;
