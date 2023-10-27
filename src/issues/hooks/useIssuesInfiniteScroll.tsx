import { QueryKey, useInfiniteQuery } from "@tanstack/react-query"
import { githubApi } from "../../api"
import { sleep } from "../../helpers"

import { Issue, State } from "../interface"


interface Props {
    state?: State
    labels: string[]
    page? : number
}

interface QueryProps {
    querykey  : QueryKey
    pageParam: unknown;

}

const getIssues = async({ pageParam=1, querykey }:QueryProps):Promise<Issue[]> => {

    const [,,args] = querykey
    const { state, labels } = args as Props

    // await sleep(2)
    const params = new URLSearchParams()

    if( state ){
        params.append('state', state)
    }

    if ( labels.length > 0 ) {
        const labelsString = labels.join(',')
        params.append('labels', labelsString)
    }

    params.append('page', (pageParam as number).toString())
    params.append('per_page', '5')

    const { data } = await githubApi<Issue[]>('/issues', { params })
    return data
}


export const useIssuesInfiniteScroll = ({ state, labels }: Props) => {
    
    const issuesQuery = useInfiniteQuery<Issue[], Props>({
        queryKey:['issues', 'infinite', { state, labels }],
        queryFn: ( data )=>getIssues({ pageParam: data.pageParam, querykey: data.queryKey }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) =>{
            if( lastPage.length === 0 ){
                return
            }
            return pages.length + 1
        },
        // getPreviousPageParam: () =>{},
      })
    
    return {
        issuesQuery
    }
}
