

import { getPositionLastFn } from "@/services";
import { useQuery } from "react-query";
import Loader from "../Loader";
import { difDateNow, toStr } from "@/libs/format";
import { LoaderTiny } from "../LoaderTiny";


interface Props {
    id: string;
}
const LastPost = ({ id }: Props) => {

    const { isLoading, isError, data } = useQuery({
        queryKey: ['lastposition', id],
        queryFn: async () => getPositionLastFn(id)
    }
    );


    if (isLoading) return <LoaderTiny />
    if (isError) return <h1>algo salio mal</h1>

    return (

        <div>
            {
                data ?
                    <div className="">
                        <div >Ultima conexion :</div>
                        <div className="badge badge-success gap-2">
                            {difDateNow(new Date(data.date))}
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>
                        </div>

                        <div className="gap-2">
                            {toStr(data.date)}
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 14V16H6V14H8ZM18 14V16H10V14H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg>

                        </div>
                    </div>
                    :
                    <div className="skeleton w-12 h-12"></div>
            }
        </div>

    );
}

export default LastPost;