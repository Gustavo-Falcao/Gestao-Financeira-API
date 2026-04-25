using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
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
            }
        }
    }
}