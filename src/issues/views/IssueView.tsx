import { Link, Navigate, useParams } from 'react-router-dom'
import { useIssue } from '../hooks'

import { IssueComment } from '../components/IssueComment'
import { Loading } from '../../shared/components'


export const IssueView = () => {


    const params = useParams()  
    const { id = '0' } = params

    const { issueQuery, issueCommentsQuery } = useIssue(id)

    if( issueQuery.isLoading ) {
        return (
            <div className="mt-4 mb-4">
                <Loading />
            </div>
        )
    }

    if( !issueQuery.data ) {
        return (
            <Navigate to={'./issues/list'} />
        )
    }

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <Link to='./issues/list'>Go Back</Link>
            </div>

            {/* Primer comentario */}
            <IssueComment issue={ issueQuery.data } />

            {/* Comentarios de otros */}
            {
                issueCommentsQuery.isLoading
                ?(
                    <div className="mt-4 mb-4">
                        <Loading />
                    </div>
                ):(
                    issueCommentsQuery.data?.map( issue => (
                        <IssueComment key={ issue.id } issue={ issue } />
                    ))
                )

            }
        </div>
    )
}
