using System.Security.Claims;
using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Services.DashboardService;
using Gestao_Financeira.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/users")]
    public class AdminUserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDashboardService _dashboardService;

        public AdminUserController(IUserService userService, IDashboardService dashboardService)
        {
            _userService = userService;
            _dashboardService = dashboardService;
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
        [HttpGet("dashboard")]
        public IActionResult GetDashboard()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();

                return Ok(_dashboardService.GetDashboardByAdmin(userId));
            });
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var user = _userService.GetUserById(id);
                return Ok(user);
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