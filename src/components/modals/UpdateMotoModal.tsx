import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import * as z from "zod";
import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { Toast } from "@/components/Toast";
import { updateMotoFn } from "@/services/motoApi";
import { MotoData } from "@/types";
import { motoSchema } from "@/schemas";

type Props = {
  moto: MotoData;
  onClose?: () => void;
};

const UpadateMotoModel = ({ moto, onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof motoSchema>>({
    resolver: zodResolver(motoSchema),
    defaultValues: {
      marca: moto.marca,
      modelo: moto.modelo,
      descripcion: moto.descripcion,
      litrokm: moto.litrokm,
      placa: moto.placa,
      estado: moto.estado,
      client_id: moto.client_id,
      sucrusal_id: moto.sucrusal_id,
    },
  });

  const onSubmit = handleSubmit(
    async ({ marca, modelo, placa, estado, client_id }) => {
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
      <Title title="Editar." description="Editar moto." />
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Placa" {...register("placa")} />
              {errors.placa?.message && <Error>{errors.placa.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Marca" {...register("marca")} />
              {errors.marca?.message && <Error>{errors.marca.message}</Error>}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Modelo" {...register("modelo")} />
              {errors.modelo?.message && <Error>{errors.modelo.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Año" {...register("litrokm")} />
              {errors.litrokm?.message && (
                <Error>{errors.litrokm.message}</Error>
              )}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Motor" {...register("descripcion")} />
              {errors.descripcion?.message && (
                <Error>{errors.descripcion.message}</Error>
              )}
            </div>
          </div>
        </div>

        <div className="md:flex flex-row md:space-x-4 w-full text-xs">
          <div className="mb-3 space-y-2 w-full text-sm">
            <label className="font-semibold text-gray-600 py-2">Color</label>
            <Input placeholder="Color" {...register("sucrusal_id")} />
            {errors.sucrusal_id?.message && (
              <Error>{errors.sucrusal_id.message}</Error>
            )}
          </div>
          <div className="mb-3 space-y-2 w-full text-sm">
            <label className="font-semibold text-gray-600 py-2">Peso</label>
            <Input placeholder="peso" {...register("client_id")} />
            {errors.client_id?.message && (
              <Error>{errors.client_id.message}</Error>
            )}
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
export default UpadateMotoModel;
