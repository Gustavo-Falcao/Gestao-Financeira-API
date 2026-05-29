using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Services.AuthenticationService;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        
        [HttpPost("login")]
        public IActionResult Login(UserLoginRequestDto userLoginRequestDto)
        {
            try
            {
                var response = _authenticationService.Login(userLoginRequestDto);
                return Ok(response);
                
            } catch(InvalidCredentialsException e)
            {
                return Unauthorized(new { message = e.Message} );
            }
        }
    }
}