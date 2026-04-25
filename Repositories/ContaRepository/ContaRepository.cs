using Gestao_Financeira.Data;
using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.ContaRepository
{
    public class ContaRepository : IContaRepository
    {
        private readonly AppDbContext _context;

        public ContaRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Conta> GetAll()
        {
            return _context.Contas.ToList();
        }

        public Conta? GetById(string id)
        {
            return _context.Contas.Find(id);
        }

        public void Add(Conta conta)
        {
            _context.Contas.Add(conta);
            _context.SaveChanges();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
        
        public void Delete(Conta conta)
        {
            _context.Contas.Remove(conta);
            _context.SaveChanges();
        }
    }
}