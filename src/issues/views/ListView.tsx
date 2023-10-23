import { useState } from 'react'

import { useIssues } from '../hooks'

import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'
import { Loading } from '../../shared/components'


export const ListView = () => {


  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const { issuesQuery } = useIssues()

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
          : ( <IssueList issues={ issuesQuery.data! } /> )
        }
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
