using MediatR;
using PointComments.Domain.Entities;

namespace PointComments.Application.Points.Queries.GetPointByIdQuery
{
    public class GetPointByIdQuery : IRequest<Point>
    {
        public int Id { get; set; }
    }
}
