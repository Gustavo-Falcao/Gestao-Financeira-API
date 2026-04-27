using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.TransacaoRepository
{
    public interface ITransacaoRepository
    {
        List<Transacao> GetAll();
        List<Transacao> GetByUsuarioId(string usuarioId);
        Transacao? GetById(string id);
        void Add(Transacao transacao);
        void Delete(Transacao transacao);
        void Save();
    }
}