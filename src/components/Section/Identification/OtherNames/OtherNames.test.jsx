import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import OtherNames from './OtherNames'
import { mount } from 'enzyme'

describe('The other names section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('has no names initially', () => {
    const store = mockStore({ authentication: [] })
    const component = mount(<Provider store={store}><OtherNames /></Provider>)
    expect(component.find('input#first').length).toEqual(0)
  })

  it('displays fields when "yes" is selected', () => {
    const store = mockStore({
      authentication: [],
      application: {}
    })
    const expected = {
      HasOtherNames: 'Yes'
    }
    const component = mount(<Provider store={store}><OtherNames {...expected} /></Provider>)
    expect(component.find('input#first').length).toEqual(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const store = mockStore({
      authentication: [],
      application: {}
    })
    const expected = {
      HasOtherNames: 'No'
    }
    const component = mount(<Provider store={store}><OtherNames {...expected} /></Provider>)
    expect(component.find('input#first').length).toEqual(0)
  })
})
