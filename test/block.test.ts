import { QBem } from '../src'

describe('bem.block', () => {
  const block = 'block'
  let bem

  beforeEach(() => {
    bem = new QBem(block)
  })

  it('should exist', () => {
    expect(bem['block']).toBeDefined()
  })

  it('should return the block name if modifiers and classes are undefined', () => {
    const classname = bem.block()
    expect(classname).toEqual(block)
  })

  it('should return the block name if a single string modifier is set', () => {
    const expected = 'block block--dark-mode'
    const result = bem.block(['dark-mode'])

    expect(result).toEqual(expected)
  })

  it('should return the block name if a single string modifier is set', () => {
    const expected = 'block block--dark-mode block--active'
    const result = bem.block(['dark-mode', 'active'])

    expect(result).toEqual(expected)
  })

  it('should return the block name if a single object modifier is set', () => {
    const expected = 'block block--dark-mode'
    const result = bem.block([{ ['dark-mode']: true }])

    expect(result).toEqual(expected)
  })

  it('should return the block name if a multiple object modifiers are set', () => {
    const expected = 'block block--dark-mode block--active'
    const result = bem.block([
      { ['dark-mode']: true },
      { active: true, inactive: false },
      { notThisOne: false },
    ])

    expect(result).toEqual(expected)
  })

  it('should return a single class appended if modifiers unset AND single class added', () => {
    const expected = 'block blueprint'
    const result = bem.block(null, 'blueprint')

    expect(result).toEqual(expected)
  })
})
