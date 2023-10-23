import { Loading } from "../../shared/components"
import { useLabels } from "../hooks"

export const LabelPicker = () => {

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
            className="badge rounded-pill m-1 label-picker"
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          >
              { label.name }
          </span>
        ))
      }
        
    </div>
  )
}
