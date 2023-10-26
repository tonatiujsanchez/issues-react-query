import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { getIssue, getIssueComments } from '../hooks'
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi'

import { timeSince } from '../../helpers'
import { Issue, State } from '../interface'

interface Props {
    issue: Issue
}

export const IssueItem:FC<Props> = ({ issue }) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const onPrefetchData = () => {
        queryClient.prefetchQuery({
            queryKey: ["issue", `${ issue.number }`],
            queryFn: ()=> getIssue( `${ issue.number }` )
        })
        
        queryClient.prefetchQuery({
            queryKey: ["issueComments", `${ issue.number }`, "comments"],
            queryFn: ()=> getIssueComments( `${ issue.number }` ),
        })
    }

    const onPreSetData = () => {
        queryClient.setQueryData(
            ["issue", `${ issue.number }`],
            ()=> issue,
            {
                updatedAt: new Date().getTime() + 100000
            }
        )
    }

    return (
        <div 
            className="card mb-2 issue"
            onClick={ ()=> navigate(`/issues/issue/${ issue.number }`) }
            // onMouseEnter={ onPrefetchData }
            onMouseEnter={ onPreSetData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Closed
                    ?( <FiCheckCircle 
                        style={{ minWidth: '30px' }} 
                        size={30} 
                        color="green" /> 
                     )
                    :( <FiInfo 
                        style={{ minWidth: '30px' }} 
                        size={30} 
                        color="red" />
                    )
                }
                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ issue.title }</span>
                    <span className="issue-subinfo">#{ issue.number } opened { timeSince( issue.created_at ) } by <span className='fw-bold'>{ issue.user.login }</span></span>
                    <div>
                        {
                            issue.labels.map( label => (
                                <span 
                                    key={ label.id }
                                    className="badge rounded-pill m-1"
                                    style={{ 
                                        border: `1px solid #${label.color}`, 
                                        color: `#333`, 
                                        background: `#${ label.color }26` 
                                    }}
                                >
                                    { label.name }
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={ issue.user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
