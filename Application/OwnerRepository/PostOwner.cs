using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OwnerRepository
{
    public class PostOwner
    {
        public class Command : IRequest
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public int OwnerMedicId { get; set; }
            public string Country { get; set; }
            public string Town { get; set; }
            public string Street { get; set; }
            public int Number { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var medic = await _context.Medics.SingleOrDefaultAsync(_medic => _medic.Id == request.OwnerMedicId);

                var contact = new Contact 
                {
                    Country = request.Country,
                    Town = request.Town,
                    Street = request.Street,
                    Number = request.Number,
                };

                var owner = new DogOwner 
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Username = request.Username,
                    Email = request.Email,
                    Password = request.Password,
                    OwnerMedic = medic,
                    OwnerContact = contact,
                };

                Console.WriteLine("Got here");
                Console.WriteLine(owner.OwnerContact.Id);
                return Unit.Value;
            }
        }
    }

}