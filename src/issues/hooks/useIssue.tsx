
import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api"

import { sleep } from "../../helpers"

import { Issue } from "../interface"




export const getIssue = async( numberIssue:string ):Promise<Issue> => {
    await sleep(2)
    const { data } = await githubApi<Issue>(`/issues/${numberIssue}`)    
    return data
}

export const getIssueComments = async( numberIssue:string ):Promise<Issue[]> => {
    await sleep(2)
    const { data } = await githubApi<Issue[]>(`/issues/${numberIssue}/comments`)    
    return data
}

export const useIssue = ( numberIssue:string ) => {
    
    const issueQuery = useQuery({
        queryKey: ['issue', numberIssue],
        queryFn: ()=> getIssue( numberIssue )
    })

    const issueCommentsQuery = useQuery({
        queryKey: ['issueComments', numberIssue, 'comments'],
        queryFn: ()=> getIssueComments( `${ issueQuery.data!.number }` ),
        enabled: issueQuery.data !==  undefined 
    })
    
    return {
        issueQuery,
        issueCommentsQuery
    }
}
