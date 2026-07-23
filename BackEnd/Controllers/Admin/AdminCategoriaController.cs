using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Services.CategoriaService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/categorias")]
    public class AdminCategoriaController : ControllerBase
    {
        private readonly ICategoriaService _service;

        public AdminCategoriaController(ICategoriaService service)
        {
            _service = service;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        public IActionResult Get()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_service.GetAll());
            });
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_service.GetById(id));
            });
        }

        private IActionResult ExecutarComTratamentoDeException(Func<IActionResult> acao)
        {
            try
            {
                return acao();
            } catch (NotFoundException e)
            {
                return NotFound(new {message = e.Message});
            } catch (CategoriaEmUsoException e)
            {
                return Conflict(new {message = e.Message});  
            } catch (ValidationException e)
            {
                return BadRequest(new {message = e.Message});
            }
        }
    }
}