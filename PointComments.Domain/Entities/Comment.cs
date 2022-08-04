using System.ComponentModel.DataAnnotations;

namespace PointComments.Domain.Entities
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public string BackgroundColor { get; set; }
    }
}
