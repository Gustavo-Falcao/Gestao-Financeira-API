using Gestao_Financeira.Data;
using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.CategoriaRepository
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _context;

        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Categoria> GetAll()
        {
            return _context.Categorias.ToList();
        }

        public List<Categoria> GetByUsuarioId(string usuarioId)
        {
            return GetAll()
                .Where(c => c.UsuarioId == usuarioId)
                .ToList();
        }

        public Categoria? GetById(string id)
        {
            return _context.Categorias.Find(id);
        }

        public void Add(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();
        }

        public void Delete(Categoria categoria)
        {
            _context.Categorias.Remove(categoria);
            _context.SaveChanges();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}