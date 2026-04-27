using Gestao_Financeira.Models.Dtos;

namespace Gestao_Financeira.Services.TransacaoService
{
    public interface ITransacaoService
    {
        List<TransacaoResponseDto> GetAll();
        List<TransacaoResponseDto> GetByUsuarioId(string usuarioId);
        TransacaoResponseDto GetById(string id);
        TransacaoResponseDto Add(TransacaoCreateRequest request);
        void Update(TransacaoUpdateRequest request, string id);
        void Delete(string id);
    }
}