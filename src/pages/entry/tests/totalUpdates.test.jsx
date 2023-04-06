import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType='scoops' />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  const user = userEvent.setup();
  render(<Options optionType='toppings' />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  await user.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  const mAndMsInput = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });
  await user.click(mAndMsInput);
  expect(toppingsSubtotal).toHaveTextContent('3.0');

  await user.click(cherriesInput);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});
