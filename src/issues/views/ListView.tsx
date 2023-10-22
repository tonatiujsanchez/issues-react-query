import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../../api'

import { IssueList } from '../components/IssueList'
import { LabelPicker } from '../components/LabelPicker'

import { Label } from '../interface'


const getLabels = async():Promise<Label[]> => {
  const { data } = await githubApi<Label[]>('/labels')
  return data
}

export const ListView = () => {

  
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    refetchOnWindowFocus: false,  
  })




  return (
    <div className="row mt-5">
      
      <div className="col-8">
        <IssueList />
      </div>
      
      <div className="col-4">
        <LabelPicker />
      </div>
    </div>
  )
}
