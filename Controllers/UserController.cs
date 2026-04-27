using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos.UserDTOs;
using Gestao_Financeira.Services.ProfileService;
using Gestao_Financeira.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IProfileService _profileService;

        public UserController(IUserService userService, IProfileService profileService)
        {
            _userService = userService;
            _profileService = profileService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_userService.GetAll());
            });
        }

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
                return Created($"api/users/{userResponseDto.Id}", userResponseDto);
            });
        }

        [HttpPut("{id}")]
        public IActionResult Put(UserUpdateRequest userUpdateRequest, string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                _userService.Update(userUpdateRequest, id);
                return Ok("Atualizado com sucesso"); 
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            return ExecutarComTratamentoDeException(() =>
                {
                    _userService.Delete(id);
                    return Ok("Removido com sucesso");
                });
        }

        [HttpGet("{id}/perfil")]
        public IActionResult GetProfileById(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_profileService.GetProfileById(id));
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