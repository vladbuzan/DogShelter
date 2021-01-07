using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application;
using Application.OwnerRepository;
using Application.MedicRepository;
using Application.CabinetRepository;
using Application.DogRepository;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //set up database as a service
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection")); // default connection defined in appsettings.json
            });
            services.AddCors(opt =>{
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(AdminRepository.Handler).Assembly);
            services.AddMediatR(typeof(ListOwners.Handler).Assembly);
            services.AddMediatR(typeof(ListOwners.LogInHandler).Assembly);
            services.AddMediatR(typeof(ListMedics.Handler).Assembly);
            services.AddMediatR(typeof(ListMedics.OwnerMedicHandler).Assembly);
            services.AddMediatR(typeof(PostOwner.Handler).Assembly);
            services.AddMediatR(typeof(UpdateInfo.Handler).Assembly);
            services.AddMediatR(typeof(ListCabinets.Query).Assembly);
            services.AddMediatR(typeof(PostCabinet.Handler).Assembly);
            services.AddMediatR(typeof(ListDogs.OwnerDogHandler).Assembly);
            services.AddMediatR(typeof(ListDogs.CodeDogHandler).Assembly);
            services.AddMediatR(typeof(DeleteDog.Handler).Assembly);
            services.AddMediatR(typeof(PostDog.Handler).Assembly);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseMvc();
        }
    }
}
