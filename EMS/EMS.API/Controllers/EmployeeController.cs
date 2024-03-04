using EMS.API.Infrastructure;
using EMS.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMS.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeDbContext _context;

        public EmployeeController(IEmployeeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            var employees = _context.Employees.ToList();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployee(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.ID == id);
            if (employee == null)
                return NotFound();

            return Ok(employee);
        }

        [HttpPost]
        public ActionResult<Employee> AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.ID }, employee);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateEmployee(int id, Employee employee)
        {
            var updatedEmployee = _context.Employees.FirstOrDefault(e => e.ID == id);
            if (updatedEmployee == null)
                return NotFound();

            updatedEmployee.FirstName = employee.FirstName;
            updatedEmployee.LastName = employee.LastName;
            updatedEmployee.Email = employee.Email;
            updatedEmployee.JobTitle = employee.JobTitle;
            updatedEmployee.DateOfJoining = employee.DateOfJoining;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.ID == id);
            if (employee == null)
                return NotFound();

            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return NoContent();
        }
    }

}
