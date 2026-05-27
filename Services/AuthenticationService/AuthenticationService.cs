using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Dtos.UserDTOs;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.UserRepository;
using Microsoft.IdentityModel.Tokens;

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

            bool senhaCorreta = BCrypt.Net.BCrypt.Verify(userLoginRequestDto.Senha, user.SenhaHash);

            if(!senhaCorreta)
                throw new InvalidCredentialsException("Email ou senha inválidos.");

            string token = GerarToken(user);

            return new UserLoginResponseDto
            {
                Token = token
            };
        }

        private string GerarToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new []
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Nome),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.userRole.ToString())
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}