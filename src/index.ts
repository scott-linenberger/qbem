type QBemConditionalKeys =
  | string
  | {
      [key: string]: boolean
    }

type ClassesInput = QBemConditionalKeys[]
type BlockModifiers = QBemConditionalKeys[] | undefined | null

export class QBem {
  /* instance variables */
  // block
  private _b: string

  /**
   * Creates an instance of `QBem` for a block.
   * @param block - BEM block name
   */
  constructor(block: string) {
    if (!block) {
      throw new Error('qbem: block name undefined')
    }

    this._b = block
  }

  public block(modifiers?: BlockModifiers, ...classes: ClassesInput): string {
    /* if no modifiers */
    if (!modifiers) {
      if (!classes.length) {
        return this._b // no classes, send block name
      } else {
        return `${this._b} ${QBem.classes(...classes)}` // send block + classes
      }
    }

    /* prepare for adding classes and modifiers */
    modifiers = modifiers ?? []

    const outputModifiers = QBem.modifiers(this._b, ...modifiers)
    const outputClasses = QBem.classes(...classes)

    return `${this._b} ${outputModifiers}${
      outputClasses.length ? ` ${outputClasses}` : ''
    }`.trim()
  }

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

    /* prepare for adding classes and modifiers */
    modifiers = modifiers ?? []
    const outputModifiers = QBem.modifiers(base, ...modifiers)
    const outputClasses = QBem.classes(...classes)

    return `${base} ${outputModifiers}${
      outputClasses.length ? ` ${outputClasses}` : ''
    }`.trim()
  }

  /**
   * Convenience method for `element`
   * @param element
   * @param modifiers
   * @returns
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
      }
    }

    return modified.trim()
  }

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
