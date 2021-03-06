import React from 'react'
import { mount } from 'enzyme'
import Gambling from './Gambling'

describe('The gambling component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'gambling'
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('input[type="radio"]').length).toEqual(2)
    expect(component.find('.selected').length).toEqual(0)
    expect(component.find('button.add').length).toEqual(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      HasGamblingDebt: 'Yes'
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('.losses').length).toEqual(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      HasGamblingDebt: 'No'
    }
    const component = mount(<Gambling {...expected} />)
    expect(component.find('.losses').length).toEqual(0)
  })
})
