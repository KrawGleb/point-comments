using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PointComments.Domain.Entities
{
    public class Point
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int X { get; set; }
        
        [Required]
        public int Y { get; set; }

        [Required]
        [Range(0.0, float.MaxValue)]
        public float Radius { get; set; }

        // TODO: Use enum instead of string
        public string Color { get; set; } = "Black";
        
        public List<Comment> Comments { get; set; } 
    }
}
