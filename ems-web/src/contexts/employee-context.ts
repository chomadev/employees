import { Employee } from "@/model/employee";
import { EmployeeFormData } from "@/services/employee-service";
import { createContext } from "react";

export const EmployeeContext = createContext({
  employees: {} as Employee[],
  setEmployees: (employees: Employee[]) => { },
  selectedEmployee: {} as Employee,
  setSelectedEmployee: (employee: Employee) => { },
  employeeModalOpen: false,
  setEmployeeModalOpen: (isOpen: boolean) => { },
  handleSave: async (values: EmployeeFormData): Promise<void> => { }
})