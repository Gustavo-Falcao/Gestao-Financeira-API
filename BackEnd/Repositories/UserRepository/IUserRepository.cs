using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.UserRepository
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User? GetById(string id);
        User? FindByEmail(string email);
        bool ExistsById(string id);
        User Add(User user);
        void Save();
        void Delete(User user);
    }
}