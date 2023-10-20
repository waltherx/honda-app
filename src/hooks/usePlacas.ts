import { useState, useEffect } from 'react';
import { getAllPlacas } from '@/services/motoApi'
import { MotoData } from '@/types';

const usePlacas = () => {
    const [data, setData] = useState<MotoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const responseData = await getAllPlacas();
                console.log(responseData);
                if (isMounted) {
                    setData(responseData);
                    setLoading(false);
                }
            } catch (error:any) {
                if (isMounted) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        if (loading) {
            fetchData();
        }

        return () => {
            isMounted = false; // Marcamos el componente como desmontado al salir del useEffect
        };
    }, [loading]);

    return { data, loading, error };
};

export default usePlacas;
