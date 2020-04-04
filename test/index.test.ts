import QBem from '../src';

describe('QBem', () => {
  it('should be defined', () => {
    expect(QBem).toBeDefined();
  });

  it('should throw if blockname is undefined', () => {
    try {
      // @ts-ignore
      const qb = new QBem();
      /* fail the test */
      expect(true).toBe(false);
    } catch (e) {
      expect(true).toBe(true);
    }
  });

  it('should have a "block" method', () => {
    const nameBlock = 'block';
    const qb = new QBem(nameBlock);

    expect(qb['block']).toBeDefined();
  });

  it('should have an "element" method', () => {
    const nameBlock = 'block';
    const qb = new QBem(nameBlock);

    expect(qb['element']).toBeDefined();
  });

  describe('QBem.block', () => {

    it('should return the block name if modifiers undefined', () => {
      const nameBlock = 'block';
      const qb = new QBem(nameBlock);

      const classname = qb.block();

      expect(classname)
        .toEqual(nameBlock);
    });

    it('should return the block name and modifiers (in order) if modifiers supplied', () => {
      const nameBlock = 'block';
      const qb = new QBem(nameBlock);

      const modifierActive = 'active';
      const modifierDarkMode = 'dark-mode';

      const classname = qb.block([
        modifierActive,
        modifierDarkMode,
      ]);

      expect(classname)
        .toEqual(`${nameBlock} ${nameBlock}--${modifierActive} ${nameBlock}--${modifierDarkMode}`);
    });

  });

  describe('QBem.element', () => {

    it(
      'should return the element with block name attached in BEM format if modifiers undefined',
      () => {
        const nameBlock = 'block';
        const nameElement = 'element';
        const qb = new QBem(nameBlock);

        const classname = qb.element(nameElement);

        expect(classname)
          .toEqual(`${nameBlock}__${nameElement}`);
      });


    it(
      'should return the element with block name attached in BEM format with modifiers (in order) if defined',
      () => {
        const nameBlock = 'block';
        const nameElement = 'element';
        const qb = new QBem(nameBlock);

        const modifierActive = 'active';
        const modifierDarkMode = 'dark-mode';

        const classname = qb.element(
          nameElement,
          [
            modifierActive,
            modifierDarkMode
          ]
        );

        const element = `${nameBlock}__${nameElement}`;

        expect(classname)
          .toEqual(`${element} ${element}--${modifierActive} ${element}--${modifierDarkMode}`);
      });

  });
});