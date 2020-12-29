using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OwnerRepository
{
    public class ListOwners
    {
        public class Query : IRequest<List<DogOwner>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<DogOwner>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<List<DogOwner>> Handle(Query request, CancellationToken cancellationToken)
            {
                var owners = await _context.DogOwners.Include(dogOwner => dogOwner.OwnerContact).Include(dogOwner => dogOwner.OwnerMedic).ToListAsync();
                return owners;
            }
        }
    }
}