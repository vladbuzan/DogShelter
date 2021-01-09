using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OwnerRepository
{
    public class UpdateInfo
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string NewCountry { get; set; }
            public string NewTown { get; set; }
            public string NewStreet { get; set; }
            public int NewNumber { get; set; }
            public string NewMail { get; set; }
            public string NewPassword {get; set; }
            public string NewUsername {get; set;}
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
                // var dogOwner = await _context.DogOwners.Include(owner => owner.OwnerContact).SingleOrDefaultAsync(owner => owner.Id == request.Id);
                // var contact = dogOwner.OwnerContact;
                // if(request.NewCountry != null)
                // {
                //     contact.Country = request.NewCountry;
                // }
                // _context.Contacts.Update(contact);
                // _context.SaveChanges();
                Console.WriteLine(request.Id);
                Console.WriteLine(request.NewCountry);
                Console.WriteLine(request.NewTown);
                Console.WriteLine(request.NewStreet);
                Console.WriteLine(request.NewMail);
                return Unit.Value;
            }
        }
    }
}