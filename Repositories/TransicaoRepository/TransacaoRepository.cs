using Gestao_Financeira.Data;
using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.TransacaoRepository
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly AppDbContext _context;

        public TransacaoRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Transacao> GetAll()
        {
            return _context.Transacoes.ToList();
        }

        public Transacao? GetById(string id)
        {
            return _context.Transacoes.Find(id);
        }

        public void Add(Transacao transacao)
        {
            _context.Transacoes.Add(transacao);
            _context.SaveChanges();
        }

        public void Delete(Transacao transacao)
        {
            _context.Transacoes.Remove(transacao);
            _context.SaveChanges();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}