import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

vi.mock('axios');

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields and button', () => {
    renderWithRouter(<Register />);

    expect(screen.getByPlaceholderText(/Enter Name/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  it('submits form and shows success message', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Registered' } });

    renderWithRouter(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Name/i), {
      target: { value: 'Bhavani' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'student' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
      target: { value: 'bhavani@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: 'securepass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Registration successful/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failed registration', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Registration failed' } },
    });

    renderWithRouter(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Name/i), {
      target: { value: 'Bhavani' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'student' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
      target: { value: 'bhavani@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: 'securepass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/An error occurred during registration/i)).toBeInTheDocument();
    });
  });
});
