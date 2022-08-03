using System.Collections.Generic;
using System.Threading.Tasks;
using PointComments.Domain.Entities;

namespace PointComments.Application.Services.Interfaces
{
    public interface IPointService
    {
        Task<IEnumerable<Point>> GetAllPointsAsync();
        Task<Point> GetPointByIdAsync(int pointId);
        Task<Point> AddPointAsync(Point point);
        Task<Point> DeletePointByIdAsync(int pointId);
        Task<Point> UpdateAsync(Point point);
        Task AddCommentToPointAsync(int pointId, Comment comment);
    }
}
