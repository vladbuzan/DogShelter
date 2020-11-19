using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        // DbContext is a session with the database and is used to query the database and save instances of the entities 
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        // this will be used for the table name in sqlite
        public DbSet<Value> Values {get; set;}
        public DbSet<Admin> Admins {get; set;}
        public DbSet<Dog> Dogs {get; set;}
        public DbSet<DogOwner> DogOwners {get; set;}
       

    }
}
