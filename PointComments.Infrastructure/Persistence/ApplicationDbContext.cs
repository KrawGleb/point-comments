using System.Reflection;
using Microsoft.EntityFrameworkCore;
using PointComments.Domain.Entities;

namespace PointComments.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        { }

        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<Point> Points => Set<Point>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Do I realy need to configure tables here? 
            // Maybe use attributes instead
            // modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }
    }
}
