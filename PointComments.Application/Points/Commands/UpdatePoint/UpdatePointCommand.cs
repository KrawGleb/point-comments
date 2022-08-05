using System.Collections.Generic;
using MediatR;
using PointComments.Domain.Entities;

namespace PointComments.Application.Points.Commands.UpdatePoint
{
    public class UpdatePointCommand : IRequest<Point>
    {
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public float Radius { get; set; }
        public string Color { get; set; } = "black";
        public List<Comment> Comments { get; set; }
    }
}
