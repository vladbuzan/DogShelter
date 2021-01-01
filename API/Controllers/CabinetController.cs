using System.Collections.Generic;
using System.Threading.Tasks;
using Application.CabinetRepository;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CabinetController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CabinetController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cabinet>>> List() 
        {
            return await _mediator.Send(new ListCabinets.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(PostCabinet.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}