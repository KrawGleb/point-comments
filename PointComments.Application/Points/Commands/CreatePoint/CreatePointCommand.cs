using System.Collections.Generic;
using MediatR;
using PointComments.Domain.Entities;

namespace PointComments.Application.Points.Commands.CreatePoint
{
    public class CreatePointCommand : IRequest<Point>
    {
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }        
        public float Radius { get; set; }
        public string Color { get; set; } = "Black";
        public List<Comment> Comments { get; set; }
    }
}
