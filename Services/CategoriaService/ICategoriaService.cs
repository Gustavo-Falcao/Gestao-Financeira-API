using Gestao_Financeira.Models.Dtos;

namespace Gestao_Financeira.Services.CategoriaService
{
    public interface ICategoriaService
    {
        List<CategoriaResponseDto> GetAll();
        CategoriaResponseDto GetById(string id);
        CategoriaResponseDto Add(CategoriaCreateRequest request);
        void Update(CategoriaUpdateRequest request, string id);
        void Delete(string id);
    }
}