using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PointComments.Application.Services.Interfaces;
using PointComments.Domain.Entities;

namespace PointComments.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointController : ControllerBase
    {
        private readonly IPointService _pointService;

        public PointController(IPointService pointService)
        {
            _pointService = pointService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var points = await _pointService.GetAllPointsAsync();

            return Ok(points);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var point = await _pointService.GetPointByIdAsync(id);

            return Ok(point);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Point point)
        {
            var savedPoint = await _pointService.AddPointAsync(point);

            return CreatedAtAction("GetById", new { id = savedPoint.Id }, savedPoint);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            var point = await _pointService.DeletePointByIdAsync(id);

            return Ok(point);
        }

        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] Point point)
        {
            var updatedPoint = await _pointService.UpdateAsync(point);

            return Ok(updatedPoint);
        }
    }
}
