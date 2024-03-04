using EMS.API.Models;

namespace EMS.API.Tests.Models
{
    public class EmployeeTests
    {
        [Fact]
        public void YearsOfExperience_ShouldBeOne_WhenDateFromLastYear()
        {
            var employee = new Employee();
            employee.DateOfJoining = DateTime.Now.AddYears(-1);

            Assert.Equal(1, employee.YearsOfService);
        }

        [Fact]
        public void YearsOfExperience_ShouldBeZero_WhenDateFromThisYear()
        {
            var employee = new Employee();
            employee.DateOfJoining = DateTime.Now;

            Assert.Equal(0, employee.YearsOfService);
        }
    }
}
