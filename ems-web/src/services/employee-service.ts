import z from 'zod';
import { client } from "@/lib/api";
import { Employee } from "@/model/employee";

export async function createEmployee(employee: EmployeeFormData): Promise<Employee> {
  return await client.post('/employee', employee);
}

export async function updateEmployee(employee: EmployeeFormData): Promise<Employee> {
  return await client.put(`/employee/${employee.id}`, employee);
}

export async function listAllEmployees(): Promise<Employee[]> {
  const response = await client.get('/employee');
  return response.data;
}

export async function deleteEmployee(id: number): Promise<void> {
  await client.delete(`/employee/${id}`);
}

export const employeeSchema = z.object({
  id: z.number().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  jobTitle: z.string(),
  dateOfJoining: z.date()
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

