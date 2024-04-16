import { getDevices } from "@/actions/devices/get-devices"

const Page = async () => {
    const dato = await getDevices()

    return (
        <div>
            {
                dato.map((dev) => (
                    <div>
                        <h1 key={dev.id}>{dev.id}</h1>
                        <p>{dev.serial}</p>
                    </div>))
            }
        </div>
    )
}

export default Page;