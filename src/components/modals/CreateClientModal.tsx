import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { clientShema } from "@/schemas";
import { createClientFn } from "@/services";
import { toast } from "react-toastify";
import { Toast } from "../Toast";

type Props = {
  onClose?: () => void;
};

const CreateClienteModal = ({ onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof clientShema>>({
    resolver: zodResolver(clientShema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await createClientFn(data);

    if (response) {
      if (onClose) {
        onClose();
      }
      toast(<Toast text={"creado correctamente"} />);
    } else {
      setError("Error al guardar");
    }
  });

  return (
    <Modal onClose={onClose} addBackground={true}>
      <Title
        title="Registrar Cliente"
        description="Registar una nuevo cliente."
      />
      <form onSubmit={onSubmit}>
        <div className="mt-2">
          <div className="flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">CI :</span>
              </div>
              <Input placeholder="Ingresa ci" {...register("ci")} />
              {errors.ci?.message && <Error>{errors.ci.message}</Error>}
            </label>
            <label className="form-control w-full ml-2">
              <div className="label">
                <span className="label-text">Nombre Completo :</span>
              </div>
              <Input
                placeholder="Ingresa nombre completo"
                {...register("fullname")}
              />
              {errors.fullname?.message && (
                <Error>{errors.fullname.message}</Error>
              )}
            </label>
          </div>
        </div>

        <div className="mt-1">
          <div className="flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Direccion :</span>
              </div>
              <Input placeholder="Ingresa direccion" {...register("address")} />
              {errors.address?.message && (
                <Error>{errors.address.message}</Error>
              )}
            </label>
            <label className="form-control w-full ml-2">
              <div className="label">
                <span className="label-text">Telefono :</span>
              </div>
              <Input placeholder="Ingresa telefono" {...register("phone")} />
              {errors.phone?.message && <Error>{errors.phone.message}</Error>}
            </label>
          </div>
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

export default CreateClienteModal;
