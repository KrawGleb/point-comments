using System.Threading;
using System.Threading.Tasks;
using MediatR;
using PointComments.Application.Points.Commands.CreatePoint;
using PointComments.Domain.Entities;
using PointComments.Infrastructure.Persistence;

namespace PointComments.Application.Points.Handlers.CommandHandlers
{
    public class CreatePointCommandHandler : IRequestHandler<CreatePointCommand, Point>
    {
        private readonly ApplicationDbContext _context;

        public CreatePointCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Point> Handle(CreatePointCommand request, CancellationToken cancellationToken)
        {
            var entity = new Point
            {
                Id = request.Id,
                X = request.X,
                Y = request.Y,
                Radius = request.Radius,
                Color = request.Color,
                Comments = request.Comments
            };

            _context.Points.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }
}
