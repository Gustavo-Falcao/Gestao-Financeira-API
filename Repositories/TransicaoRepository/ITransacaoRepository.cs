using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.TransacaoRepository
{
    public interface ITransacaoRepository
    {
        List<Transacao> GetAll();
        Transacao? GetById(string id);
        void Add(Transacao transacao);
        void Delete(Transacao transacao);
        void Save();
    }
}