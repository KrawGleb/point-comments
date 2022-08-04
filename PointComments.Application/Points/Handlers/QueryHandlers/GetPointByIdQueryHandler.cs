using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PointComments.Application.Points.Queries.GetPointByIdQuery;
using PointComments.Domain.Entities;
using PointComments.Infrastructure.Persistence;

namespace PointComments.Application.Points.Handlers.QueryHandlers
{
    public class GetPointByIdQueryHandler : IRequestHandler<GetPointByIdQuery, Point>
    {
        private readonly ApplicationDbContext _context;

        public GetPointByIdQueryHandler(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Point> Handle(GetPointByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Points
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);
        }
    }
}
