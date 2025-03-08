import { QBem } from '../src'

describe('QBem.element', () => {
  const block = 'block'
  const element = 'element'
  let bem

  beforeEach(() => {
    bem = new QBem(block)
  })

  it('should exist', () => {
    expect(bem['element']).toBeDefined()
  })

  it('should return the element classname in BEM format', () => {
    const expected = 'block__element'
    const result = bem.element(element)

    expect(result).toEqual(expected)
  })

  it('should return the element classname with a single string modifier in BEM format', () => {
    const expected = 'block__element block__element--active'
    const result = bem.element(element, ['active'])

    expect(result).toEqual(expected)
  })

  it('should return the element classname with multiple string modifiers in BEM format', () => {
    const expected =
      'block__element block__element--active block__element--dark-mode block__element--condensed'
    const result = bem.element(element, ['active', 'dark-mode', 'condensed'])

    expect(result).toEqual(expected)
  })

  it('should return the element classname with a single object modifier in BEM format', () => {
    const expected = 'block__element block__element--active'
    const result = bem.element(element, [{ active: true }])

    expect(result).toEqual(expected)
  })

  it('should return the element classname with multiple object modifiers in BEM format', () => {
    const expected =
      'block__element block__element--active block__element--dark-mode block__element--condensed'
    const result = bem.element(element, [
      { active: true },
      { 'dark-mode': true },
      { condensed: true },
    ])

    expect(result).toEqual(expected)
  })

  it('should return the element classname with multiple mixed modifiers in BEM format', () => {
    const expected =
      'block__element block__element--active block__element--dark-mode block__element--condensed'
    const result = bem.element(element, [
      { active: true },
      'dark-mode',
      { condensed: true },
    ])

    expect(result).toEqual(expected)
  })

  it('should return the element classname with a single string class when there are NO modifiers', () => {
    const expected = 'block__element blueprintjs'
    const result = bem.element(element, null, 'blueprintjs')

    expect(result).toEqual(expected)
  })

  it('should return the element classname with multiple string classes when there are NO modifiers', () => {
    const expected = 'block__element blueprintjs bootstrap'
    const result = bem.element(element, null, 'blueprintjs', 'bootstrap')

    expect(result).toEqual(expected)
  })

  it('should return the element classname with a single object class when there are NO modifiers', () => {
    const expected = 'block__element blueprintjs bootstrap'
    const result = bem.element(element, null, {
      blueprintjs: true,
      bootstrap: true,
    })

    expect(result).toEqual(expected)
  })

  it('should return the element classname with multiple object classes when there are NO modifiers', () => {
    const expected = 'block__element blueprintjs bootstrap'
    const result = bem.element(
      element,
      null,
      {
        blueprintjs: true,
      },
      {
        bootstrap: true,
      }
    )

    expect(result).toEqual(expected)
  })

  it('should return the element classname with multiple, mixed objects and string classes when there are NO modifiers', () => {
    const expected = 'block__element blueprintjs core bootstrap scroller'
    const result = bem.element(
      element,
      null,
      {
        blueprintjs: true,
      },
      'core',
      {
        bootstrap: true,
      },
      'scroller'
    )

    expect(result).toEqual(expected)
  })
})
