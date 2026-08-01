using System.Security.Claims;
using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos.UserDTOs;
using Gestao_Financeira.Services.DashboardService;
using Gestao_Financeira.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDashboardService _dashboardService;

        public UserController(IUserService userService, IDashboardService dashboardService)
        {
            _userService = userService;
            _dashboardService = dashboardService;
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult GetMe()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();

                var userSimpleInformation = _userService.GetUserProfileById(userId);
            
                if(userSimpleInformation == null)
                    return NotFound();

                return Ok(userSimpleInformation);
            });
        }

        [Authorize]
        [HttpGet("me/dashboard")]
        public IActionResult GetDashBoard()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();

                var userDashBoard = _dashboardService.GetDashboardByUserId(userId);

                if(userDashBoard is null)
                {
                    return NotFound();
                }

                return Ok(userDashBoard);
            });
        }

        [HttpPost]
        public IActionResult Post(UserCreateRequest userCreateRequest)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                UserResponseDto userResponseDto = _userService.Add(userCreateRequest);
                return Created();
            });
        }

        [Authorize]
        [HttpPatch("me")]
        public IActionResult Patch(UserUpdateRequest userUpdateRequest)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();

                _userService.Update(userUpdateRequest, userId);
                
                return Ok(); 
            });
        }

        private IActionResult ExecutarComTratamentoDeException(Func<IActionResult> acao)
        {
            try
            {
                return acao();
            } catch (NotFoundException e)
            {
                return NotFound(new { message = e.Message });
            } catch (EmailJaCadastradoException e)
            {
                return Conflict(new { message = e.Message});
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message});
            }
        }
    }
}