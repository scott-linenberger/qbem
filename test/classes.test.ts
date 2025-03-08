import { QBem } from '../src'

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
