import { QBem } from '../src'

describe('QBem.modifiers', () => {
  it('should return the base string if no modifiers provided', () => {
    const expected = 'form'
    const result = QBem.modifiers(expected)

    expect(result).toBe(expected)
  })

  it('should return the base string with single string modifier', () => {
    const base = 'form'
    const expected = 'form--active'
    const result = QBem.modifiers(base, 'active')

    expect(result).toBe(expected)
  })

  it('should return the base string with single object modifier', () => {
    const base = 'form'
    const expected = 'form--active'
    const result = QBem.modifiers(base, { active: true, glass: false })

    expect(result).toBe(expected)
  })

  it('should return the base string with mixed string and object modifiers', () => {
    const base = 'form'
    const expected = 'form--active form--dark-mode form--condensed'
    const result = QBem.modifiers(
      base,
      { active: true, glass: false },
      'dark-mode',
      { collapsed: false, condensed: true }
    )

    expect(result).toBe(expected)
  })
})
