using System.Collections.Generic;
using System.Threading.Tasks;
using Application.MedicRepository;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MedicController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Medic>>> List()
        {
            return await _mediator.Send(new ListMedics.Query());
        }

        [HttpGet("{ownerId}")]
        public async Task<ActionResult<Medic>> GetMedicForOwner(int ownerId)
        {
            return await _mediator.Send(new ListMedics.GetByOwner
            {
                ownerID = ownerId,
            });
        }

        [HttpGet("{username}/{password}")]
        public async Task<ActionResult<int>> LogIn(string username, string password)
        {
            return await _mediator.Send(new ListMedics.LogIn
            {
                Username = username,
                Password = password,
            });
        }
    }
}