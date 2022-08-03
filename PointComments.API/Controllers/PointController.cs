using System.Collections.Generic;
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
        public async Task<IActionResult> GetAllAsync()
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
        public async Task<IActionResult> AddAsync([FromBody] Point point)
        {
            var addedPoint = await _pointService.AddPointAsync(point);

            return CreatedAtAction("GetById", new { id = addedPoint.Id }, addedPoint);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            var point = await _pointService.DeletePointByIdAsync(id);

            return Ok(point);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Point point)
        {
            await _pointService.UpdateAsync(point);

            return Ok();
        }
    }
}
