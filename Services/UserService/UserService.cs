using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos.UserDTOs;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.UserRepository;

namespace Gestao_Financeira.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<UserResponseDto> GetAll()
        {
            var usersResponseDto = _userRepository.GetAll()
                .Select(user => new UserResponseDto
                {
                    Id = user.Id,
                    Nome = user.Nome,
                    Email = user.Email
                })
                .ToList();

            if(usersResponseDto.Count == 0) throw new NotFoundException("Nenhum usuario encontrado");

            return usersResponseDto;
        }

        public UserResponseDto GetById(string id)
        {
            var user = GetByIdOrElseThrowNotFoundException(id);

            return new UserResponseDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email
            };
        }

        public UserResponseDto Add(UserCreateRequest userCreateRequest)
        {
            EmailJaExisteEmUser(userCreateRequest.Email);

            User user = new (userCreateRequest.Nome, userCreateRequest.Email, userCreateRequest.Senha);

            _userRepository.Add(user);

            return new UserResponseDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email
            };
        }

        public void Update(UserUpdateRequest userUpdateRequest, string id)
        {
            User user = GetByIdOrElseThrowNotFoundException(id);
            
            if(!string.IsNullOrWhiteSpace(userUpdateRequest.Email))
            {
                EmailJaExisteEmUser(userUpdateRequest.Email, id);
                user.AlterarEmail(userUpdateRequest.Email);
            }

            if(!string.IsNullOrWhiteSpace(userUpdateRequest.Nome))
                user.AlterarNome(userUpdateRequest.Nome);
            
            if(!string.IsNullOrWhiteSpace(userUpdateRequest.Senha))
            {
                var novaSenhaHash = BCrypt.Net.BCrypt.HashPassword(userUpdateRequest.Senha);
                user.AlterarSenhaHash(novaSenhaHash);
            }

            _userRepository.Save();
        }

        public void Delete(string id)
        {
            User user = GetByIdOrElseThrowNotFoundException(id);
            _userRepository.Delete(user);
        }

        private User GetByIdOrElseThrowNotFoundException(string id)
        {
            return _userRepository.GetById(id) ?? throw new NotFoundException("Usuário não encontrado");
        }

        public void ExistsById(string id)
        {
            if(_userRepository.GetById(id) is null) 
                throw new NotFoundException("Usuário não encontrado");
        }

        private void EmailJaExisteEmUser(string email, string? idIgnore = null)
        {
            if(_userRepository.GetAll()
                .Where(user => idIgnore == null || user.Id != idIgnore)
                .Any(user => user.Email == email))
                    throw new EmailJaCadastradoException();
        }
    }
}