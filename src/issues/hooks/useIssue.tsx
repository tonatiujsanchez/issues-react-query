
import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api"

import { sleep } from "../../helpers"

import { Issue } from "../interface"




const getIssue = async( numberIssue:string ):Promise<Issue> => {
    await sleep(2)
    const { data } = await githubApi<Issue>(`/issues/${numberIssue}`)    
    console.log(data)
    
    return data
}

export const useIssue = ( numberIssue:string ) => {
    
    const issueQuery = useQuery({
        queryKey: ['issue', numberIssue],
        queryFn: ()=> getIssue( numberIssue )
    })
    
    return {
        issueQuery
    }
}
