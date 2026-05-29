using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.CategoriaRepository
{
    public interface ICategoriaRepository
    {
        List<Categoria> GetAll();
        List<Categoria> GetByUsuarioId(string usuarioId);
        Categoria? GetById(string id);
        void Add(Categoria categoria);
        void Delete(Categoria categoria);
        void Save();
    }
}