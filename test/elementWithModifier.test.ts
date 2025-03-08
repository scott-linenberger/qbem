import { QBem } from '../src'

describe('QBem.elementWithModifier', () => {
  it('should return a BEM style string using the block name associated with this instance of QBem', () => {
    const qb = new QBem('block')

    expect(qb.elementWithModifier('element', 'active')).toEqual(
      'block__element--active'
    )
  })
})
