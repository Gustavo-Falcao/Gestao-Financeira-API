using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Dtos.UserDTOs;
using Gestao_Financeira.Repositories.UserRepository;

namespace Gestao_Financeira.Services.AuthenticationService
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly string secretKey = "my-extremely-secret-key-with-more-than-32-characters";

        public AuthenticationService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserLoginResponseDto Login(UserLoginRequestDto userLoginRequestDto)
        {
            var user = _userRepository.FindByEmail(userLoginRequestDto.Email) ?? throw new InvalidCredentialsException("Email ou senha inválidos.");

            
        }
    }
}