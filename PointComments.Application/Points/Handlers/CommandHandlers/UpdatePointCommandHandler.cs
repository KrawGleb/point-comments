using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PointComments.Application.Common.Exceptions;
using PointComments.Application.Points.Commands.UpdatePoint;
using PointComments.Domain.Entities;
using PointComments.Infrastructure.Persistence;

namespace PointComments.Application.Points.Handlers.CommandHandlers
{
    public class UpdatePointCommandHandler : IRequestHandler<UpdatePointCommand, Point>
    {
        private readonly ApplicationDbContext _context;

        public UpdatePointCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Point> Handle(UpdatePointCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Points
                .Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (entity is null)
            {
                throw new NotFoundException(nameof(Point), request.Id);
            }

            _context.Entry(entity).CurrentValues.SetValues(request);

            foreach (var comment in entity.Comments)
            {
                if (!request.Comments.Any(c => c.Id == comment.Id))
                {
                    _context.Comments.Remove(comment);
                }
            }

            foreach (var commment in request.Comments)
            {
                var savedComment = entity.Comments
                    .Where(c => c.Id == commment.Id && c.Id != default)
                    .SingleOrDefault();

                if (savedComment is not null)
                {
                    _context.Entry(savedComment).CurrentValues.SetValues(commment);
                }
                else
                {
                    var newComment = new Comment
                    {
                        Text = commment.Text,
                        BackgroundColor = commment.BackgroundColor
                    };
                    entity.Comments.Add(newComment);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }
}
