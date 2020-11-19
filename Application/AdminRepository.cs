using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class AdminRepository
    {
        public class Query : IRequest<int> 
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        public class Handler : IRequestHandler<Query, int>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                var admins = await _context.Admins.SingleOrDefaultAsync(admin => admin.Username.Equals(request.Username) && (admin.Password.Equals(request.Password)));
                if(admins != null)
                {
                    return admins.Id;
                } else 
                {
                    return -1;
                }
            }
        }
    }
}