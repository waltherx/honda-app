import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { estadoDevice } from "@/libs/constans";
import { deviceSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

type Props = {
  onClose?: () => void;
};

const CreateDeviceModal = ({ onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof deviceSchema>>({
    resolver: zodResolver(deviceSchema),
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
      <Title
        title="Registrar Dispositivo"
        description="Registar una nuevo dispositivo."
      />
      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Serial :</span>
              </div>
              <Input placeholder="Ingresa serial" {...register("serial")} />
              {errors.serial?.message && <Error>{errors.serial.message}</Error>}
            </label>
            <label className="form-control w-full ml-2">
              <div className="label">
                <span className="label-text">Número Gsm :</span>
              </div>
              <Input placeholder="Ingresa chipgsm" {...register("chipgsm")} />
              {errors.chipgsm?.message && (
                <Error>{errors.chipgsm.message}</Error>
              )}
            </label>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Estado :</span>
              </div>
              <select
                className="select select-bordered"
                {...register("estado")}
              >
                {estadoDevice.map((p) => (
                  <option value={p.value}>{p.value}</option>
                ))}
              </select>
              {errors.estado?.message && <Error>{errors.estado.message}</Error>}
            </label>
            <label className="form-control w-full ml-2">
              <div className="label">
                <span className="label-text">Fecha de plan megas :</span>
              </div>
              <Input
                type="date"
                {...register("megas_fin", { valueAsDate: true })}
              />
              {errors.megas_fin?.message && (
                <Error>{errors.megas_fin.message}</Error>
              )}
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

export default CreateDeviceModal;
