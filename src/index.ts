

export class QBem {
  /* instance variables */
  private _block: string;

  constructor(block: string) {
    this._block = block;
  }

  public block(modifiers: string[] | undefined = []) {
    let classnames = `${this._block} `;

    if (modifiers.length === 0) {
      return classnames.trim();
    }

    modifiers.forEach((currentModifier) => {
      classnames = classnames.concat(`${this._block}--${currentModifier} `);
    });

    return classnames.trim();
  }

  public element(element: string, modifiers: string[] | undefined = []) {
    let classnames = `${this._block}__${element} `;

    if (modifiers.length === 0) {
      return classnames.trim();
    }

    modifiers.forEach((currentModifier) => {
      classnames = classnames.concat(`${this._block}__${element}--${currentModifier} `);
    });

    return classnames.trim();
  }
};

export default QBem;