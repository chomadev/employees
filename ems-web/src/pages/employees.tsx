import { useEffect, useState } from 'react';
import EmployeesTable from '../components/employees-table'
import EmployeeModal from '@/components/employee-modal';
import { EmployeeContext } from '@/contexts/employee-context';
import { Employee } from '@/model/employee';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { EmployeeFormData, createEmployee, updateEmployee, deleteEmployee, listAllEmployees } from '@/services/employee-service';
import { Input } from '@/components/ui/input';

interface Props { }

function Employees(props: Props) {
  const { } = props
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesFiltered, setEmployeesFiltered] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>({} as Employee);
  const [employeeModalOpen, setEmployeeModalOpen] = useState<boolean>(false);
  const [employeeSearch, setEmployeeSearch] = useState<string>('');

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (employeeSearch) {
      setEmployeesFiltered(
        employees.filter(e => {
          const lowerCaseFilter = employeeSearch.toLowerCase();
          return e.firstName.toLowerCase().indexOf(lowerCaseFilter) >= 0
            || e.lastName.toLowerCase().indexOf(lowerCaseFilter) >= 0
            || e.jobTitle.toLowerCase().indexOf(lowerCaseFilter) >= 0
        })
      );
    } else {
      clearFilters();
    }
  }, [employeeSearch, employees]);

  function handleNewEmployee() {
    setSelectedEmployee({} as Employee);
    setEmployeeModalOpen(true);
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEmployeeModalOpen(true);
  }

  const handleRemoveEmployee = (id: number) => {
    deleteEmployee(id).then(() => {
      loadEmployees();
    })
  }

  const loadEmployees = (): void => {
    listAllEmployees().then(data => setEmployees(data));
  }

  const clearFilters = (): void => {
    setEmployeeSearch('');
    setEmployeesFiltered(employees);
  }

  const handleSave = async (values: EmployeeFormData): Promise<void> => {
    if (values.id) {
      await updateEmployee(values);
    } else {
      await createEmployee(values);
    }
    loadEmployees();
    setEmployeeModalOpen(false);
  }

  return (
    <div>
      <EmployeeContext.Provider value={{
        employees,
        setEmployees,
        selectedEmployee,
        setSelectedEmployee,
        employeeModalOpen,
        setEmployeeModalOpen,
        handleSave
      }}>
        <div className='flex flex-row gap-4 items-center w-full'>
          <h1 className='w-7/12 text-4xl m-4'>Employees</h1>
          <div className='w-4/12 flex flex-row items-center'>
            <Input
              placeholder='Search'
              value={employeeSearch}
              onChange={(e) => setEmployeeSearch(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Escape') clearFilters();
              }} />
            {employeeSearch
              && <div className='-ml-8 text-muted-foreground'>
                <X
                  className='hover:text-foreground'
                  onClick={() => clearFilters()}
                />
              </div>}
          </div>
          <div className='w-1/12'>
            <Button onClick={() => handleNewEmployee()}>
              <Plus /> Add
            </Button>
          </div>
        </div>
        <EmployeesTable
          employees={employeesFiltered}
          onEditEmployee={handleEditEmployee}
          onRemoveEmployee={handleRemoveEmployee}
        />
        <EmployeeModal />
      </EmployeeContext.Provider>
    </div>
  )
}

export default Employees
