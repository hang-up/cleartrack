enum ProjectStatus {
  planned = 'planned',
  active = 'active',
  on_hold = 'on_hold',
  delayed = 'delayed',
  completed = 'completed',
  cancelled = 'cancelled',
  in_review = 'in_review',
  pending_approval = 'pending_approval',
  not_started = 'not_started'
}

export const statusLabelMap = {
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

export { ProjectStatus }
