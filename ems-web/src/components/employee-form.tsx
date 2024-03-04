import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import dayjs from 'dayjs';
import { EmployeeFormData, employeeSchema } from '@/services/employee-service';
import { useContext } from 'react';
import { EmployeeContext } from '@/contexts/employee-context';

function EmployeeForm() {
  const {
    selectedEmployee,
    handleSave,
  } = useContext(EmployeeContext);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: selectedEmployee,
  })

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSave)}>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder='abc@xyz.com' />
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name='jobTitle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name='dateOfJoining'
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Joined at</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                    >
                      {field.value
                        ? dayjs(field.value).format('DD MMM YYYY')
                        : <span>Pick a date</span>
                      }
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    fixedWeeks
                    selected={field.value}
                    onDayClick={field.onChange}
                    captionLayout="dropdown-buttons"
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        >
        </FormField>
        <div className='flex w-full justify-end'>
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  )
}

export default EmployeeForm
