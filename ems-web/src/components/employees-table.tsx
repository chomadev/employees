import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Employee } from "@/model/employee"
import { Pencil, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog"

interface Props {
  employees: Employee[],
  onEditEmployee: (employee: Employee) => void,
  onRemoveEmployee: (id: number) => void,
}
function EmployeesTable(props: Props) {
  const { employees, onEditEmployee, onRemoveEmployee } = props;
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Years</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length > 0
              ? employees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium w-1/4">{employee.lastName + ", " + employee.firstName}</TableCell>
                  <TableCell className="font-medium w-1/4">{employee.jobTitle}</TableCell>
                  <TableCell className="font-medium w-1/4">{employee.email}</TableCell>
                  <TableCell className="font-medium w-1/8">{employee.yearsOfService}</TableCell>
                  <TableCell className="flex flex-row gap-4 w-1/8 text-right">
                    <Button
                      variant='outline'
                      onClick={() => onEditEmployee(employee)} >
                      <Pencil />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='outline'>
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the employee.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onRemoveEmployee(employee.id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
              : <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EmployeesTable
