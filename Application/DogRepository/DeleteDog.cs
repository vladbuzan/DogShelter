using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.DogRepository
{
    public class DeleteDog
    {
        public class Command : IRequest
        {
            public int DogID { get; set; }
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
                var d = await _context.Dogs.FindAsync(request.DogID);
                if(d == null)
                {
                    throw new System.Exception("Could not find dog");
                }
                _context.Remove(d);
                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;
                throw new System.Exception("Problem saving changes");
            }
        }
    }
}