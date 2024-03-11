import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { AlarmaData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

type Props = {
  alarma: AlarmaData;
  onClose?: () => void;
};

const UpadateAlarmaModel = ({ alarma, onClose }: Props) => {
  const [error, setError] = useState("");

  const schema = z.object({
    nombre: z.string().min(1),
    estado: z.string().min(1),
    devices: z.string().min(1),
    typealarma_id: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: alarma.nombre,
      estado: alarma.estado,
      devices: alarma.devices,
      typealarma_id: alarma.typealarma_id,
    },
  });

  const onSubmit = handleSubmit(
    async ({ nombre, estado, devices, typealarma_id }) => {
      /*   const response = await updateMotoFn(pizza.id, name, ingredients, {
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
      <Title title="Editar." description="Editar Alarma." />
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Nombre" {...register("nombre")} />
              {errors.nombre?.message && <Error>{errors.nombre.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Estado" {...register("estado")} />
              {errors.estado?.message && <Error>{errors.estado.message}</Error>}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Devices" {...register("devices")} />
              {errors.devices?.message && (
                <Error>{errors.devices.message}</Error>
              )}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Tipo alarma" {...register("typealarma_id")} />
              {errors.typealarma_id?.message && (
                <Error>{errors.typealarma_id.message}</Error>
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
export default UpadateAlarmaModel;
