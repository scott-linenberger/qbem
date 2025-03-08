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

  // it('should return the block name with classnames if modifiers are unset', () => {
  //   const bem = new bem('block')
  //   const expected = 'block a b c'
  //   const result = bem.block(null, 'a', 'b', 'c')

  //   expect(result).toEqual(expected)
  // })

  // it('should return the block name with classnames when mixed', () => {
  //   const nameBlock = 'block'
  //   const bem = new bem(nameBlock)

  //   const classname = bem.block(null, 'a', { ['dark-mode']: true }, 'b', 'c', {
  //     extra: true,
  //   })

  //   expect(classname).toEqual(`${nameBlock} a dark-mode b c extra`)
  // })

  // it('should return the block name and modifiers (in order) if modifiers supplied', () => {
  //   const nameBlock = 'block'
  //   const bem = new bem(nameBlock)

  //   const modifierActive = 'active'
  //   const modifierDarkMode = 'dark-mode'

  //   const classname = bem.block([modifierActive, modifierDarkMode])

  //   expect(classname).toEqual(
  //     `${nameBlock} ${nameBlock}--${modifierActive} ${nameBlock}--${modifierDarkMode}`
  //   )
  // })

  // it('should add correct conditional modifiers (in order) if modifiers supplied', () => {
  //   const nameBlock = 'block'
  //   const bem = new bem(nameBlock)

  //   const modifierActive = 'active'
  //   const modifierDarkMode = 'dark-mode'
  //   const modifierUltraAwesome = 'ultra-awesome'

  //   const classname = bem.block([
  //     modifierActive,
  //     {
  //       [modifierDarkMode]: true,
  //     },
  //     {
  //       [modifierUltraAwesome]: true,
  //       disabled: false,
  //     },
  //   ])

  //   expect(classname).toEqual(
  //     `${nameBlock} ${nameBlock}--${modifierActive} ${nameBlock}--${modifierDarkMode} ${nameBlock}--${modifierUltraAwesome}`
  //   )
  // })
})
