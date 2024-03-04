using EMS.API.Controllers;
using EMS.API.Infrastructure;
using EMS.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace EMS.API.Tests.Controllers
{
    public class EmployeeControllerTests
    {
        private readonly List<Employee> expectedEmployees = new()
        {
            new Employee { ID = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", JobTitle = "Developer", DateOfJoining = DateTime.Now },
            new Employee { ID = 2, FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", JobTitle = "Manager", DateOfJoining = DateTime.Now }
        };

        private EmployeeDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<EmployeeDbContext>()
                .UseInMemoryDatabase("fakeDb", new InMemoryDatabaseRoot())
                .Options;

            var employeeDbContext = new EmployeeDbContext(options);
            employeeDbContext.AddRange(expectedEmployees);
            employeeDbContext.SaveChanges();
            return employeeDbContext;
        }

        [Fact]
        public void GetEmployees_ShouldReturnAllEmployees()
        {
            // Arrange
            var controller = new EmployeeController(GetDbContext());
            // Act
            var result = controller.GetEmployees();
            var actualEmployees = ((ObjectResult)result.Result).Value as List<Employee>;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedEmployees.First().ID, actualEmployees.First().ID);
        }

        [Fact]
        public void GetEmployee_WithValidId_ShouldReturnEmployee()
        {
            // Arrange
            var controller = new EmployeeController(GetDbContext());
            var expectedEmployee = expectedEmployees.First();

            // Act
            var result = controller.GetEmployee(expectedEmployee.ID);
            var actualEmployee = ((ObjectResult)result.Result).Value as Employee;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedEmployee, actualEmployee);
        }

        [Fact]
        public void GetEmployee_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            var controller = new EmployeeController(GetDbContext());
            var invalidID = -1;

            // Act
            var result = controller.GetEmployee(invalidID);

            // Assert
            Assert.True(result.Result is NotFoundResult);
        }

        [Fact]
        public void CreateEmployees_ShouldReturnCreatedEmployee()
        {
            // Arrange
            var controller = new EmployeeController(GetDbContext());
            var newEmployee = new Employee { ID = 3, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", JobTitle = "Developer", DateOfJoining = DateTime.Now };
            controller.AddEmployee(newEmployee);

            // Act
            var result = controller.GetEmployee(3);
            var actualEmployees = ((ObjectResult)result.Result).Value as Employee;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(newEmployee.ID, actualEmployees.ID);
        }

        [Fact]
        public void UpdateEmployees_ShouldPerformChanges()
        {
            // Arrange
            var controller = new EmployeeController(GetDbContext());
            var employee = expectedEmployees[0];
            employee.FirstName = "Changed FirstName";
            employee.LastName = "Changed LastName";
            employee.JobTitle = "Changed JobTitle";
            employee.Email = "Changed Email";
            employee.DateOfJoining = new DateTime();
            controller.UpdateEmployee(employee.ID, employee);

            // Act
            var result = controller.GetEmployee(employee.ID);
            var actualEmployees = ((ObjectResult)result.Result).Value as Employee;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(employee.ID, actualEmployees.ID);
            Assert.Equal(employee.FirstName, actualEmployees.FirstName);
            Assert.Equal(employee.LastName, actualEmployees.LastName);
            Assert.Equal(employee.JobTitle, actualEmployees.JobTitle);
            Assert.Equal(employee.Email, actualEmployees.Email);
            Assert.Equal(employee.DateOfJoining, actualEmployees.DateOfJoining);
        }

        [Fact]
        public void DeleteEmployees_ShouldPerformChanges()
        {
            // Arrange
            var controller = new EmployeeController(GetDbContext());
            controller.DeleteEmployee(1);

            // Act
            var result = controller.GetEmployee(1);

            // Assert
            Assert.True(result.Result is NotFoundResult);
        }
    }
}
