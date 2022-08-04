using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PointComments.Application.Common.Exceptions;
using PointComments.Application.Points.Commands.DeletePoint;
using PointComments.Domain.Entities;
using PointComments.Infrastructure.Persistence;

namespace PointComments.Application.Points.Handlers.CommandHandlers
{
    public class DeletePointCommandHandler : IRequestHandler<DeletePointCommand, Point>
    {
        private readonly ApplicationDbContext _context;

        public DeletePointCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Point> Handle(DeletePointCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Points
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (entity is null)
            {
                throw new NotFoundException(nameof(Point), request.Id);
            }

            _context.Points.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }
}
