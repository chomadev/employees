namespace EMS.API.Models;

public class Employee
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string JobTitle { get; set; }
    public DateTime DateOfJoining { get; set; }
    public int YearsOfService
    {
        get
        {
            return (int) (DateTime.UtcNow - DateOfJoining).TotalDays / 365;
        }
    }
}