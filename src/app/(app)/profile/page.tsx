"use client";
import { SimpleLoading } from "@/components/SimpleLoading";
import { toStr } from "@/libs/format";
import { getUserInfo } from "@/libs/localStorage";
import { perfilFn } from "@/services/authApi";
import { UserData } from "@/types";
import { useQuery } from "react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import Avatar from "boring-avatars";

export default function Page() {
  const [perfil, setPerfil] = useState<UserData>();

  useEffect(() => {
    setPerfil(getUserInfo());
  }, []);

  const val = perfil?.id;

  const {
    isLoading,
    error,
    data: userPerfil,
  } = useQuery<UserData, Error>({
    queryKey: ["perfil", val],
    queryFn: () => perfilFn(val ? val.toString() : ""),
  });

  if (error) return <div>error al cargar datos..☠️</div>;
  if (isLoading) return <SimpleLoading />;

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>Perfil</li>
        </ul>
      </div>
      <div className="card">
        <div className="card-body">
          {perfil && userPerfil ? (
            <>
              <div className="w-full h-screen bg-base-200 px-10 pt-10 shadow rounded-lg ">
                <div className="relative mt-16 mb-32 max-w-sm mx-auto">
                  <div className="rounded overflow-hidden shadow-md bg-base-100 ">
                    <div className="absolute -mt-20 w-full flex justify-center">
                      <div className="h-32 w-32">
                        <Avatar
                          name={userPerfil.username}
                          variant="beam"
                          size={128}
                          colors={["#333", "#cc0000"]}
                        />
                      </div>
                    </div>
                    <div className="px-6 mt-16">
                      <h1 className="font-bold text-3xl text-center mb-1">
                        {userPerfil?.realname}
                      </h1>
                      <p className="text-gray-800 text-sm text-center">
                        {userPerfil?.username}
                      </p>
                      <p className="text-center text-gray-600 text-base pt-3 font-normal">
                        Correo: {userPerfil?.email}
                      </p>
                      <p className="text-center text-gray-600 text-base pt-3 font-normal">
                        Telefono: {userPerfil.phone}
                      </p>
                      <div className="w-full flex justify-center pt-5 pb-5">
                        {toStr(userPerfil.created_at + "")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
            </>
          ) : (
            <SimpleLoading />
          )}
        </div>
      </div>
    </>
  );
}
