import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Email, Text, Help, HelpIcon, Address, Telephone } from '../../../Form'

export default class Supervisor extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      SupervisorName: props.SupervisorName,
      Title: props.Title,
      Email: props.Email,
      Address: props.Address,
      Telephone: props.Telephone
    }
  }

  /**
   * Handle the change event.
   */
  handleFieldChange (field, event) {
    let value = event.target.value
    this.setState({ [field]: value }, () => {
      super.handleChange(event)
      this.doUpdate()
    })
  }

  doUpdate () {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        SupervisorName: this.state.SupervisorName,
        Title: this.state.Title,
        Email: this.state.Email,
        Address: this.state.Address,
        Telephone: this.state.Telephone
      })
    }
  }

  onUpdate (field, value) {
    this.setState({ [field]: value }, () => {
      this.doUpdate()
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  render () {
    return (
      <div>

        <h3>{i18n.t('history.employment.supervisor.heading.name')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.supervisor.name.help">
            <Text name="SupervisorName"
              className="text"
              {...this.props.SupervisorName}
              label={i18n.t('history.employment.supervisor.name.label')}
              onValidate={this.handleValidation}
              onUpdate={this.onUpdate.bind(this, 'SupervisorName')}
            />
            <HelpIcon className="name-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.supervisor.heading.title')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.supervisor.title.help">
            <Text name="Title"
              {...this.props.Title}
              className="text"
              label={i18n.t('history.employment.supervisor.title.label')}
              onUpdate={this.onUpdate.bind(this, 'Title')}
              onValidate={this.handleValidation}
            />
            <HelpIcon className="title-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.supervisor.heading.email')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.supervisor.email.help">
            <Email name="Email"
              {...this.props.Email}
              className="text"
              label={i18n.t('history.employment.supervisor.email.label')}
              onUpdate={this.onUpdate.bind(this, 'Email')}
              onValidate={this.handleValidation}
            />
            <HelpIcon className="email-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.supervisor.heading.address')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.supervisor.address.help">
            <Address name="Address"
              {...this.props.Address}
              label={i18n.t('history.employment.supervisor.address.label')}
              onUpdate={this.onUpdate.bind(this, 'Address')}
              onValidate={this.handleValidation}
            />
            <HelpIcon className="address-help-icon" />
          </Help>
        </div>

        <h3>{i18n.t('history.employment.supervisor.heading.telephone')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.employment.supervisor.telephone.help">
            <Telephone name="Telephone"
              {...this.props.Telephone}
              label={i18n.t('history.employment.supervisor.telephone.label')}
              onUpdate={this.onUpdate.bind(this, 'Telephone')}
              onValidate={this.handleValidation}
            />
            <HelpIcon className="telephone-help-icon" />
          </Help>
        </div>
      </div>
    )
  }
}
