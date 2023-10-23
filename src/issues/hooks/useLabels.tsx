
import { useQuery } from '@tanstack/react-query'
import { githubApi } from "../../api"

import { sleep } from '../../helpers'
import { Label } from "../interface"


const getLabels = async():Promise<Label[]> => {

    await sleep(2)
    
    const { data } = await githubApi<Label[]>('/labels')
    return data
}
  

export const useLabels = () => {
    
    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        // refetchOnWindowFocus: false, //Deshabilita que realice una petición cada vez que se regresa el foco a la aplicación
        staleTime: 1000 * 60 * 60       //Establece por cuanto tiempo la data esta marcada como 'fresca'
    })

    return {
        labelsQuery
    }
}
