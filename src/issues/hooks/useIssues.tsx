import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api"
import { sleep } from "../../helpers"

import { Issue, State } from "../interface"


interface Props {
    state?: State
    labels: string[]
}


const getIssues = async( labels:string[] = [], state?:State ):Promise<Issue[]> => {

    
    await sleep(2)
    const params = new URLSearchParams()

    if( state ){
        params.append('state', state)
    }

    if ( labels.length > 0 ) {
        const labelsString = labels.join(',')
        params.append('labels', labelsString)
    }

    params.append('page', '1')
    params.append('per_page', '5')

    const { data } = await githubApi<Issue[]>('/issues', { params })
    return data
}


export const useIssues = ({ state, labels }:Props) => {

    const issuesQuery = useQuery({
        queryKey: ['issues', { state, labels }],
        queryFn: ()=> getIssues( labels, state ),
        // refetchOnWindowFocus: false, //Deshabilita que realice una petición cada vez que se regresa el foco a la aplicación

    })
    

    return {
        issuesQuery
    }
}
