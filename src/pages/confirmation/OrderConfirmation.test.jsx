import { server } from '../../mocks/server';
import { rest } from 'msw';
import OrderConfirmation from './OrderConfirmation';
import {
  render,
  waitFor,
  screen,
} from '../../test-utils/testing-library-utils';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation />);

  await waitFor(async () => {
    const alerts = await screen.findByRole('alert');
    expect(alerts).toBeInTheDocument();
  });
});
