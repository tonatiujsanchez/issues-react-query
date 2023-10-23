import { FC } from 'react'

import { Loading } from "../../shared/components"
import { useLabels } from "../hooks"



interface Props {
  selectedLabels: string[] 
  onChange: (label: string) => void 
}

export const LabelPicker:FC<Props> = ({ selectedLabels, onChange }) => {

  const { labelsQuery } = useLabels()

  if( labelsQuery.isLoading ){
    return (
      <Loading />
    )
  }
  
  return (
    <div>
      {
        labelsQuery.data?.map( label => (
          <span
            key={ label.id } 
            className={`badge rounded-pill m-1 label-picker ${ selectedLabels.includes( label.name ) ? 'label-active': '' }`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={ ()=> onChange( label.name ) }
          >
              { label.name }
          </span>
        ))
      }
        
    </div>
  )
}
