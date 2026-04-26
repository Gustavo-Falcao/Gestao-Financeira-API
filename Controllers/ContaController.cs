using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos.ContaDTOs;
using Gestao_Financeira.Services.ContaService;
using Microsoft.AspNetCore.Mvc;

namespace Gestao_Financeira.Controllers
{
    [ApiController]
    [Route("api/contas")]
    public class ContaController : ControllerBase
    {
        private readonly IContaService _contaService;

        public ContaController(IContaService contaService)
        {
            _contaService = contaService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_contaService.GetAll()); 
            });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_contaService.GetById(id));
            });
        }

        [HttpPost]
        public IActionResult Post(ContaCreateRequest request)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                return Ok(_contaService.Add(request));    
            });
        }

        [HttpPut("{id}")]
        public IActionResult Put(ContaUpdateRequest request, string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                _contaService.Update(request, id);
                return Ok("Atualizado com sucesso");
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            return ExecutarComTratamentoDeException(() =>
            {
                _contaService.Delete(id);
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