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
            try
            {
                return Ok(_service.GetAll());
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            try
            {
                return Ok(_service.GetById(id));
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(TransacaoCreateRequest request)
        {
            return Ok(_service.Add(request));
        }

        [HttpPut("{id}")]
        public IActionResult Put(TransacaoUpdateRequest request, string id)
        {
            try
            {
                _service.Update(request, id);
                return Ok("Atualizado com sucesso");
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                _service.Delete(id);
                return Ok("Removido com sucesso");
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}