const navigation = [
  {
    name: 'Information about you',
    title: 'Information about you',
    url: 'identification',
    subsections: [
      { name: 'Full name', url: 'name' },
      { name: 'Other names used', url: 'othernames' },
      { name: 'Birth date', url: 'birthdate' },
      { name: 'Birth place', url: 'birthplace' },
      { name: 'Contacts', url: 'contacts' },
      { name: 'Social security number', url: 'ssn' },
      { name: 'Physical attributes', url: 'physical' },
      { hidden: true, name: 'Psychological and emotional health', url: 'psychological' }
    ]
  },
  {
    name: 'Financial record',
    title: 'Financial record',
    url: 'financial',
    subsections: [
      { name: 'Gambling debt', url: 'gambling' },
      { name: 'Bankruptcy', url: 'bankruptcy' },
      { hidden: true, name: 'Taxes', url: 'taxes' },
      { hidden: true, name: 'Employer card abuse', url: 'card' },
      { hidden: true, name: 'Credit counseling', url: 'credit' },
      { hidden: true, name: 'Deliquent payments', url: 'deliquent' },
      { hidden: true, name: 'Non-payment consequence', url: 'nonpayment' }
    ]
  },
  {
    name: 'Family & friends',
    title: 'Family & friends',
    url: 'family',
    hidden: true,
    subsections: [
      { name: 'Marital status', url: 'marital' },
      { name: 'People who know you well', url: 'friends' },
      { name: 'Relatives', url: 'relatives' }
    ]
  },
  {
    name: 'Citizenship',
    title: 'Citizenship',
    url: 'citizenship',
    hidden: true,
    subsections: [
      { name: 'Citizenship Status', url: 'status' },
      { name: 'Dual/Multiple Citizenship', url: 'multiple' }
    ]
  },
  {
    name: 'Military history',
    title: 'Military history',
    url: 'military',
    hidden: true,
    subsections: [
      { name: 'Selective Service Record', url: 'selective' },
      { name: 'Military history details', url: 'history' }
    ]
  },
  {
    name: 'Your history',
    title: 'Your history',
    url: 'history',
    hidden: true,
    subsections: [
      { name: 'Places lived', url: 'residence' },
      { name: 'Employment', url: 'employment' },
      { name: 'Schools & diplomas', url: 'education' },
      { hidden: true, name: 'Timeline', url: 'timeline' },
      { hidden: true, name: 'Former federal service', url: 'federal' },
      { hidden: true, name: 'Employment record', url: 'employment' }
    ]
  },
  {
    name: 'Foreign activities',
    title: 'Foreign activities',
    url: 'foreign',
    subsections: [
      { name: 'U.S. passport information', url: 'passport' },
      { hidden: true, name: 'Foreign contacs', url: 'contacts' },
      { hidden: true, name: 'Foreign activities', url: 'activities' },
      { hidden: true, name: 'Foreign business, professional activities, and government contacts', url: 'business' },
      { hidden: true, name: 'Foreign countries you have visited', url: 'travel' }
    ]
  },
  {
    name: 'TBD', // Recreation
    title: 'TBD',
    url: 'tbd',
    hidden: true,
    subsections: [
      { name: 'Illegal use of drugs and drug activity', url: 'drugs' },
      { name: 'Use of alcohol', url: 'alcohol' }
    ]
  },
  {
    name: 'Investigative and criminal history',
    title: 'Investigative and criminal history',
    url: 'legal',
    hidden: true,
    subsections: [
      { name: 'Police record', url: 'police' },
      { name: 'Involvement in non-criminal court actions', url: 'court' },
      { name: 'Investigations and clearance record', url: 'investigations' },
      { name: 'Financial record', url: 'financial' },
      { name: 'Use of information technology systems', url: 'technology' },
      { name: 'Association record', url: 'associations' }
    ]
  }
]

export default navigation
