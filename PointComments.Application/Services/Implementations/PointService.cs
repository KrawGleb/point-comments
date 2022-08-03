using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Point> UpdateAsync(Point point)
        {
            var savedPoint = await GetPointByIdAsync(point.Id);

            if (savedPoint is not null)
            {
                _context.Entry(savedPoint).CurrentValues.SetValues(point);

                foreach (var comment in savedPoint.Comments)
                {
                    if (!point.Comments.Any(c => c.Id == comment.Id))
                    {
                        _context.Comments.Remove(comment);
                    }
                }

                foreach (var commment in point.Comments)
                {
                    var savedComment = savedPoint.Comments
                        .Where(c => c.Id == commment.Id && c.Id != default)
                        .SingleOrDefault();

                    if (savedComment is not null)
                    {
                        _context.Entry(savedComment).CurrentValues.SetValues(commment);
                    }
                    else
                    {
                        var newComment = new Comment
                        {
                            Text = commment.Text,
                            BackgroundColor = commment.BackgroundColor
                        };
                        savedPoint.Comments.Add(newComment);
                    }
                }

                await _context.SaveChangesAsync();
            }

            return savedPoint;
        }

        public async Task AddCommentToPointAsync(int pointId, Comment comment)
        {
            var point = await GetPointByIdAsync(pointId);

            point.Comments.Add(comment);

            await _context.SaveChangesAsync();
        }
    }
}
