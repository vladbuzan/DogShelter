using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MedicRepository
{
    public class PostMedic
    {
        public class Command : IRequest<int>
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int Code { get; set; }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly DataContext _context;
            public Handler (DataContext context)
            {
                this._context = context;
            }
            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var cabinet = await _context.Cabinets.SingleOrDefaultAsync(cab => cab.RegistrationCode.Equals(request.Code));
                if (cabinet == null) 
                {
                    return -1;
                }
                var medic = new Medic{
                    MedicCabinet = cabinet,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Username = request.Username,
                    Password = request.Password,
                };
                _context.Medics.Add(medic);
                var changes = await _context.SaveChangesAsync();
                if(changes < 1)
                {
                    return -2;
                }         
                return 1;
            }
        }
    }
}