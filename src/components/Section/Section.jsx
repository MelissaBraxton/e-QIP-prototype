import React from 'react'
import { updateTitle } from '../../actions/SectionActions'
import AuthenticatedView from '../../views/AuthenticatedView'
import Identification from './Identification'
import OtherNamesUsed from './OtherNamesUsed'
import Identifying from './Identifying'
import { push } from '../../middleware/history'
import { SectionView, SectionViews } from './SectionView'

// Mapping section identifiers to the associated components.
const sectionMap = {
  'identification': {
    'title': 'Identification',
    'render': (subsection) => { return (<Identification subsection={subsection} />) }
  },
  'othernames': {
    'title': 'Other Names Used',
    'render': (subsection) => { return (<OtherNamesUsed subsection={subsection} />) }
  },
  'identifying': {
    'title': 'Your Identifying Information',
    'render': (subsection) => { return (<Identifying subsection={subsection} />) }
  }
}

class Section extends React.Component {

  /**
   * Used when routes are updated and render is called for different sections. On initial page load,
   * the componentDidMount() is rendered. However, subsequent path changes trigger componentWillReceiveProps()
   */
  componentWillReceiveProps (updatedProps) {
    var sec = this.section(updatedProps.section)
    this.props.dispatch(updateTitle(sec.title))
  }

  componentDidMount () {
    var sec = this.section(this.props.section)
    this.props.dispatch(updateTitle(sec.title))
  }

  section (section) {
    return sectionMap[section] || sectionMap['identification']
  }

  /**
   * Provides the appropriate section to render. Defaults to `identification`.
   */
  getSection () {
    var sec = this.section(this.props.section)
    return sec.render(this.props.subsection)
  }

  render () {
    return (
      <SectionViews current={this.props.section} dispatch={this.props.dispatch}>
        <SectionView name="identification">
          <Identification subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="othernames">
          <OtherNamesUsed subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="identifying">
          <Identifying subsection={this.props.subsection} />
        </SectionView>
      </SectionViews>
    )
  }
}

export default AuthenticatedView(Section)