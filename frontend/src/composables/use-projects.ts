import { ProjectStatus } from '@/types/project-status'
import { useSupabase } from '@/composables/use-supabase'

const useProjects = () => {
  const getProjects = async () => {
    const supabase = useSupabase()

    const { data, error } = await supabase
      .from('projects')
      .select(
        '*,project_resource(resources(*)),project_stakeholder(stakeholders(*)),project_types(*),recommendations(*)'
      )
    if (error) {
      throw new Error(error.message)
    }
    // Go through every project and instantiate a date object for anything that has to do with a date
    return data.map((project: any) => {
      project.committee_presentation_date = new Date(project.committee_presentation_date)
      project.publication_date = new Date(project.publication_date)
      project.created_at = new Date(project.created_at)
      project.updated_at = new Date(project.updated_at)
      project.start_date = new Date(project.start_date)
      project.end_date = new Date(project.end_date)
      project.updated_at = new Date(project.updated_at)
      return project
    })
  }

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
      [ProjectStatus.not_started]: 'gray'
    }
    return statusColorMap[status]
  }

  const getProjectStatusLabel = (status: ProjectStatus) => {
    const statusLabelMap = {
      [ProjectStatus.planned]: 'Planned',
      [ProjectStatus.active]: 'Active',
      [ProjectStatus.on_hold]: 'On Hold',
      [ProjectStatus.delayed]: 'Delayed',
      [ProjectStatus.completed]: 'Completed',
      [ProjectStatus.cancelled]: 'Cancelled',
      [ProjectStatus.in_review]: 'In Review',
      [ProjectStatus.pending_approval]: 'Pending Approval',
      [ProjectStatus.not_started]: 'Not Started'
    }
    return statusLabelMap[status]
  }

  const getProjectTypes = async () => {
    const supabase = useSupabase()
    const { data, error } = await supabase.from('project_types').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }

  return {
    getProjectStatusBadge,
    getProjectStatusLabel,
    getProjectTypes,
    getProjects
  }
}

export { useProjects }
