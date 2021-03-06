import React from 'react'
import { mount } from 'enzyme'
import Collection from './Collection'

describe('The Collection component', () => {
  it('has no items with minimum equal to zero', () => {
    const component = mount(<Collection minimum="0"><div className="hello">hello</div></Collection>)
    expect(component.find('div.hello').length).toEqual(0)
  })

  it('has one items with minimum equal to one', () => {
    const component = mount(<Collection minimum="1"><div className="hello">hello</div></Collection>)
    expect(component.find('div.hello').length).toEqual(1)
    expect(component.find('.details').length).toEqual(1)
    expect(component.find('.summary').length).toEqual(0)
  })

  it('can append an item', () => {
    const component = mount(<Collection minimum="0"><div className="hello">hello</div></Collection>)
    expect(component.find('div.hello').length).toEqual(0)
    component.find('button.add').simulate('click')
    expect(component.find('div.hello').length).toEqual(1)
    expect(component.find('.details').length).toEqual(1)
    expect(component.find('.summary').length).toEqual(0)
  })

  it('can apply summary', () => {
    let i = 0
    const summaryCallback = (item, index) => {
      i++
      return (
        <div className="table">Item {index}</div>
      )
    }

    const component = mount(<Collection minimum="2" summary={summaryCallback}><div className="hello">hello</div></Collection>)
    expect(component.find('div.hello').length).toBeGreaterThan(0)
    expect(component.find('.details').length).toBeGreaterThan(0)
    expect(component.find('.summary').length).toBeGreaterThan(0)
    expect(i).toEqual(2)
  })

  it('can toggle summary item', () => {
    let i = 0
    const summaryCallback = (item, index) => {
      i++
      return (
        <div className="table">Item {index}</div>
      )
    }

    const component = mount(
      <Collection minimum="2" summary={summaryCallback}>
        <div className="hello">hello</div>
      </Collection>
    )
    expect(component.find('div.hello').length).toBeGreaterThan(0)
    expect(component.find('.details').length).toBeGreaterThan(0)
    expect(component.find('.summary').length).toBeGreaterThan(0)
    expect(i).toEqual(2)

    component.find('.toggle').first().simulate('click')
    expect(component.find('div.hello').length).toEqual(2)
    expect(component.find('.details.hidden').length).toEqual(1)
    expect(component.find('.summary').length).toEqual(2)
    expect(i).toEqual(4)
  })

  it('can remove item from collection', () => {
    let i = 0
    const summaryCallback = (item, index) => {
      i++
      return (
        <div className="table">Item {index}</div>
      )
    }

    const component = mount(<Collection minimum="2" summary={summaryCallback}><div className="hello">hello</div></Collection>)
    expect(component.find('.summary').length).toBeGreaterThan(0)
    component.find('a.remove').first().simulate('click')
    expect(component.find('.summary').length).toEqual(0)
    expect(i).toEqual(2)
  })
})
