import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { sucrusalSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

type Props = {
  onClose?: () => void;
};

const CreateMotoModal = ({ onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof sucrusalSchema>>({
    resolver: zodResolver(sucrusalSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    /* const response = await createMotoFn(name, ingredients, {
             small: +smallPrice,
             medium: +mediumPrice,
             large: +largePrice,
         });
 
         if (response?.status === 'success') {
             if (onClose) {
                 onClose();
             }
 
             toast(<Toast text={response.message} />);
         } else {
             setError(response.message);
         }*/
  });

  return (
    <Modal onClose={onClose} addBackground={true}>
      <Title title="Registrar Sucrusal" description="Registar una nueva sucrusal." />
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Nombre" {...register("nombre")} />
              {errors.nombre?.message && <Error>{errors.nombre.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Descripcion" {...register("direccion")} />
              {errors.direccion?.message && (
                <Error>{errors.direccion.message}</Error>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex"></div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <Button variant="white" type="button" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="primary">Guardar</Button>
          </div>
          <div className={twMerge("text-right", !error && "hidden")}>
            <Error>{error}</Error>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMotoModal;
