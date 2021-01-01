using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.CabinetRepository
{
    public class PostCabinet
    {
        public class Command : IRequest
        {
            public int RegistrationCode { get; set; }
            public string Name { get; set; }
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
                var contact = new Contact
                {
                    Country = request.Country,
                    Town = request.Town,
                    Street = request.Street,
                    Number = request.Number,
                };
                var cabinet = new Cabinet{
                    RegistrationCode = request.RegistrationCode,
                    Name = request.Name,
                    CabinetContact = contact,
                };
                _context.Contacts.Add(contact);
                _context.Cabinets.Add(cabinet);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}