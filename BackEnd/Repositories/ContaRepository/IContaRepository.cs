using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.ContaRepository
{
    public interface IContaRepository
    {
        List<Conta> GetAll();
        List<Conta> GetByUsuarioId(string usuarioId);
        Conta? GetById(string id);
        void Add(Conta conta);
        void Save();
        void Delete(Conta conta);
    }
}