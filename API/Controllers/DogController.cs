using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DogRepository;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DogController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DogController(IMediator mediator)
        {
            this._mediator = mediator;
        }
        [HttpGet("{ownerId}")]
        public async Task<ActionResult<List<Dog>>> List(int ownerId)
        {
            return await _mediator.Send(new ListDogs.QueryByOwner
            {
                ownerID = ownerId,
            });
        }

        [HttpGet("{medicId}/{dogCode}")]
        public async Task<ActionResult<Dog>> Code(int dogCode)
        {
            var dog = await _mediator.Send(new ListDogs.QueryByCode
            {
                Code = dogCode,
            });
            if (dog != null)
            {
                return dog;
            } else 
            {
                return BadRequest("No matching code exists in the database");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await _mediator.Send(new DeleteDog.Command{
                DogID = id,
            });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Post(PostDog.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}