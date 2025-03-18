type QBemConditionalKeys =
  | string
  | {
      [key: string]: boolean
    }

type ClassesInput = QBemConditionalKeys[]
type BlockModifiers = QBemConditionalKeys[] | undefined | null

const myArr = []

const QBEM_ERROR_MODIFIER_TYPE_VIOLATION =
  'QBem: modifier type violation => modifiers must be strings or objects!'

function throModifierTypeViolationError() {
  throw new Error(QBEM_ERROR_MODIFIER_TYPE_VIOLATION)
}

export class QBem {
  /* instance variables */
  // block
  private _b: string

  /**
   * Returns an instance of `QBem`.
   *
   * ```ts
   * const bem = new Qbem('<block-name>') // exmple
   * ```
   * @param block - BEM block name
   */
  constructor(block: string) {
    if (!block) {
      throw new Error('qbem: block name undefined')
    }

    this._b = block
  }

  /**
   * Returns the 'block' portion of BEM
   *
   * @param modifiers - BEM modifiers for the block
   * @param classes - non-BEM classnames for the block
   * @returns - calculated BEM block classnames
   */
  public block(modifiers?: BlockModifiers, ...classes: ClassesInput): string {
    /* if no modifiers */
    if (!modifiers) {
      if (!classes.length) {
        return this._b // no classes, send block name
      } else {
        return `${this._b} ${QBem.classes(...classes)}` // send block + classes
      }
    }

    const outputModifiers = QBem.modifiers(this._b, ...modifiers)
    const outputClasses = QBem.classes(...classes)

    return `${this._b} ${outputModifiers}${
      outputClasses.length ? ` ${outputClasses}` : ''
    }`.trim()
  }

  /**
   * Returns a calculated BEM element using the instance's block and the
   * supplied arguments.
   * @param element - BEM element name
   * @param modifiers - BEM modifiers for the element
   * @param classes - non-BEM classes for the element
   * @returns - calculated BEM element classnames
   */
  public element(
    element: string,
    modifiers?: BlockModifiers,
    ...classes: ClassesInput
  ): string {
    let base = `${this._b}__${element}`

    if (!modifiers) {
      if (!classes.length) {
        return base
      } else {
        return `${base} ${QBem.classes(...classes)}`
      }
    }

    const outputModifiers = QBem.modifiers(base, ...modifiers)
    const outputClasses = QBem.classes(...classes)

    return `${base} ${outputModifiers}${
      outputClasses.length ? `${outputClasses}` : ''
    }`.trim()
  }

  /**
   * Convenience method for `element`
   *
   * Returns a calculated BEM element using the instance's block and the
   * supplied arguments.
   * @param element - BEM element name
   * @param modifiers - BEM modifiers for the element
   * @param classes - non-BEM classes for the element
   * @returns - calculated BEM element classnames
   */
  public elem(
    element: string,
    modifiers?: BlockModifiers,
    ...classes: ClassesInput
  ): string {
    return this.element(element, modifiers, ...classes)
  }

  public static modifiers(base: string, ...modifiers: QBemConditionalKeys[]) {
    if (modifiers === null || modifiers === undefined || !modifiers.length) {
      return base
    }

    let modified = ''

    for (let i = 0; i < modifiers.length; i++) {
      const currModifier = modifiers[i]
      const modifierType = typeof currModifier

      if (modifierType === 'string') {
        modified = modified.length
          ? `${modified} ${base}--${currModifier}`
          : `${base}--${currModifier}`
        continue
      }

      if (modifierType === 'object') {
        Object.entries(currModifier).forEach(([key, value]) => {
          if (value === true) {
            modified = modified.length
              ? `${modified} ${base}--${key}`
              : `${base}--${key}`
          }
        })
      } else {
        throModifierTypeViolationError()
      }
    }

    return modified.trim()
  }

  /**
   * ```typescript
   * QBem.classes('a', 'b', 'c', { d: true, e: false }) // -> 'a b c d'
   * ```
   * @param classes - non-BEM classes to be concatenated
   * @returns - concatenated classnames
   */
  public static classes(...classes: ClassesInput) {
    let classnames = ''

    /* cycle through classnames */
    for (let i = 0; i < classes.length; i++) {
      const currClass = classes[i]
      const modifierType = typeof currClass

      if (modifierType === 'string') {
        classnames = `${classnames.trim()} ${currClass as string}`
        continue
      }

      if (modifierType === 'object') {
        /* iterate the object's properties */
        Object.entries(currClass).forEach(([key, value]) => {
          if (value === true) {
            classnames = `${classnames} ${key}`
          }
        })
      } else {
        throModifierTypeViolationError()
      }
    }

    return classnames.trim()
  }

  /**
   * @deprecated
   */
  public blockWithModifier(modifier: string): string {
    return `${this._b}--${modifier}`
  }

  /**
   * @deprecated
   */
  public elementWithModifier(element: string, modifier: string): string {
    return `${this._b}__${element}--${modifier}`
  }
}

export default QBem
