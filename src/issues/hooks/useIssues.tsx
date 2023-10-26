import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../../api'
import { sleep } from '../../helpers'

import { Issue, State } from '../interface'


interface Props {
    state?: State
    labels: string[]
    page? : number
}


const getIssues = async({ labels, state, page=1 }:Props):Promise<Issue[]> => {

    await sleep(2)
    const params = new URLSearchParams()

    if( state ){
        params.append('state', state)
    }

    if ( labels.length > 0 ) {
        const labelsString = labels.join(',')
        params.append('labels', labelsString)
    }

    params.append('page', page.toString())
    params.append('per_page', '5')

    const { data } = await githubApi<Issue[]>('/issues', { params })
    return data
}


export const useIssues = ({ state, labels }:Props) => {

    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)    
    }, [state, labels])
    

    const issuesQuery = useQuery({
        queryKey: ['issues', { state, labels, page }],
        queryFn: ()=> getIssues({ labels, state, page }),
        // refetchOnWindowFocus: false, //Deshabilita que realice una petición cada vez que se regresa el foco a la aplicación

    })

    const nextPage = () => {
        if( issuesQuery.data?.length === 0 ){ return }
        setPage( page + 1 )    
    }

    const prevPage = () => {
        if( page <= 1 ){ return }
        setPage( page - 1 )
    }
    

    return {
        // Properties
        issuesQuery,

        // Getter
        page: issuesQuery.isFetching ? '' : page ,

        // Methods
        nextPage,
        prevPage
    }
}
