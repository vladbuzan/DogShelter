using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;

namespace Application.MedicRepository
{
    public class ListMedics
    {
        public class Query : IRequest<List<Medic>>
        {

        }

        public class GetByOwner : IRequest<Medic>
        {
            public int ownerID { get; set; }
        }

        public class LogIn : IRequest<int>
        {
            public string Username { get; set; }
            public string Password { get; set; }
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

        public class OwnerMedicHandler : IRequestHandler<GetByOwner, Medic>
        {
            private readonly DataContext _context;
            public OwnerMedicHandler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Medic> Handle(GetByOwner request, CancellationToken cancellationToken)
            {
                 var owner = await _context.DogOwners.Include(dogOwner => dogOwner.OwnerMedic).Include(dogOwner => dogOwner.OwnerMedic.MedicCabinet).SingleOrDefaultAsync(dogOwner => dogOwner.Id == request.ownerID);
                return owner.OwnerMedic;
            }
        }

        public class LogInHandler : IRequestHandler<LogIn, int>
        {
            private readonly DataContext _context;

            public LogInHandler(DataContext context)
            {
                this._context = context;
            }
            public async Task<int> Handle(LogIn request, CancellationToken cancellationToken)
            {
                var medic = await _context.Medics.SingleOrDefaultAsync(med => med.Username.Equals(request.Username) && med.Password.Equals(request.Password));
                if(medic != null)
                {
                    return medic.Id;
                } else
                {
                    return -1;
                }
            }
        }
    }
}