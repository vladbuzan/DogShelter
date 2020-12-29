using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MedicRepository
{
    public class ListMedics
    {
        public class Query : IRequest<List<Medic>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Medic>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;

            }
            public async Task<List<Medic>> Handle(Query request, CancellationToken cancellationToken)
            {
                var medics = await _context.Medics.Include(medic => medic.MedicCabinet).ToListAsync();
                return medics;
            }
        }
    }
}