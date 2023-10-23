import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api"
import { Issue } from "../interface"



const getIssues = async():Promise<Issue[]> => {
    const { data } = await githubApi<Issue[]>('/issues')
    console.log(data)
    return data
}


export const useIssues = () => {

    const issuesQuery = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues,
        // refetchOnWindowFocus: false, //Deshabilita que realice una petición cada vez que se regresa el foco a la aplicación

    })
    

    return {
        issuesQuery
    }
}
