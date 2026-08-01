using System.Runtime.Serialization;
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
            var usersResponseDtoList = _userRepository.GetAll()
                .Select(user => new UserResponseDto
                {
                    Id = user.Id,
                    Nome = user.Nome,
                    Email = user.Email,
                    UserRole = user.UserRole
                })
                .ToList();

            return usersResponseDtoList;
        }

        public UserResponseDto GetUserById(string id)
        {
            var user = GetByIdOrElseThrowNotFoundException(id);

            return new UserResponseDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email,
                UserRole = user.UserRole
            };
        }

        public UserProfileDto GetUserProfileById(string id)
        {
            var user = GetByIdOrElseThrowNotFoundException(id);

            return new UserProfileDto
            {
                Nome = user.Nome,
                Email = user.Email,
                UserRole = user.UserRole
            };
        }

        public UserResponseDto Add(UserCreateRequest userCreateRequest)
        {
            EmailJaExisteEmUser(userCreateRequest.Email);

            string senhaHash = BCrypt.Net.BCrypt.HashPassword(userCreateRequest.Senha);

            User user = new (userCreateRequest.Nome, userCreateRequest.Email, senhaHash);

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
            
            if(userUpdateRequest.Nome is not null)
            {
                var nome = userUpdateRequest.Nome.Trim();

                if(string.IsNullOrWhiteSpace(nome))
                    throw new ValidationException("Nome não pode estar vazio");

                if(nome.Length < 2 || nome.Length > 100)
                {
                    throw new ValidationException("Nome deve ter entre 2 e 100 caracteres");
                }
                
                user.AlterarNome(nome);
            }

            if(userUpdateRequest.Email is not null)
            {
                var email = userUpdateRequest.Email.Trim();

                if(string.IsNullOrWhiteSpace(email))
                    throw new ValidationException("Email não pode estar vazio");

                EmailJaExisteEmUser(email, id);

                user.AlterarEmail(email);
            }

            if(userUpdateRequest.Senha is not null)
            {
                var senha = userUpdateRequest.Senha.Trim();

                if(string.IsNullOrWhiteSpace(senha))
                    throw new ValidationException("Senha não pode estar vazio");
                
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