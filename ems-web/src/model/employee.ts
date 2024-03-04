export type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  yearsOfService: number
  dateOfJoining: Date
}

export const employeeMockData: Employee[] = [
  {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "jobTitle": "string",
    yearsOfService: 1,
    dateOfJoining: new Date()
  },
  {
    "id": 2,
    "firstName": "veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery",
    "lastName": "long naaaaaaaaaaame",
    "email": "string",
    "jobTitle": "string",
    yearsOfService: 1,
    dateOfJoining: new Date()
  }
]