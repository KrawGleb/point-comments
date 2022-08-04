using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PointComments.Application.Points.Commands.CreatePoint;
using PointComments.Application.Points.Commands.DeletePoint;
using PointComments.Application.Points.Commands.UpdatePoint;
using PointComments.Application.Points.Queries.GetPointByIdQuery;
using PointComments.Application.Points.Queries.GetPointsQuery;
using PointComments.Application.Services.Interfaces;
using PointComments.Domain.Entities;

namespace PointComments.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointsController : ApiControllerBase
    {
        private readonly IPointService _pointService;

        public PointsController(IPointService pointService)
        {
            _pointService = pointService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Point>>> Get()
        {
            return await Mediator.Send(new GetPointsQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Point>> Get(int id)
        {
            return await Mediator.Send(new GetPointByIdQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Point>> Create([FromBody] CreatePointCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Point>> Delete([FromRoute] DeletePointCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut]
        public async Task<ActionResult<Point>> Update([FromBody] UpdatePointCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
