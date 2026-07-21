using System.Security.Claims;
using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Services.CategoriaService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _service;

        public CategoriaController(ICategoriaService service)
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

        [Authorize]
        [HttpGet("byUser")]
        public IActionResult GetByUserLogado()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();

                var categorias = _service.GetByUsuarioId(userId);

                return Ok(categorias);
            });
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(CategoriaCreateRequest request)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();
          
                request.UsuarioId = userId;
                CategoriaResponseDto categoriaResponseDto = _service.Add(request);
                
                return Created();
            });
        }

        [Authorize]
        [HttpPatch("{id}")]
        public IActionResult Patch(CategoriaUpdateRequest request, string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


                _service.Update(request, id);
                return Ok("Atualizado com sucesso");
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                _service.Delete(id);
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
                return NotFound(new {message = e.Message});
            } catch (ValidationException e)
            {
                return BadRequest(new {message = e.Message});
            }
        }
    }
}