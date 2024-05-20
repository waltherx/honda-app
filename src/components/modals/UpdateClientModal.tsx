import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { clientShema } from "@/schemas";
import { ClientData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

type Props = {
  cliente: ClientData;
  onClose?: () => void;
};

const UpadateClientModel = ({ cliente, onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof clientShema>>({
    resolver: zodResolver(clientShema),
    defaultValues: {
      ci: cliente.ci,
      fullname: cliente.fullname,
      address: cliente.address,
      phone: cliente.phone,
    },
  });

  const onSubmit = handleSubmit(async ({ ci, fullname, address, phone }) => {
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
  });

  return (
    <Modal onClose={onClose} addBackground={true}>
      <Title title="Editar." description="Editar Cliente." />
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Placa" {...register("ci")} />
              {errors.ci?.message && <Error>{errors.ci.message}</Error>}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Marca" {...register("fullname")} />
              {errors.fullname?.message && (
                <Error>{errors.fullname.message}</Error>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <div className="w-full">
              <Input placeholder="Modelo" {...register("address")} />
              {errors.address?.message && (
                <Error>{errors.address.message}</Error>
              )}
            </div>
            <div className="w-full ml-2">
              <Input placeholder="Año" {...register("phone")} />
              {errors.phone?.message && <Error>{errors.phone.message}</Error>}
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
export default UpadateClientModel;
