using Gestao_Financeira.Models.Dtos;

namespace Gestao_Financeira.Services.UserService
{
    public interface IUserService
    {
        List<UserResponseDto> GetAll();
        UserResponseDto GetById(string id);
        UserResponseDto Add(UserCreateRequest userCreateRequest);
        void Update(UserUpdateRequest userUpdateRequest, string id);
        void Delete(string id);
    }
}