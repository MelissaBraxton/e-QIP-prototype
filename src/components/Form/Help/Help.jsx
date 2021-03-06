import React from 'react'
import { i18n } from '../../../config'
import ReactMarkdown from 'react-markdown'
import ValidationElement from '../ValidationElement'

export default class Help extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      id: this.props.id,
      errors: [],
      active: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * Handle the click event.
   */
  handleClick (event) {
    this.setState({ active: !this.state.active }, () => {
      this.scrollIntoView()
    })
  }

  /**
   * Handle validation event.
   */
  handleValidation (event, status, errors) {
    if (!event) {
      return
    }

    let e = [...this.state.errors]
    if (!errors) {
      // Let's clean out what we current have stored for this target.
      let name = !event.target || !event.target.name ? 'input' : event.target.name
      e = this.cleanErrors(e, `.${name}.`)
    } else {
      let errorFlat = super.flattenObject(errors)

      if (errorFlat.endsWith('.')) {
        // If the error message ends with a period we can assume
        // it needs to be flushed of similar errors
        e = this.cleanErrors(e, errorFlat)
      } else {
        // Append this to the list of errors.
        let name = `${this.props.errorPrefix || ''}`
        if (!errorFlat.startsWith(name)) {
          errorFlat = `${name || 'input'}.${errorFlat}`
        }

        name = `error.${errorFlat}`
        if (!e.includes(name) && !name.endsWith('.')) {
          e.push(name)
        }
      }
    }

    this.setState({ errors: e }, () => {
      super.handleValidation(event, status, errors)
    })
  }

  /**
   * Clean up error message array on matching string
   */
  cleanErrors (old, remove) {
    let arr = []
    for (let err of old) {
      if (err.indexOf(remove) === -1 && !err.endsWith('.')) {
        arr.push(err)
      }
    }
    return arr
  }

  /**
   * Render the help and error messages allowing for Markdown syntax.
   */
  getMessages () {
    let el = []

    if (this.state.errors && this.state.errors.length) {
      const markup = this.state.errors.map(err => {
        return (
          <ReactMarkdown source={i18n.t(err)} />
        )
      })

      el.push(
        <div ref="message" className="message eapp-error-message">
          <i className="fa fa-exclamation"></i>
          {markup}
        </div>
      )
    }

    if (this.state.active) {
      el.push(
        <div ref="message" className="message eapp-help-message">
          <i className="fa fa-question"></i>
          <ReactMarkdown source={i18n.t(this.props.id)} />
        </div>
      )
    }

    return el
  }

  children () {
    return React.Children.map(this.props.children, (child) => {
      let extendedProps = {}

      if (child.type) {
        let what = Object.prototype.toString.call(child.type)
        if (what === '[object Function]' && child.type.name === 'HelpIcon') {
          extendedProps.onClick = this.handleClick
          extendedProps.active = this.state.active
        }
      }

      if (this.props.index) {
        extendedProps.index = this.props.index
      }

      if (this.props.onUpdate) {
        extendedProps.onUpdate = this.props.onUpdate
      }

      // Inject ourselves in to the validation callback
      extendedProps.onValidate = (event, status, errors) => {
        this.handleValidation(event, status, errors)
        if (child.props.onValidate) {
          child.props.onValidate(event, status, errors)
        }
      }

      return React.cloneElement(child, {
        ...child.props,
        ...extendedProps
      })
    })
  }

  /**
   * Checks if the children and help message are within the current viewport. If not, scrolls the
   * help message into view so that users can see the message without having to manually scroll.
   */
  scrollIntoView () {
    // Grab the bottom position for the help container
    const helpBottom = this.refs.help.getBoundingClientRect().bottom

    // Grab the current window height
    const winHeight = window.innerHeight

    // Flag if help container bottom is within current viewport
    const notInView = (winHeight < helpBottom)

    if (this.state.active && this.props.scrollIntoView && notInView) {
      this.refs.message.scrollIntoView(false)
    }
  }

  render () {
    const klass = `help ${this.props.className || ''}`.trim()
    return (
      <div className={klass} ref="help">
        {this.children()}
        {this.getMessages()}
      </div>
    )
  }
}

Help.defaultProps = {
  // Flag that allows a help message to be scrolled into view
  scrollIntoView: true
}
