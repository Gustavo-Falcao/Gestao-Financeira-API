using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Repositories.Users
{
    public interface IUserRepository
    {
        List<UserResponseDto> GetAll();
        UserResponseDto GetById(string id);
        UserResponseDto Add(UserPostRequestBody userPostRequestBody);
        void Update(User user, string id);
        void Delete(string id);
    }
}