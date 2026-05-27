using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Dtos.UserDTOs;

namespace Gestao_Financeira.Services.AuthenticationService
{
    public interface IAuthenticationService
    {
        UserLoginResponseDto Login(UserLoginRequestDto userLoginRequestDto);
    }
}