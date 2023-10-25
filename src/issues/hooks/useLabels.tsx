
import { useQuery } from '@tanstack/react-query'
import { githubApi } from "../../api"

import { sleep } from '../../helpers'
import { Label } from "../interface"


const getLabels = async():Promise<Label[]> => {

    await sleep(2)
    
    const { data } = await githubApi<Label[]>('/labels?per_page=100')
    return data
}
  

export const useLabels = () => {
    
    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        // refetchOnWindowFocus: false, //Deshabilita que realice una petición cada vez que se regresa el foco a la aplicación
        // staleTime: 1000 * 60 * 60,       //Establece por cuanto tiempo la data esta marcada como 'fresca'.
        // initialData: [],
        placeholderData: [
            {
                id:791921801,
                node_id:"MDU6TGFiZWw3OTE5MjE4MDE=",
                url:"https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
                name:"❤️",
                color:"ffffff",
                default:false,
            },
            {
                id:717031390,
                node_id:"MDU6TGFiZWw3MTcwMzEzOTA=",
                url:"https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
                name:"good first issue",
                color:"6ce26a",
                default:true,
            }
        ]
    })

    return {
        labelsQuery
    }
}
