using System.Collections.Generic;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using System.Linq;

namespace Application.DogRepository
{
    public class ListDogs
    {
        public class QueryByOwner : IRequest<List<Dog>>
        {
            public int ownerID { get; set; }
        }

        public class QueryByCode : IRequest<Dog>
        {
            public int Code { get; set; }
        }

        public class OwnerDogHandler : IRequestHandler<QueryByOwner, List<Dog>>
        {
            private readonly DataContext _context;
            public OwnerDogHandler(DataContext context)
            {
                this._context = context;
            }
            public async Task<List<Dog>> Handle(QueryByOwner request, CancellationToken cancellationToken)
            {
                return await _context.Dogs.Where(dog => dog.Owner.Id == request.ownerID).Include(dog => dog.Owner).ToListAsync();
            }
        }
        public class CodeDogHandler : IRequestHandler<QueryByCode, Dog>
        {
            private readonly DataContext _context;
            public CodeDogHandler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Dog> Handle(QueryByCode request, CancellationToken cancellationToken)
            {
                return await _context.Dogs.Include(Dog => Dog.Owner).Include(Dog => Dog.Owner.OwnerContact).SingleOrDefaultAsync(Dog => Dog.Code == request.Code);
            }
        }
    }
}