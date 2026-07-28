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

        public List<Conta> GetByUsuarioId(string usuarioId)
        {
            return GetAll()
                .Where(c => c.UsuarioId == usuarioId)
                .ToList();
        }

        public Conta? GetById(string id)
        {
            return _context.Contas.Find(id);
        }

        public bool ExistsByIdAndUserId(string id, string userId)
        {
            return _context.Contas.Any(c => c.Id == id && c.UsuarioId == userId);
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