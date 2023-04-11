import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  const user = userEvent.setup();
  // render app
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.type(chocolateInput, '2');

  const hotFudgemochiCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });

  await user.click(hotFudgemochiCheckbox);

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });

  await user.click(cherriesCheckbox);

  // find and click order button
  const orderButton = await screen.findByRole('button', {
    name: 'Order Sundae!',
  });

  await user.click(orderButton);

  // check summary information based on order

  const scoopsSubtotalSummary = screen.getByText('Scoops: $', { exact: false });
  expect(scoopsSubtotalSummary).toHaveTextContent('6.00');

  const toppingsSubtotalSummary = screen.getByText('Toppings: $', {
    exact: false,
  });
  expect(toppingsSubtotalSummary).toHaveTextContent('3.00');

  // accept terms and conditions and click button to confirm order

  const termsCheckbox = await screen.findByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  await user.click(termsCheckbox);

  const confirmButton = await screen.findByRole('button', {
    name: 'Confirm order',
  });
  await user.click(confirmButton);

  // confirm order number on confirmation page
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const orderNumber = await screen.findByText('Your order number is', {
    exact: false,
  });

  expect(orderNumber).toBeVisible();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // click "new order" button on confirmation page

  const newOrderButton = await screen.findByRole('button', {
    name: 'Create new order',
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // do we need to await anything to avoid test errors?
  unmount();
});

test('happy path without toppings', async () => {
  const user = userEvent.setup();
  // render app
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.type(chocolateInput, '2');

  // find and click order button
  const orderButton = await screen.findByRole('button', {
    name: 'Order Sundae!',
  });

  await user.click(orderButton);

  // check summary information based on order

  const scoopsSubtotalSummary = screen.getByText('Scoops: $', { exact: false });
  expect(scoopsSubtotalSummary).toHaveTextContent('6.00');

  const toppingsSubtotalSummary = screen.getByText('Toppings: $', {
    exact: false,
  });
  expect(toppingsSubtotalSummary).toHaveTextContent('0.00');

  const cherriesSummary = screen.queryByText('Cherries');
  const mAndMsSummary = screen.queryByText('M&Ms');
  const hotFudgeSummary = screen.queryByText('Hot fudge');

  expect(cherriesSummary).not.toBeInTheDocument();
  expect(mAndMsSummary).not.toBeInTheDocument();
  expect(hotFudgeSummary).not.toBeInTheDocument();

  // accept terms and conditions and click button to confirm order

  const termsCheckbox = await screen.findByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  await user.click(termsCheckbox);

  const confirmButton = await screen.findByRole('button', {
    name: 'Confirm order',
  });
  await user.click(confirmButton);

  // confirm order number on confirmation page
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const orderNumber = await screen.findByText('Your order number is', {
    exact: false,
  });

  expect(orderNumber).toBeVisible();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // click "new order" button on confirmation page

  const newOrderButton = await screen.findByRole('button', {
    name: 'Create new order',
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // do we need to await anything to avoid test errors?
  unmount();
});
