import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Radio extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: super.guid(),
      checked: props.checked,
      disabled: props.disabled,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      native: props.native || false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      checked: newProps.checked
    })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    this.setState({checked: event.target.checked}, () => {
      super.handleChange(event)
    })
  }

  /**
   * Handle the click event.
   */
  handleClick (event) {
    let futureChecked = !this.state.checked
    let futureValue = futureChecked ? this.props.value : ''
    this.setState({checked: futureChecked, value: futureValue})
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

  handleValidation (event, status, errors) {
    event.persist()
    super.handleValidation(event, {[this.props.name]: { status: true }}, errors)
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = ''
    if (!this.props.native) {
      klass = 'eapp-blocks-radio'
    }

    if (this.state.error) {
      klass += ' usa-input-error'
    }

    if (this.props.className) {
      klass += ` ${this.props.className}`
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-label'
    }

    if (this.state.checked) {
      klass += ' checked'
    }

    if (this.state.focus) {
      klass += ' usa-input-focus'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass () {
    let klass = ''

    if (this.state.focus) {
      klass += ' usa-input-focus'
    }

    if (this.state.valid) {
      klass += ' usa-input-success'
    }

    if (this.state.checked) {
      klass += ' selected'
    }

    return klass.trim()
  }

  render () {
    if (this.props.native) {
      return (
        <div className={this.divClass()}>
          <input className={this.inputClass()}
                 id={this.state.uid}
                 name={this.props.name}
                 type="radio"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 onClick={this.handleClick}
                 checked={this.state.checked}
                 />
          <label htmlFor={this.state.uid}>
            {this.props.label}
            {this.props.children}
          </label>
        </div>
      )
    }

    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.state.uid}>
          <input className={this.inputClass()}
                 id={this.state.uid}
                 name={this.props.name}
                 type="radio"
                 disabled={this.props.disabled}
                 readOnly={this.props.readonly}
                 value={this.state.value}
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
                 onBlur={this.handleBlur}
                 onClick={this.handleClick}
                 checked={this.state.checked}
                 />
          {this.props.children}
          <span>{this.props.label}</span>
        </label>
      </div>
    )
  }
}
