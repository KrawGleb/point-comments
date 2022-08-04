using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PointComments.Domain.Entities
{
    public class Point
    {
        [Key]
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public float Radius { get; set; }
        public string Color { get; set; } = "Black";
        public List<Comment> Comments { get; set; } 
    }
}
