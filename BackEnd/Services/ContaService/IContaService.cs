using Gestao_Financeira.Models.Dtos.ContaDTOs;

namespace Gestao_Financeira.Services.ContaService
{
    public interface IContaService
    {
        List<ContaResponseDto> GetAll();
        List<ContaResponseDto> GetByUsuarioId(string usuarioId);
        ContaResponseDto GetById(string id);
        void ExistsById(string id);
        ContaResponseDto Add(ContaCreateRequest request);
        void Update(ContaUpdateRequest request, string id);
        void Delete(string id);
    }
}