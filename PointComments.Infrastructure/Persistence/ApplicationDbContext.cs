using Microsoft.EntityFrameworkCore;
using PointComments.Domain.Entities;

namespace PointComments.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        { }

        public DbSet<Point> Points => Set<Point>();
    }
}
