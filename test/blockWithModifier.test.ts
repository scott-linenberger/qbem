import { QBem } from '../src'

describe('QBem.blockWithModifier', () => {
  it('should return a BEM style string using the block name associated with this instance of QBem', () => {
    const qb = new QBem('block')

    expect(qb.blockWithModifier('active')).toEqual('block--active')
  })
})
