"use client"

import { getRoleFn } from "@/services/userApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { RoleData } from "@/types"

const Role = ({ params, }: {
    params: { id: string };
}) => {

    const [roleId, setRoleId] = useState<string>(params.id);
    const {
        data: role } = useQuery<RoleData, Error>({ queryKey: ["role", roleId], queryFn: () => getRoleFn(roleId) });

    return (
        <>
            {role ?
                <div className="badge badge-primary">
                    {role.name}
                </div>
                : <Skeleton />
            }
        </>
    );

}

export default Role;


