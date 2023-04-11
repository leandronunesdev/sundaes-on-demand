import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('order sundae button disabled when there s no scoop selected', async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderSundaeButton = screen.getByRole('button', {
    name: 'Order Sundae!',
  });

  expect(orderSundaeButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.type(vanillaInput, '1');

  expect(orderSundaeButton).toBeEnabled();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '0');

  expect(orderSundaeButton).toBeDisabled();
});

test('validate scoop count value', async () => {
  const user = userEvent.setup();
  render(<OrderEntry />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.type(vanillaInput, '-1');

  expect(vanillaInput).toHaveClass('count-error');

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopsSubtotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1.5');

  expect(vanillaInput).toHaveClass('count-error');

  expect(scoopsSubtotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '0');

  expect(vanillaInput).not.toHaveClass('count-error');
});
