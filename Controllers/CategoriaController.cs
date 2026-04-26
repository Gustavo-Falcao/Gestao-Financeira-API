using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Services.CategoriaService;
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
        public IActionResult Post(CategoriaCreateRequest request)
        {
            return Ok(_service.Add(request));
        }

        [HttpPut("{id}")]
        public IActionResult Put(CategoriaUpdateRequest request, string id)
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