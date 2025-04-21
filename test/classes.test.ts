import { QBem, classes } from '../src'

describe('classes', () => {
  it('should exist as an import', () => {
    expect(classes).not.toBe(undefined)
  })

  it('should return an empty string when no inputs provides', () => {
    const result = classes()
    expect(result).toBe('')
  })

  it('should concat simple string classes together in CSS form', () => {
    const result = classes('a', 'b', 'c')
    const expectedResult = 'a b c'
    expect(result).toBe(expectedResult)
  })

  it('should correctly concat conditional objects', () => {
    const result = classes('a', { b: false }, 'c')
    const expectedResult = 'a c'
    expect(result).toBe(expectedResult)
  })

  it('should correctly concat complex conditional objects', () => {
    const result = classes('a', { b: false, c: true, ['d-e-f']: true })
    const expectedResult = 'a c d-e-f'
    expect(result).toBe(expectedResult)
  })
})

describe('QBem.element', () => {
  it('should return an empty string if no input', () => {
    const expected = ''

    const result = QBem.classes()

    expect(expected).toBe(result)
  })

  it('should return a single string if given a single string input', () => {
    const expected = 'cow'
    expect(QBem.classes(expected)).toBe(expected)
  })

  it('should throw a useful error if modifiers violate type definitions', () => {
    expect(() => {
      // @ts-ignore -- ignoring type defs to test all branches
      QBem.classes('class1', 77)
    }).toThrow(
      'QBem: modifier type violation => modifiers must be strings or objects!'
    )
  })

  it('should return a concatenated string from mixed input', () => {
    const expected = 'the cow jumped over the moon'

    const result = QBem.classes(
      'the',
      'cow',
      'jumped',
      { over: true, under: false },
      'the',
      { mars: false, venus: false, moon: true }
    )

    expect(expected).toBe(result)
  })

  it('should return a concatenated string from a single input', () => {
    const expected = 'aperture-science'

    const result = QBem.classes('aperture-science')

    expect(expected).toBe(result)
  })

  it('should return a concatenated string from a string of string inputs', () => {
    const expected = 'aperture science we do what we must because we can'

    const result = QBem.classes(
      'aperture',
      'science',
      'we',
      'do',
      'what',
      'we',
      'must',
      'because',
      'we',
      'can'
    )

    expect(expected).toBe(result)
  })

  it('should return a concatenated string from a string of modifier inputs', () => {
    const expected = 'aperture science we do what we must because we can'

    const result = QBem.classes(
      {
        aperture: true,
        science: true,
        wheatley: false,
      },
      {
        atlas: false,
        we: true,
        do: true,
        what: true,
      },
      {
        we: true,
        must: true,
        ['companion-cube']: false,
        because: true,
      },
      {
        we: true,
        can: true,
      }
    )

    expect(expected).toBe(result)
  })
})
