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
                    return Unauthorized("Id do usuário não encontrado no token.");

                var userSimpleInformation = _userService.GetById(userId);
            
                if(userSimpleInformation == null)
                    return NotFound("Perfil não encontrado para o usuário autenticado.");

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
                    return Unauthorized("Id do usuário não encontrado no token.");

                var userDashBoard = _dashboardService.GetDashboardByUserId(userId);

                if(userDashBoard is null)
                {
                    return NotFound("Dashboard não encontrado para o usuário autenticado.");
                }

                return Ok(userDashBoard);
            });
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        public IActionResult Get()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_userService.GetAll());
            });
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var user = _userService.GetById(id);
                return Ok(user);
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
        [HttpPatch("{id}")]
        public IActionResult Patch(UserUpdateRequest userUpdateRequest, string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                _userService.Update(userUpdateRequest, id);
                return Ok("Atualizado com sucesso"); 
            });
        }

        [Authorize (Roles = "ADMIN")]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            return ExecutarComTratamentoDeException(() =>
                {
                    _userService.Delete(id);
                    return Ok("Removido com sucesso");
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