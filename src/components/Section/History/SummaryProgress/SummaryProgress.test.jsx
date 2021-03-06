import React from 'react'
import { mount } from 'enzyme'
import SummaryProgress from './SummaryProgress'

describe('The SummaryProgress component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'summary',
      List: () => {}
    }
    const component = mount(<SummaryProgress {...expected} />)
    expect(component.find('.progress').length).toEqual(1)
    expect(component.find('.filled').length).toEqual(0)
  })

  it('can display filled progress', () => {
    const expected = {
      name: 'summary',
      List: () => {
        return [
          {
            to: new Date(),
            from: new Date(new Date() - 2)
          },
          {
            to: new Date(new Date() - 6),
            from: new Date(new Date() - 12)
          }
        ]
      }
    }
    const component = mount(<SummaryProgress {...expected} />)
    expect(component.find('.progress').length).toEqual(1)
    expect(component.find('.filled').length).toEqual(2)
  })
})
