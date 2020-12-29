using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MedicRepository
{
    public class GetOwnerMedic
    {
        public class Query : IRequest<Medic>
        {
            public int ownerID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Medic>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Medic> Handle(Query request, CancellationToken cancellationToken)
            {
                var owner = await _context.DogOwners.Include(dogOwner => dogOwner.OwnerMedic).Include(dogOwner => dogOwner.OwnerMedic.MedicCabinet).SingleOrDefaultAsync(dogOwner => dogOwner.Id == request.ownerID);
                return owner.OwnerMedic;

            }
        }
    }
}