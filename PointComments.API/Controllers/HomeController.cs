using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PointComments.Infrastructure.Persistence;

namespace PointComments.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _contenxt;

        public HomeController(ApplicationDbContext contenxt)
        {
            _contenxt = contenxt;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _contenxt.Comments.Add(new Domain.Entities.Comment()
            {
                Text = "Test",
                BackgroundColor = "Red"
            });

            await _contenxt.SaveChangesAsync();

            return Ok(_contenxt.Comments.ToList());
        }
    }
}
