using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
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

            if(usersResponseDto.Count == 0) throw new Exception("Nenhum usuario encontrado");

            return usersResponseDto;
        }

        public UserResponseDto GetById(string id)
        {
            var user = GetByIdOrElseThrowException(id);

            return new UserResponseDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email
            };
        }

        public UserResponseDto Add(UserCreateRequest userCreateRequest)
        {
            EmailJaExisteEmUser(userCreateRequest.Email, null);

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
            User user = GetByIdOrElseThrowException(id);

            EmailJaExisteEmUser(userUpdateRequest.Email, id);

            if(user.Nome != userUpdateRequest.Nome)
                user.AlterarNome(userUpdateRequest.Nome);
            
            if(user.Email != userUpdateRequest.Email)
                user.AlterarEmail(userUpdateRequest.Email);

            _userRepository.Save();
        }

        public void Delete(string id)
        {
            User user = GetByIdOrElseThrowException(id);
            _userRepository.Delete(user);
        }

        private User GetByIdOrElseThrowException(string id)
        {
            return _userRepository.GetById(id) ?? throw new NotFoundException("Usuário não encontrado");
        }

        private void EmailJaExisteEmUser(string email, string idIgnore)
        {
            if(_userRepository.GetAll()
                .Where(user => idIgnore == null || user.Id != idIgnore)
                .Any(user => user.Email == email))
                    throw new EmailJaCadastradoException();
        }
    }
}