"use client"
import { Button } from "@/components/Button";
import { Error } from "@/components/Error";
import { Input } from "@/components/Input";
import { Toast } from "@/components/Toast";
import { getUserInfo, setAccessToken } from "@/libs/localStorage";
import { login } from "@/services";
import { useAuthStore } from "@/stores/auth/auth.store";
import { useStore } from "@/stores/positions/positions.store";
import { LoginPayload, LoginResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as z from "zod";

const Page = () => {
  const { user, setUser } = useStore();

  const loginUser = useAuthStore(state => state.loginUser)

  const router = useRouter();

  const schema = z.object({
    username: z.string().min(5),
    password: z.string().min(4),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation(login, {
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("User", JSON.stringify(getUserInfo()));
      setUser(getUserInfo() ?? null);
      reset();
      toast(<Toast text={"Bienvenido 🤗"} />);
      router.push("/");
    },
    onError: (data) => {
      toast(<Toast text={"Credenciales no validos 😟"} />);
    },
  });

  const onSubmit = handleSubmit(async (data: LoginPayload) => {
    try {
      const { username, password } = data;
      mutation.mutate(data);
      loginUser(username, password)
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <Image src="/honda.png" alt="honda" width={30} height={30} />
          <div className="devider py-1"></div>
          <h2 className="card-title">Inicia Sesión</h2>
          <div className="card-actions">
            <form
              className="grid grid-flow-row auto-rows-max"
              onSubmit={onSubmit}
            >
              <Input
                placeholder="Username"
                type="text"
                {...register("username")}
              />
              {errors.username?.message && (
                <Error>{errors.username.message}</Error>
              )}
              <div className="devider py-1"></div>
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password?.message && (
                <Error>{errors.password.message}</Error>
              )}
              <div className="devider py-1"></div>
              <Button
                disabled={mutation.isLoading ? true : false}
                variant="primary"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
