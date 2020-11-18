using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context) 
        {
            if(!context.Admins.Any())
            {
                var admins = new List<Admin>
                {
                    new Admin
                    {
                        Username = "vlad",
                        Password = "buzan",
                    },
                    new Admin
                    {
                        Username = "admin",
                        Password = "admin",
                    }
                };
                context.Admins.AddRange(admins);
                context.SaveChanges(); 
            }
        }
    }
}