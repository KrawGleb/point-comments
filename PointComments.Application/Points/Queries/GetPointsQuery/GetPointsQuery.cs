using System.Collections.Generic;
using MediatR;
using PointComments.Domain.Entities;

namespace PointComments.Application.Points.Queries.GetPointsQuery
{
    public class GetPointsQuery : IRequest<List<Point>>
    { }
}
