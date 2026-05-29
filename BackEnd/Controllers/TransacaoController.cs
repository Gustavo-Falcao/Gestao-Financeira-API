using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Services.TransacaoService;
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

        [HttpGet]
        public IActionResult Get()
        {
           return ExecutarComTratamentoDeException(() =>
           {
                return Ok(_service.GetAll());
           });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_service.GetById(id));
            });
        }

        [HttpPost]
        public IActionResult Post(TransacaoCreateRequest request)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                TransacaoResponseDto transacaoResponseDto = _service.Add(request); 
                
                return Created($"api/transacoes/{transacaoResponseDto.Id}", transacaoResponseDto);
            });
        }

        [HttpPut("{id}")]
        public IActionResult Put(TransacaoUpdateRequest request, string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
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