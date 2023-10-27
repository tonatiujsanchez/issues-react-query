import { useState } from 'react'

import { useIssues, useIssuesInfiniteScroll } from '../hooks'

import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'
import { Loading } from '../../shared/components'

import { State } from '../interface'


export const ListViewInfiniteScroll = () => {


  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()

  const { issuesQuery } = useIssuesInfiniteScroll({ state, labels: selectedLabels })

  const onChangeLabel= (label: string) => {
      ( selectedLabels.includes(label) )
        ? setSelectedLabels( selectedLabels.filter( labelState => labelState !== label ) )
        : setSelectedLabels([ ...selectedLabels, label ])
  }

  return (
    <div className="row mt-5 mb-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
          ? ( <Loading /> )
          : ( 
            <IssueList
              issues={ issuesQuery.data?.pages.flat() || [] }
              state={ state }
              onStateChange = { ( newState?:State )=> setState( newState ) }
            />
          )
        }
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            onClick={ ()=> issuesQuery.fetchNextPage() } 
            disabled={ issuesQuery.isFetching || !issuesQuery.hasNextPage}
            className="btn btn-primary"
          >
            Load more
          </button>
        </div>
      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabels={ selectedLabels }
          onChange={ onChangeLabel }
        />
      </div>
    </div>
  )
}
