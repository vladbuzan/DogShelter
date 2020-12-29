using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.OwnerRepository;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IMediator _mediator;
        
        public OwnerController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<DogOwner>>> List()
        {
            return await _mediator.Send(new ListOwners.Query());
        }
    }
}