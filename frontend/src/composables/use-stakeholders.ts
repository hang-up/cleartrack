import { useSupabase } from './use-supabase'

const useStakeholders = () => {
  const getAll = async () => {
    const supabase = useSupabase()
    const { data, error } = await supabase.from('stakeholders').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  return { getAll }
}

export { useStakeholders }
