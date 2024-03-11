import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { sucrusalSchema } from "@/schemas";
import { SucrusalData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

type Props = {
  sucrusal: SucrusalData;
  onClose?: () => void;
};

const UpadateSucrusalModal = ({ sucrusal, onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof sucrusalSchema>>({
    resolver: zodResolver(sucrusalSchema),
    defaultValues: {
      id: sucrusal.id,
      nombre: sucrusal.nombre,
      direccion: sucrusal.direccion,
      latitude: sucrusal.latitude,
      longitude: sucrusal.longitude,
    },
  });

  const onSubmit = handleSubmit(
    async ({ id, nombre, direccion, latitude, longitude }) => {
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
      <Title title="Editar Sucrusal." description="Ingrese la informacion Sucrusal." />
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="ID" {...register("id")} />
              {errors.id?.message && <Error>{errors.id.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Nombre" {...register("nombre")} />
              {errors.nombre?.message && <Error>{errors.nombre.message}</Error>}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Direccion" {...register("direccion")} />
              {errors.direccion?.message && (
                <Error>{errors.direccion.message}</Error>
              )}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="-" {...register("latitude")} />
              {errors.latitude?.message && (
                <Error>{errors.latitude.message}</Error>
              )}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="-" {...register("longitude")} />
              {errors.longitude?.message && (
                <Error>{errors.longitude.message}</Error>
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
export default UpadateSucrusalModal;
