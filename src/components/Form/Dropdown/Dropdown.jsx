import React from 'react'
import ValidationElement from '../ValidationElement'
import ReactMarkdown from 'react-markdown'
import Autosuggest from 'react-autosuggest'

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = (suggestion, search) => {
  let text = `${suggestion.name}`

  // If the value is different than the name then display that
  // as well
  if (suggestion.name !== suggestion.value) {
    text += ` (${suggestion.value})`
  }

  // Highlight what was matched
  if (search.query) {
    let rx = new RegExp(search.query, 'ig')
    if (rx.test(text)) {
      let lastIndex = rx.lastIndex
      let firstIndex = lastIndex - search.query.length
      text = text.slice(0, lastIndex) + '**' + text.slice(lastIndex + Math.abs(0))
      text = text.slice(0, firstIndex) + '**' + text.slice(firstIndex + Math.abs(0))
    }
  }

  return (
    <div>
      <ReactMarkdown source={text} />
    </div>
  )
}

export default class Dropdown extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value || '',
      options: [],
      suggestions: [],
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }

    this.onSuggestionChange = this.onSuggestionChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
  }

  componentDidMount () {
    if (this.props.children) {
      let arr = []
      for (let child of this.props.children) {
        if (child && child.type === 'option') {
          arr.push({
            name: child.props.children || '',
            value: child.props.value
          })
        }
      }

      this.setState({options: arr})
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    // let valid = true
    // if (this.props.required) {
    //   if (event.target.value === '') {
    //     valid = false
    //   }
    // }

    // this.setState({value: event.target.value, error: !valid, valid: valid}, () => {
    //   super.handleChange(event)
    // })

    this.setState({value: event.target.value}, () => {
      super.handleChange(event)
    })
  }

  handleValidation (event, status, errorCodes) {
    let value = this.state.value
    let valid = value.length > 0 ? false : null
    this.state.options.forEach(x => {
      if (x.name.toLowerCase() === value.toLowerCase()) {
        valid = true
        value = x.name
      }
    })

    if (valid === false) {
      errorCodes = 'notfound'
    }

    this.setState({
      value: value,
      error: valid === false,
      valid: valid === true
    },
    () => {
      const e = { [this.props.name]: errorCodes }
      super.handleValidation(event, status, e)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    event.persist()
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    event.persist()
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  getSuggestions (value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : this.state.options.filter(opt => opt.name.toLowerCase().slice(0, inputLength) === inputValue || opt.value.toLowerCase().slice(0, inputLength) === inputValue)
  }

  onSuggestionChange (event, change) {
    let e = {
      ...event,
      target: {
        id: this.props.name,
        value: change.newValue
      }
    }
    this.setState({value: change.newValue}, () => {
      super.handleChange(e)
    })
  }

  onSuggestionsFetchRequested (query) {
    this.setState({
      suggestions: this.getSuggestions(query.value)
    })
  }

  onSuggestionsClearRequested (value) {
    this.setState({
      suggestions: []
    })
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = this.props.className || ''
    klass += ' dropdown'

    if (this.state.error) {
      klass += ' usa-input-error'
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

    return klass.trim()
  }

  render () {
    const inputProps = {
      value: this.state.value,
      className: this.inputClass(),
      id: this.props.name,
      name: this.props.name,
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      pattern: this.props.pattern,
      readOnly: this.props.readOnly,
      onChange: this.onSuggestionChange,
      onBlur: this.handleBlur
    }

    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <Autosuggest suggestions={this.state.suggestions}
                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps}
                     />
      </div>
    )
  }
}
