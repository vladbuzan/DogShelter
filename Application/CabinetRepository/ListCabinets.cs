using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CabinetRepository
{
    public class ListCabinets
    {
        public class Query : IRequest<List<Cabinet>> 
        {

        }   

        public class Handler : IRequestHandler<Query, List<Cabinet>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<List<Cabinet>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Cabinets.ToListAsync();
            }
        }     
    }
}