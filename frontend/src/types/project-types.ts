enum ProjectType {
  audit = 'audit',
  evaluation = 'evaluation',
  evaluation_study = 'evaluation_study',
  horizontal_evaluation = 'horizontal_evaluation',
  oag_audit = 'oag_audit',
  audit_review = 'audit_review',
  opo_audit = 'opo_audit',
  psc_audit = 'psc_audit',
  scoping_exercise = 'scoping_exercise',
  other = 'other'
}

const projectTypeLabelMap = {
  [ProjectType.audit]: 'Audit',
  [ProjectType.evaluation]: 'Evaluation',
  [ProjectType.evaluation_study]: 'Evaluation Study',
  [ProjectType.horizontal_evaluation]: 'Horizontal Evaluation',
  [ProjectType.oag_audit]: 'OAG Audit',
  [ProjectType.audit_review]: 'Audit Review',
  [ProjectType.opo_audit]: 'OPO Audit',
  [ProjectType.psc_audit]: 'PSC Audit',
  [ProjectType.scoping_exercise]: 'Scoping Exercise',
  [ProjectType.other]: 'Other'
}

export { ProjectType, projectTypeLabelMap }
