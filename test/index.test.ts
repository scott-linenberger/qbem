import QBem from '../src';

describe('QBem', () => {
  it('should be defined', () => {
    const qb = new QBem('name-tag');


    console.log(`
      /* block NO modifiers */
      <div classname="${qb.block()}">
        /* heading */
        <h1
          classname="${qb.element('heading')}">
          Hello, My Name Is:
        </h1>

        /* name field */
        <div classname="${qb.element('footer')}" />
      <div>
    `);

    console.log(`
      /* block NO modifiers */
      <div classname="${qb.block(['active', 'dark-mode'])}">
        /* heading */
        <h1
          classname="${qb.element('heading', ['dark-mode', 'new'])}">
          Hello, My Name Is:
        </h1>

        /* name field */
        <div classname="${qb.element('footer', ['disabled'])}" />
      <div>
    `);

  });
});