using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PointComments.Application.Services.Interfaces;
using PointComments.Domain.Entities;
using PointComments.Infrastructure.Persistence;

namespace PointComments.Application.Services.Implementations
{
    public class PointService : IPointService
    {
        private readonly ApplicationDbContext _context;

        public PointService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Point>> GetAllPointsAsync()
        {
            var points = await _context.Points
                                            .Include(p => p.Comments)
                                            .ToListAsync();
            return points;
        }

        public async Task<Point> GetPointByIdAsync(int pointId)
        {
            var point = await _context.Points
                                    .Include(p => p.Comments)
                                    .FirstOrDefaultAsync(p => p.Id == pointId);

            if (point is null)
            {
                throw new InvalidOperationException("Point not found");
            }

            return point;
        }

        public async Task<Point> AddPointAsync(Point point)
        {
            _context.Points.Add(point);
            await _context.SaveChangesAsync();

            return point;
        }

        public async Task<Point> DeletePointByIdAsync(int pointId)
        {
            var point = await GetPointByIdAsync(pointId);

            _context.Points.Remove(point);

            await _context.SaveChangesAsync();
            return point;
        }

        public async Task UpdateAsync(Point point)
        {
            var oldPoint = await GetPointByIdAsync(point.Id);

            oldPoint.X = point.X;
            oldPoint.Y = point.Y;
            oldPoint.Radius = point.Radius;
            oldPoint.Color = point.Color;
            oldPoint.Comments = point.Comments;

            //_context.Points.Update(oldPoint);

            //_context.Entry(oldPoint).CurrentValues.SetValues(point);

            _context.Entry(oldPoint).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task AddCommentToPointAsync(int pointId, Comment comment)
        {
            var point = await GetPointByIdAsync(pointId);

            point.Comments.Add(comment);

            await _context.SaveChangesAsync();
        }
    }
}
