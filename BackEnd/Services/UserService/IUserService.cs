using Gestao_Financeira.Models.Dtos.UserDTOs;

namespace Gestao_Financeira.Services.UserService
{
    public interface IUserService
    {
        List<UserResponseDto> GetAll();
        UserResponseDto GetById(string id);
        void ExistsById(string id);
        UserResponseDto Add(UserCreateRequest userCreateRequest);
        void Update(UserUpdateRequest userUpdateRequest, string id);
        void Delete(string id);
    }
}