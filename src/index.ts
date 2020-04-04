
export type QBemConditionalModifier = {
  [modifierValue: string]: any;
}

export class QBem {
  /* instance variables */
  private _block: string;

  /**
   * Creates an instance of `QBem` for a block.
   * @param block - BEM block name
   */
  constructor(block: string) {
    if (!block) {
      throw new Error('QBem: could not construct instance: block name undefined! ');
    }

    this._block = block;
  }

  /**
   * Manual method for creating a BEM style class string
   * for a BEM block with a BEM modifier using the BEM block name
   * associated with this instance of `QBem`.
   *
   * **Note:**
   *
   * `QBem.block` is more robust and the recommended way
   * of building this type of string.
   *
   * @param modifier - BEM modifier name
   */
  public blockWithModifier(modifier: string): string {
    return `${this._block}--${modifier}`;
  }

  /**
   * Manual method for creating a BEM style class string
   * for a BEM element with a BEM modifier using
   * the BEM block name associated with this instance of `QBem`.
   *
   * **Note:**
   *
   * `QBem.element` is more robust and the recommended way
   * of building this type of string.
   *
   * @param element - BEM element name
   * @param modifier - BEM modifier name
   */
  public elementWithModifier(element: string, modifier: string): string {
    return `${this._block}__${element}--${modifier}`;
  }

  /**
   * Method for creating a BEM style class string. Uses the BEM block name
   * associated with this instance of `QBem`.
   *
   * ```ts
   * // example
   * const qb = new QBem('block');
   *
   * // without BEM modifiers
   * qb.block(); // returns 'block'
   *
   * // with string modifier
   * qb.block(['active']); // returns 'block block--active'
   *
   * // with conditional modifiers
   * qb.block([
   *  {
   *    active: true,
   *    ['theme-dark']: true,
   *  },
   * ]); // returns 'block block--active block--theme-dark'
   *
   * // with mixed modifiers
   * qb.block([
   *  'active',
   *  {
   *    ['theme-dark']: true, // applied b/c condition is true
   *    ['disabled']: false, // not applied b/c condition is falsy
   *  },
   *  'highlighted',
   * ]); // returns 'block block--active block--theme-dark block--highlighted'
   * ```
   *
   * @param modifiers - array of BEM modifiers to be added to the class string.
   */
  public block(modifiers: (string | QBemConditionalModifier)[] | undefined = []): string {
    let classnames = `${this._block} `;

    if (modifiers.length === 0) {
      return classnames.trim();
    }

    modifiers.forEach((currentModifier: string | QBemConditionalModifier) => {
      const modifierType = typeof currentModifier;

      switch (modifierType) {
        case 'string':
          classnames = classnames.concat(
            `${this.blockWithModifier(currentModifier as string)} `
          );
          break;

        case 'object':
          /* iterate the object's properties */
          Object
            .entries(currentModifier)
            .forEach(([key, value]) => {
              if (value === true) {
                classnames = classnames.concat(`${this.blockWithModifier(key)} `)
              }
            });
          break;

        default:
          break;
      }

    });

    return classnames.trim();
  }

  /**
   * Method for creating a BEM style class string. Uses the BEM block name
   * associated with this instance of `QBem` and the supplied BEM element name.
   *
   * ```ts
   * // example
   * const qb = new QBem('block');
   *
   * // without BEM modifiers
   * qb.element('element'); // returns 'block__element'
   *
   * // with string modifier
   * qb.element(
   *  'element',
   *  ['active']
   * ); // returns 'block__element block__element--active'
   *
   * // with conditional modifiers
   * qb.element(
   *  'element',
   *  [
   *    {
   *      active: true,
   *      ['theme-dark']: true,
   *    },
   * ]
   * ); // returns 'block__element block__element--active block__element--theme-dark'
   *
   * // with mixed modifiers
   * qb.element(
   *  'element',
   *  [
   *    'active',
   *    {
   *      ['theme-dark']: true, // applied b/c condition is true
   *      ['disabled']: false, // not applied b/c condition is falsy
   *    },
   *    'highlighted',
   *  ],
   * ); // returns 'block__element block__element--active block__element--theme-dark block__element--highlighted'
   * ```
   *
   * @param modifiers - array of BEM modifiers to be added to the class string.
   */
  public element(element: string, modifiers: (string | QBemConditionalModifier)[] | undefined = []): string {
    let classnames = `${this._block}__${element} `;

    if (modifiers.length === 0) {
      return classnames.trim();
    }

    modifiers.forEach((currentModifier) => {
      const modifierType = typeof currentModifier;

      switch (modifierType) {
        case 'string':
          classnames = classnames.concat(
            `${this.elementWithModifier(element, currentModifier as string)} `
          );
          break;

        case 'object':
          /* iterate the object's properties */
          Object
            .entries(currentModifier)
            .forEach(([key, value]) => {
              if (value === true) {
                classnames = classnames.concat(`${this.elementWithModifier(element, key)} `);
              }
            })
          break;

        default:
          break;
      }
    });

    return classnames.trim();
  }
};

export default QBem;