import { ProjectStatus } from '@/types/project-status';
import {useSupabase} from "@/composables/use-supabase"

const useProjects = () => {
  const getProjectStatusBadge = (status: ProjectStatus) => {
    const statusColorMap = {
      [ProjectStatus.planned]: 'info',
      [ProjectStatus.active]: 'info',
      [ProjectStatus.on_hold]: 'warning',
      [ProjectStatus.delayed]: 'warning',
      [ProjectStatus.completed]: 'success',
      [ProjectStatus.cancelled]: 'error',
      [ProjectStatus.in_review]: 'warning',
      [ProjectStatus.pending_approval]: 'warning',
      [ProjectStatus.not_started]: 'gray',
    };

    return statusColorMap[status];
  };

  const getProjectTypes = async () => {
    const supabase = useSupabase();
    const { data, error } = await supabase.from('project_types').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };


  return { getProjectStatusBadge, getProjectTypes };
}

export { useProjects}
