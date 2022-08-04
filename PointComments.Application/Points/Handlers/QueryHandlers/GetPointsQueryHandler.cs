using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PointComments.Application.Points.Queries.GetPointsQuery;
using PointComments.Domain.Entities;
using PointComments.Infrastructure.Persistence;

namespace PointComments.Application.Points.Handlers.QueryHandlers
{
    public class GetPointsQueryHandler : IRequestHandler<GetPointsQuery, List<Point>>
    {
        private readonly ApplicationDbContext _context;

        public GetPointsQueryHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Point>> Handle(GetPointsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Points
                .Include(p => p.Comments)
                .ToListAsync(cancellationToken);
        }
    }
}
