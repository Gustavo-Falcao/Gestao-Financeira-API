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
            try
            {
                return Ok(_userService.GetAll());
            } catch (Exception e)
            {
                return NotFound(e.Message);
            }
         }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            try
            {
                var user = _userService.GetById(id);
                return Ok(user);
            } catch (Exception e)
            {
                return NotFound(e.Message);
            }

        }

        [HttpPost]
        public IActionResult Post(UserCreateRequest userCreateRequest)
        {
            return Ok(_userService.Add(userCreateRequest));
        }

        [HttpPut("{id}")]
        public IActionResult Put(UserUpdateRequest userUpdateRequest, string id)
        {
            try
            {
                _userService.Update(userUpdateRequest, id);
                return Ok("Atualizado com sucesso");
            } catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                _userService.Delete(id);
                return Ok("Removido com sucesso");
            } catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}