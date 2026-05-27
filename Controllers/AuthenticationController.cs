using Gestao_Financeira.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost("/login")]
        public IActionResult Login(UserLoginDto userLoginDto)
        {
            
        }
    }
}