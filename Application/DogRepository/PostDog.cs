using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.DogRepository
{
    public class PostDog
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
            public string Name { get; set; }
            public int Code { get; set; }
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
                var owner = await _context.DogOwners.SingleOrDefaultAsync(Owner => Owner.Username.Equals(request.Username));
                if(owner == null)
                {
                    throw new System.Exception("Owner not found");
                }
                var dog = new Dog {
                    Name = request.Name,
                    Code = request.Code,
                    Owner = owner,
                };
                _context.Add(dog);
                var success = await _context.SaveChangesAsync() > 0;
                if(success)
                {
                    return Unit.Value;
                }
                throw new System.Exception("Problem saving changes to database");

            }
        }
    }
}