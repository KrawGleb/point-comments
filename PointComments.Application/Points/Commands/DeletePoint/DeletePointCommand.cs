using MediatR;
using PointComments.Domain.Entities;

namespace PointComments.Application.Points.Commands.DeletePoint
{
    public class DeletePointCommand : IRequest<Point>
    {
        public int Id { get; set; }
    }
}
