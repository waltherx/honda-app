import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Title } from "@/components/Title";
import { motoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

type Props = {
  onClose?: () => void;
};

const CreateMotoModal = ({ onClose }: Props) => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.TypeOf<typeof motoSchema>>({
    resolver: zodResolver(motoSchema),
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
      <Title title="Registrar Moto" description="Registar una nueva moto." />
      <form onSubmit={onSubmit}>
        <div className="mt-2">
          <div className="flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Placa :</span>
              </div>
              <Input placeholder="Ingresa placa" {...register("placa")} />
              {errors.placa?.message && <Error>{errors.placa.message}</Error>}
            </label>
            <label className="form-control w-full ml-2">
              <div className="label">
                <span className="label-text">Modelo :</span>
              </div>
              <Input placeholder="Ingresa modelo" {...register("modelo")} />
              {errors.modelo?.message && <Error>{errors.modelo.message}</Error>}
            </label>
          </div>
        </div>

        <div className="mt-1">
          <div className="flex">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Marca :</span>
              </div>
              <select className="select select-bordered" {...register("marca")}>
                <option value="">Honda</option>
                <option value="">Hero</option>
                <option value="">KTM</option>
                <option value="">Vespa</option>
                <option value="">Honda</option>
              </select>
              {errors.marca?.message && <Error>{errors.marca.message}</Error>}
            </label>
            <label className="form-control w-full ml-2">
              <div className="label">
                <span className="label-text">Litro por Km :</span>
              </div>
              <Input
                type="number"
                placeholder="Ingresa litro po Km"
                {...register("litrokm", { valueAsNumber: true })}
              />
              {errors.litrokm?.message && (
                <Error>{errors.litrokm.message}</Error>
              )}
            </label>
            <label className="form-control w-full ml-2">
              <div className="label">
                <span className="label-text">Estado :</span>
              </div>
              <Input placeholder="Ingresa estado" {...register("estado")} />
              {errors.estado?.message && <Error>{errors.estado.message}</Error>}
            </label>
          </div>
        </div>

        <div className="mt-1">
          <div className="flex">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Descripcion</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-36"
                placeholder="Ingresa descripcion"
                {...register("descripcion")}
              />
              {errors.descripcion?.message && (
                <Error>{errors.descripcion.message}</Error>
              )}
            </label>
            <div className="flex flex-col ml-2">
              <div className="form-control">
                <label className="w-full ml-2">
                  <div className="label">
                    <span className="label-text">Cliente :</span>
                  </div>
                  <Input
                    placeholder="Ingresa cliente"
                    {...register("client_id")}
                  />
                  {errors.client_id?.message && (
                    <Error>{errors.client_id.message}</Error>
                  )}
                </label>
              </div>
              <div className="form-control">
                <label className="w-full ml-2">
                  <div className="label">
                    <span className="label-text">Sucrusal :</span>
                  </div>
                  <Input
                    placeholder="Ingresa sucrusal"
                    {...register("sucrusal_id")}
                  />
                  {errors.sucrusal_id?.message && (
                    <Error>{errors.sucrusal_id.message}</Error>
                  )}
                </label>
              </div>
            </div>
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

export default CreateMotoModal;
