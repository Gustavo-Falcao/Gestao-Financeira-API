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
            try
            {
                return Ok(_contaService.GetAll());
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
                return Ok(_contaService.GetById(id));
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(ContaCreateRequest request)
        {
            return Ok(_contaService.Add(request));
        }

        [HttpPut("{id}")]
        public IActionResult Put(ContaUpdateRequest request, string id)
        {
            try
            {
                _contaService.Update(request, id);
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
                _contaService.Delete(id);
                return Ok("Removido com sucesso");
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}