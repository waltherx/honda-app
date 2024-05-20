import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { deviceSchema } from "@/schemas";
import { DeviceData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

type Props = {
  device: DeviceData;
  onClose?: () => void;
};

const UpadateDeviceModel = ({ device, onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof deviceSchema>>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      serial: device.serial,
      chipgsm: device.chipgsm,
      estado: device.estado,
      megas_fin: device.megas,
    },
  });

  const onSubmit = handleSubmit(
    async ({ serial, chipgsm, estado, megas_fin }) => {
      /*   const response = await updateClienteFn(pizza.id, name, ingredients, {
               small: +smallPrice,
               medium: +mediumPrice,
               large: +largePrice,
           });
   
           if (response.status === 'success') {
               if (onClose) {
                   onClose();
               }
   
               toast(<Toast text={response.message} />);
           } else {
               setError(response.message);
           }*/
    }
  );

  return (
    <Modal onClose={onClose} addBackground={true}>
      <Title title="Editar." description="Editar Cliente." />
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Placa" {...register("serial")} />
              {errors.serial?.message && <Error>{errors.serial.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Marca" {...register("chipgsm")} />
              {errors.chipgsm?.message && (
                <Error>{errors.chipgsm.message}</Error>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Modelo" {...register("estado")} />
              {errors.estado?.message && <Error>{errors.estado.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Año" {...register("megas_fin")} />
              {errors.megas_fin?.message && (
                <Error>{errors.megas_fin.message}</Error>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <Button variant="white" type="button" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="primary">Actualizar</Button>
          </div>
          <div className={twMerge("text-right", !error && "hidden")}>
            <Error>{error}</Error>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default UpadateDeviceModel;
