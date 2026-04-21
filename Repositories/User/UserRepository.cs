using Gestao_Financeira.Data;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Models.Dtos;
using Microsoft.EntityFrameworkCore.Storage;

namespace Gestao_Financeira.Repositories.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<UserResponseDto> GetAll()
        {
            List<UserResponseDto> users = _context.Users.
                Select(user => new UserResponseDto
                {
                    Id = user.Id,
                    Nome = user.Nome,
                    Email = user.Email
                })
                .ToList();

            if(users.Count == 0) throw new Exception("Nenhum usuario encontrado");

            return users;
        }

        public UserResponseDto GetById(string id)
        {
            var user = _context.Users.Find(id) ?? throw new Exception("Usuario não encontrado");
            return new UserResponseDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email
            };

        }

        public UserResponseDto Add(UserPostRequestBody userPostRequestBody)
        {
            //fazer validacoes
            User user = new (userPostRequestBody.Nome, userPostRequestBody.Email, userPostRequestBody.Senha);

            _context.Users.Add(user);
            _context.SaveChanges();

            return new UserResponseDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email
            };
        }

        public void Update(User user, string id)
        {
            User userEncontrado = _context.Users.Find(id) ?? throw new Exception("Usuario não encontrado");

            userEncontrado.AlterarNome(user.Nome);
            userEncontrado.AlterarEmail(user.Email);
            userEncontrado.AlterarSenhaHash(user.SenhaHash);

            _context.SaveChanges();
            
        }

        public void Delete(string id)
        {
            var user = _context.Users.Find(id) ?? throw new Exception("Usuario não encontrado");

            _context.Users.Remove(user);
            _context.SaveChanges();
            
        }
    }
}