using EMS.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EMS.API.Infrastructure
{
    public class EmployeeDbContext : DbContext, IEmployeeDbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Employee>().Ignore(e => e.YearsOfService);
        }
    }

}