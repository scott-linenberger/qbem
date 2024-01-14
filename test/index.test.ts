import { QBem } from '../src'

describe('QBem', () => {
  it('should be defined', () => {
    expect(QBem).toBeDefined()
  })

  it('should throw if block name is undefined', () => {
    try {
      // @ts-ignore
      const qb = new QBem()
      /* fail the test */
      expect(true).toBe(false)
    } catch (e) {
      expect(true).toBe(true)
    }
  })

  it('should have a "block" method', () => {
    const nameBlock = 'block'
    const qb = new QBem(nameBlock)

    expect(qb['block']).toBeDefined()
  })

  it('should have an "element" method', () => {
    const nameBlock = 'block'
    const qb = new QBem(nameBlock)

    expect(qb['element']).toBeDefined()
  })

  it('should format sample HTML correctly', () => {
    const result = `
    <form class="form form--theme-xmas form--simple">
      <input class="form__input" type="text" />
      <input
      class="form__submit form__submit--disabled"
      type="submit" />
    </form>
    `

    const qb = new QBem('form')
    const template = `
    <form class="${qb.block(['theme-xmas', 'simple'])}">
      <input class="${qb.element('input')}" type="text" />
      <input
      class="${qb.element('submit', [{ disabled: true }])}"
      type="submit" />
    </form>
    `
    expect(template).toEqual(result)
  })

  describe('QBem.blockWithModifier', () => {
    it('should return a BEM style string using the block name associated with this instance of QBem', () => {
      const qb = new QBem('block')

      expect(qb.blockWithModifier('active')).toEqual('block--active')
    })
  })

  describe('QBem.elementWithModifier', () => {
    it('should return a BEM style string using the block name associated with this instance of QBem', () => {
      const qb = new QBem('block')

      expect(qb.elementWithModifier('element', 'active')).toEqual(
        'block__element--active'
      )
    })
  })

  describe('QBem.block', () => {
    it('should return the block name if modifiers undefined', () => {
      const nameBlock = 'block'
      const qb = new QBem(nameBlock)

      const classname = qb.block()

      expect(classname).toEqual(nameBlock)
    })

    it('should return the block name and modifiers (in order) if modifiers supplied', () => {
      const nameBlock = 'block'
      const qb = new QBem(nameBlock)

      const modifierActive = 'active'
      const modifierDarkMode = 'dark-mode'

      const classname = qb.block([modifierActive, modifierDarkMode])

      expect(classname).toEqual(
        `${nameBlock} ${nameBlock}--${modifierActive} ${nameBlock}--${modifierDarkMode}`
      )
    })

    it('should add correct conditional modifiers (in order) if modifiers supplied', () => {
      const nameBlock = 'block'
      const qb = new QBem(nameBlock)

      const modifierActive = 'active'
      const modifierDarkMode = 'dark-mode'
      const modifierUltraAwesome = 'ultra-awesome'

      const classname = qb.block([
        modifierActive,
        {
          [modifierDarkMode]: true,
        },
        {
          [modifierUltraAwesome]: true,
          disabled: false,
        },
      ])

      expect(classname).toEqual(
        `${nameBlock} ${nameBlock}--${modifierActive} ${nameBlock}--${modifierDarkMode} ${nameBlock}--${modifierUltraAwesome}`
      )
    })
  })

  describe('QBem.element', () => {
    it('should return the element with block name attached in BEM format if modifiers undefined', () => {
      const nameBlock = 'block'
      const nameElement = 'element'
      const qb = new QBem(nameBlock)

      const classname = qb.element(nameElement)

      expect(classname).toEqual(`${nameBlock}__${nameElement}`)
    })

    it('should return the element with block name attached in BEM format with modifiers (in order) if defined', () => {
      const nameBlock = 'block'
      const nameElement = 'element'
      const qb = new QBem(nameBlock)

      const modifierActive = 'active'
      const modifierDarkMode = 'dark-mode'

      const classname = qb.element(nameElement, [
        modifierActive,
        modifierDarkMode,
      ])

      const element = `${nameBlock}__${nameElement}`

      expect(classname).toEqual(
        `${element} ${element}--${modifierActive} ${element}--${modifierDarkMode}`
      )
    })

    it('should return the element with block name attached in BEM format with conditional modifiers (in order) if defined', () => {
      const nameBlock = 'block'
      const nameElement = 'element'
      const qb = new QBem(nameBlock)

      const modifierActive = 'active'
      const modifierDarkMode = 'dark-mode'
      const modifierUltraAwesome = 'ultra-awesome'

      const classname = qb.element(nameElement, [
        {
          [modifierActive]: true,
          [modifierUltraAwesome]: true,
          'other-modifier': undefined,
        },
        modifierDarkMode,
      ])

      const element = `${nameBlock}__${nameElement}`

      expect(classname).toEqual(
        `${element} ${element}--${modifierActive} ${element}--${modifierUltraAwesome} ${element}--${modifierDarkMode}`
      )
    })
  })

  describe('QBem.elem', () => {
    it('should return the element with block name attached in BEM format if modifiers undefined', () => {
      const nameBlock = 'block'
      const nameElement = 'element'
      const qb = new QBem(nameBlock)

      const classname = qb.elem(nameElement)

      expect(classname).toEqual(`${nameBlock}__${nameElement}`)
    })

    it('should return the element with block name attached in BEM format with modifiers (in order) if defined', () => {
      const nameBlock = 'block'
      const nameElement = 'element'
      const qb = new QBem(nameBlock)

      const modifierActive = 'active'
      const modifierDarkMode = 'dark-mode'

      const classname = qb.elem(nameElement, [modifierActive, modifierDarkMode])

      const element = `${nameBlock}__${nameElement}`

      expect(classname).toEqual(
        `${element} ${element}--${modifierActive} ${element}--${modifierDarkMode}`
      )
    })

    it('should return the element with block name attached in BEM format with conditional modifiers (in order) if defined', () => {
      const nameBlock = 'block'
      const nameElement = 'element'
      const qb = new QBem(nameBlock)

      const modifierActive = 'active'
      const modifierDarkMode = 'dark-mode'
      const modifierUltraAwesome = 'ultra-awesome'

      const classname = qb.elem(nameElement, [
        {
          [modifierActive]: true,
          [modifierUltraAwesome]: true,
          'other-modifier': undefined,
        },
        modifierDarkMode,
      ])

      const element = `${nameBlock}__${nameElement}`

      expect(classname).toEqual(
        `${element} ${element}--${modifierActive} ${element}--${modifierUltraAwesome} ${element}--${modifierDarkMode}`
      )
    })
  })
})
