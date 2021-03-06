import React from 'react'
import { mount } from 'enzyme'
import ApoFpo from './ApoFpo'

describe('The ApoFpo component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<ApoFpo name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input#' + expected.name).simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
