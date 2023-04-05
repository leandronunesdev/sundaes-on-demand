import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const confirmButton = screen.getByRole('button', { name: 'Confirm order' });

  expect(checkbox).not.toBeChecked();

  expect(confirmButton).toBeDisabled();
});

test('if the checkbox enables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const confirmButton = screen.getByRole('button', { name: 'Confirm order' });

  fireEvent.click(checkbox);

  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkbox);

  expect(confirmButton).toBeDisabled();
});
