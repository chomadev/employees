import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import EmployeeForm from './employee-form'
import { useContext } from "react"
import { EmployeeContext } from "@/contexts/employee-context"

function EmployeeModal() {
  const {
    employeeModalOpen,
    setEmployeeModalOpen,
  } = useContext(EmployeeContext);

  return (
    <Dialog open={employeeModalOpen} onOpenChange={setEmployeeModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill in the new employee data</DialogTitle>
          <EmployeeForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeModal
