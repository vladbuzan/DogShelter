using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Application;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AdminController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet("{username}/{password}")]
        public async Task<ActionResult<int>> LogIn(string username, string password)
        {
            return await _mediator.Send(new AdminRepository.Query
            {
                Username = username,
                Password = password,
            });
        }


    }
}