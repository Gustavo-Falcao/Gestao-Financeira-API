using System.Security.Claims;
using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Services.TransacaoService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _service;

        public TransacaoController(ITransacaoService service)
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

        [Authorize]
        [HttpGet("byUser")]
        public IActionResult GetByUserLogado()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();

                var transacoes = _service.GetByUsuarioId(userId);

                return Ok(transacoes);
            });
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(TransacaoCreateRequest request)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if(string.IsNullOrWhiteSpace(userId))
                    return Unauthorized();

                request.UsuarioId = userId;

                TransacaoResponseDto transacaoResponseDto = _service.Add(request); 
                
                return Created();
            });
        }

        [Authorize]
        [HttpPatch("{id}")]
        public IActionResult Patch(TransacaoUpdateRequest request, string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                _service.Update(request, id);
                return Ok("Atualizado com sucesso");
            });            
        }

        [Authorize]
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