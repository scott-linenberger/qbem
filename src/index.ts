type QBemConditionalKeys =
  | string
  | {
      [key: string]: boolean
    }

type ClassesInput = QBemConditionalKeys[]
type BlockModifiers = QBemConditionalKeys[] | undefined | null

const QBEM_ERROR_MODIFIER_TYPE_VIOLATION =
  'QBem: modifier type violation => modifiers must be strings or objects!'

function throModifierTypeViolationError() {
  throw new Error(QBEM_ERROR_MODIFIER_TYPE_VIOLATION)
}

export class QBem {
  private _b: string

  constructor(block: string) {
    if (!block) {
      throw new Error('qbem: block name undefined')
    }

    this._b = block
  }

  public block(modifiers?: BlockModifiers, ...classes: ClassesInput): string {
    if (!modifiers) {
      if (!classes.length) {
        return this._b
      } else {
        return `${this._b} ${QBem.classes(...classes)}`
      }
    }

    const outputModifiers = QBem.modifiers(this._b, ...modifiers)
    const outputClasses = QBem.classes(...classes)

    return [this._b, outputModifiers, outputClasses].filter(Boolean).join(' ')
  }

  public element(element: string, modifiers?: BlockModifiers, ...classes: ClassesInput): string {
    const base = `${this._b}__${element}`

    if (!modifiers) {
      if (!classes.length) {
        return base
      } else {
        return `${base} ${QBem.classes(...classes)}`
      }
    }

    const outputModifiers = QBem.modifiers(base, ...modifiers)
    const outputClasses = QBem.classes(...classes)

    return [base, outputModifiers, outputClasses].filter(Boolean).join(' ')
  }

  public elem(element: string, modifiers?: BlockModifiers, ...classes: ClassesInput): string {
    return this.element(element, modifiers, ...classes)
  }

  public static modifiers(base: string, ...modifiers: QBemConditionalKeys[]) {
    if (!modifiers.length) return base

    let modified = ''

    for (let i = 0; i < modifiers.length; i++) {
      const currModifier = modifiers[i]
      const modifierType = typeof currModifier

      if (modifierType === 'string') {
        modified += modified ? ` ${base}--${currModifier}` : `${base}--${currModifier}`
        continue
      }

      if (modifierType === 'object') {
        for (const [key, value] of Object.entries(currModifier)) {
          if (value === true) {
            modified += modified ? ` ${base}--${key}` : `${base}--${key}`
          }
        }
      } else {
        throModifierTypeViolationError()
      }
    }

    return modified.trim()
  }

  public static classes(...classes: ClassesInput) {
    let classnames = ''

    for (let i = 0; i < classes.length; i++) {
      const currClass = classes[i]
      const modifierType = typeof currClass

      if (modifierType === 'string') {
        classnames += classnames ? ` ${currClass}` : currClass
        continue
      }

      if (modifierType === 'object') {
        for (const [key, value] of Object.entries(currClass)) {
          if (value === true) {
            classnames += classnames ? ` ${key}` : key
          }
        }
      } else {
        throModifierTypeViolationError()
      }
    }

    return classnames
  }
}

export default QBem
