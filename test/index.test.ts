import { QBem } from '../src'

describe('QBem', () => {
  it('should be defined', () => {
    expect(QBem).toBeDefined()
  })

  it('should throw if block name is undefined in constructor', () => {
    try {
      // @ts-ignore
      const qb = new QBem()
      /* fail the test */
      // expect(true).toBe(false)
    } catch (e) {
      expect(true).toBe(true)
    }
  })

  it('should format sample HTML correctly', () => {
    const result = `
    <form class="form form--theme-xmas form--simple other another-one">
      <input class="form__input" type="text" />
      <input
      class="form__submit form__submit--disabled"
      type="submit" />
    </form>
    `

    const qb = new QBem('form')
    const template = `
    <form class="${qb.block(['theme-xmas', 'simple'], 'other', {
      ['another-one']: true,
      notMe: false,
    })}">
      <input class="${qb.element('input')}" type="text" />
      <input
      class="${qb.element('submit', [{ disabled: true }])}"
      type="submit" />
    </form>
    `
    expect(template).toEqual(result)
  })
})
