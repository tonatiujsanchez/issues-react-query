import { useState } from 'react'

import { useIssues } from '../hooks'

import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'
import { Loading } from '../../shared/components'

import { State } from '../interface'


export const ListView = () => {


  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()

  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, labels: selectedLabels })

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
              issues={ issuesQuery.data! }
              state={ state }
              onStateChange = { ( newState?:State )=> setState( newState ) }
            />
          )
        }
        <div className="d-flex mt-4 px-2 justify-content-between align-items-center">
          <button 
            onClick={ prevPage }
            disabled={ issuesQuery.isFetching }
            className="btn btn-outline-primary"
          >
            Previus
          </button>
          <span>{ page }</span>
          <button 
            onClick={ nextPage }
            disabled={ issuesQuery.isFetching }
            className="btn btn-outline-primary"
          >
            Next
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
