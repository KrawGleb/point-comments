using System.ComponentModel.DataAnnotations;

namespace PointComments.Domain.Entities
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        public string Text { get; set; }
        // TODO: Use enum instead of string
        public string BackgroundColor { get; set; }
    }
}
