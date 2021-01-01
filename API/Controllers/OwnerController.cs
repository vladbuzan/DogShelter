using System;
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

        [HttpGet("{username}/{password}")]
        public async Task<ActionResult<int>> LogIn(string username, string password)
        {
            Console.WriteLine("Here");
            return await _mediator.Send(new ListOwners.LogIn
            {
                Username = username,
                Password = password,
            });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(PostOwner.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> Update(UpdateInfo.Command command)
        {
            return await _mediator.Send(command);
        }

    }
}