import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagetPath: '/images/cholocate.png' },
        { name: 'Vanilla', imagetPath: 'images/vanilla.png' },
      ])
    );
  }),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagetPath: '/images/cherries.png' },
        { name: 'M&Ms', imagetPath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagetPath: '/images/hot-fudge.png' },
      ])
    );
  }),
];
