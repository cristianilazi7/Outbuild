import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page'; 

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />; 
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => {
    return <a href={href}>{children}</a>;
  },
}));
 
describe('Welcome Page', () => {

  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1, name: /welcome to kanban board/i });
    expect(heading).toBeInTheDocument();
  });


  it('renders the subheading', () => {
    render(<Home />);
    const subheading = screen.getByText(/organize and manage your tasks collaboratively/i);
    expect(subheading).toBeInTheDocument();
  });

  it('renders the Get Started link', () => {
    render(<Home />);
    const getStartedLink = screen.getByRole('link', { name: /get started/i });
    expect(getStartedLink).toBeInTheDocument();
    expect(getStartedLink).toHaveAttribute('href', '/auth/login');
  });

  it('renders the Go to Dashboard link', () => {
    render(<Home />);
    const dashboardLink = screen.getByRole('link', { name: /go to dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });

  it('renders the footer with copyright text', () => {
    render(<Home />);
    const footerText = screen.getByText(/© 2024 Cristian Castro Arias. All rights reserved./i);
    expect(footerText).toBeInTheDocument();
  });

  it('renders the View Repository link', () => {
    render(<Home />);
    const repoLink = screen.getByRole('link', { name: /view repository/i });
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute('href', 'https://github.com/cristianilazi7/Outbuild');
  });
})