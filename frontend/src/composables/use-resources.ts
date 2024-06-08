import { useSupabase } from './use-supabase';

const useResources = () => {
  const getAll = async () => {
    const supabase = useSupabase();
    const { data, error } = await supabase.from('resources').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  return { getAll }
}

export { useResources}
