import { useState } from 'react'

import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'
import { Label } from '../interface'


export const ListView = () => {


  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const onChangeLabel= (label: string) => {
      ( selectedLabels.includes(label) )
        ? setSelectedLabels( selectedLabels.filter( labelState => labelState !== label ) )
        : setSelectedLabels([ ...selectedLabels, label ])
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        <IssueList />
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
