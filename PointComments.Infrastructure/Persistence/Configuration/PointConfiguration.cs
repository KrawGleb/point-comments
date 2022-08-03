using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PointComments.Domain.Entities;

namespace PointComments.Infrastructure.Persistence.Configuration
{
    public class PointConfiguration : IEntityTypeConfiguration<Point>
    {
        public void Configure(EntityTypeBuilder<Point> builder)
        {
            builder.HasMany(p => p.Comments);
        }
    }
}
