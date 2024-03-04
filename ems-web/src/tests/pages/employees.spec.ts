import { render, screen } from '@testing-library/react';
import { describe, test, vitest } from 'vitest'
import Employees from '@/pages/employees';
import { client } from '@/lib/api';
import { employeeMockData } from '@/model/employee';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

vitest.mock('client')

let container;



describe("Employees Page", () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test("should render", () => {
    client.get = vitest.fn()
    client.get.mockReturnValue({
      data: employeeMockData
    })
    act(() => {
      const employeesPage = ReactDOM.createRoot(container).render(<Employees />);
      const firstName = screen.queryByText(employeeMockData[0].firstName);
      console.log({ firstName })
      expect(firstName).not.toBe(null);
    })
  })
})