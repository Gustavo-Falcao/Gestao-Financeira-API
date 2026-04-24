using Gestao_Financeira.Data;
using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<User> GetAll()
        {
           return _context.Users.ToList(); 
        }

        public User? GetById(string id)
        {
           return _context.Users.Find(id);
        }

        public User Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}