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
        //this will seed the database with some values
        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder.Entity<Value>().HasData( 
                new Value {Id = 1, Name = "Value 101"},
                new Value {Id = 2, Name = "Value 102"},
                new Value {Id = 3, Name = "Value 103"}
            );
        }

    }
}
