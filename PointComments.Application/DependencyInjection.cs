﻿using Microsoft.Extensions.DependencyInjection;
using PointComments.Application.Services.Implementations;
using PointComments.Application.Services.Interfaces;

namespace PointComments.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddTransient<IPointService, PointService>();

            return services;
        }
    }
}
