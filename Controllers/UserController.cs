using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.Users;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UserController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repo.GetAll());
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
                var user = _repo.GetById(id);
                return Ok(user);
            } catch (Exception e)
            {
                return NotFound(e.Message);
            }

        }

        [HttpPost]
        public IActionResult Post(UserPostRequestBody userPostRequestBody)
        {
            return Ok(_repo.Add(userPostRequestBody));
        }

        [HttpPut("{id}")]
        public IActionResult Put(User user, string id)
        {
            try
            {
                _repo.Update(user, id);
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
                _repo.Delete(id);
                return Ok("Removido com sucesso");
            } catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}