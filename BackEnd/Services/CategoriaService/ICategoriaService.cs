using Gestao_Financeira.Models.Dtos;

namespace Gestao_Financeira.Services.CategoriaService
{
    public interface ICategoriaService
    {
        List<CategoriaResponseDto> GetAll();
        List<CategoriaResponseDto> GetByUsuarioId(string usuarioId);
        CategoriaResponseDto GetById(string id);
        void ExistsById(string id);
        CategoriaResponseDto Add(CategoriaCreateRequest request);
        void Update(CategoriaUpdateRequest request, string id);
        void Delete(string id);
    }
}