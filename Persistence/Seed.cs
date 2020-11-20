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
            if(!context.Cabinets.Any())
            {
                var contacts = new List<Contact>
                {
                    new Contact
                    {
                        Country = "Romania",
                        Town = "Cluj",
                        Street = "Jean-Jaures",
                        Number = 7,
                    },
                    new Contact{
                        Country = "Austria",
                        Town = "Timisoara",
                        Street = "Eminescu",
                        Number = 24,
                    },
                    new Contact
                    {
                        Country = "Romania",
                        Town = "Bucuresti",
                        Street = "Arnautovici",
                        Number = 21,
                    },
                    new Contact
                    {
                        Country = "Romania",
                        Town = "Bucuresti",
                        Street = "Dambovitei",
                        Number = 51,
                    }
                };
                var cabinets = new List<Cabinet>
                {
                    new Cabinet
                    {
                        RegistrationCode = 1221,
                        Name = "Cluj Pet Lovers",
                        CabinetContact = contacts[0],
                    },
                    new Cabinet
                    {
                        RegistrationCode = 3335,
                        Name = "Dog Foster Timisoara",
                        CabinetContact = contacts[1],
                    }
                };
                var medics = new List<Medic> {
                    new Medic
                    {
                        MedicCabinet = cabinets[1],
                        FirstName = "Andrei",
                        LastName = "Gavril",
                        Email = "andreiG90@gmail.com",
                        Username = "andreiGavr99",
                        Password = "andreigggg",
                    },
                    new Medic
                    {
                        MedicCabinet = cabinets[0],
                        FirstName = "Vasile",
                        LastName = "Pop",
                        Email = "popVasil3@gmail.com",
                        Username = "vasiPOP",
                        Password = "popica",
                    }
                };
                var owners = new List<DogOwner>
                {
                    new DogOwner
                    {
                        FirstName = "Mihnea",
                        LastName = "Popescu",
                        Username = "mihneaPopescuPT",
                        Email = "popescuM@yahoo.com",
                        Password = "popescuMicc",
                        OwnerMedic = medics[1],
                        OwnerContact = contacts[3],
                    },
                    new DogOwner
                    {
                        FirstName = "Mihai",
                        LastName = "Valdescu",
                        Username = "miahiVladescu",
                        Email = "vladescuM@yahoo.com",
                        Password = "vladmihc",
                        OwnerMedic = medics[0],
                        OwnerContact = contacts[2],
                    },
                };
                var dogs = new List<Dog>
                {
                    new Dog
                    {
                        Name = "Buxi",
                        Code = 111222333,
                        Owner = owners[1],
                    },
                    new Dog
                    {
                        Name = "Bruno",
                        Code = 111444333,
                        Owner = owners[0],
                    }
                };
                context.Contacts.AddRange(contacts);
                context.Cabinets.AddRange(cabinets);
                context.Medics.AddRange(medics);
                context.DogOwners.AddRange(owners);
                context.Dogs.AddRange(dogs);
                context.SaveChanges();
            }
        }
    }
}