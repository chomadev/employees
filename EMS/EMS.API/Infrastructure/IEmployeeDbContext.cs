using EMS.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Diagnostics.CodeAnalysis;

namespace EMS.API.Infrastructure
{
    public interface IEmployeeDbContext
    {
        DbSet<Employee> Employees { get; set; }
        int SaveChanges();
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
