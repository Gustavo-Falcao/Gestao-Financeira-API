using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Models.Enuns;
using Gestao_Financeira.Repositories.CategoriaRepository;
using Gestao_Financeira.Repositories.TransacaoRepository;
using Gestao_Financeira.Repositories.UserRepository;
using Gestao_Financeira.Services.UserService;
using Microsoft.VisualBasic;

namespace Gestao_Financeira.Services.CategoriaService
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly ITransacaoRepository _transacaoRepository;

        public CategoriaService(ICategoriaRepository repository, IUserRepository userRepository, ITransacaoRepository transacaoRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _transacaoRepository = transacaoRepository;
        }

        public List<CategoriaResponseDto> GetAll()
        {
            var categorias = _repository.GetAll()
                .Select(c => new CategoriaResponseDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    TipoMovimentacao = c.TipoMovimentacao,
                    UsuarioId = c.UsuarioId
                })
                .ToList();

            if (categorias.Count == 0)
                throw new NotFoundException("Nenhuma categoria encontrada");

            return categorias;
        }

        public List<CategoriaResponseDto> GetByUsuarioId(string usuarioId)
        {
            return _repository.GetAll()
                .Where(c => c.UsuarioId == usuarioId)
                .Select(c => new CategoriaResponseDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    TipoMovimentacao = c.TipoMovimentacao,
                    UsuarioId = c.UsuarioId
                })
                .ToList();
        }

        public CategoriaResponseDto GetById(string id)
        {
            var c = GetByIdOrThrow(id);

            return new CategoriaResponseDto
            {
                Id = c.Id,
                Nome = c.Nome,
                TipoMovimentacao = c.TipoMovimentacao,
                UsuarioId = c.UsuarioId
            };
        }

        public CategoriaResponseDto Add(CategoriaCreateRequest request)
        {

            if(string.IsNullOrWhiteSpace(request.Nome))
                throw new ValidationException("Nome inválido.");

            if(!Enum.IsDefined(typeof(TipoMovimentacao), request.TipoMovimentacao))
                throw new ValidationException("Tipo de movimentação inválida.");

            if(_userRepository.GetById(request.UsuarioId) is null)
                throw new NotFoundException("Usuário não encontrado");

            var categoria = new Categoria(
                request.Nome.Trim(),
                request.TipoMovimentacao,
                request.UsuarioId
            );

            _repository.Add(categoria);

            return new CategoriaResponseDto
            {
                Id = categoria.Id,
                Nome = categoria.Nome,
                TipoMovimentacao = categoria.TipoMovimentacao,
                UsuarioId = categoria.UsuarioId
            };
        }

        public void Update(CategoriaUpdateRequest request, string id)
        {
            var categoria = GetByIdOrThrow(id);

            if(request.Nome is not null)
            {
                var nome = request.Nome.Trim();

                if(string.IsNullOrWhiteSpace(nome))
                {
                    throw new ValidationException("Nome da categoria não pode estar vazio");
                }    

                if(nome.Length < 2 || nome.Length > 100)
                {
                    throw new ValidationException("Nome deve ter entre 2 e 100 caracteres");
                }

                categoria.AlterarNome(request.Nome);
            }

            if(request.TipoMovimentacao is TipoMovimentacao tipoMovimentacao)
            {
                if(!Enum.IsDefined(tipoMovimentacao))
                {
                    throw new ValidationException("Tipo de movimentação inválido.");
                }

                bool categoriaEmUso = _transacaoRepository.ExistsByCategoria(id);

                if(categoriaEmUso)
                    throw new CategoriaEmUsoException("Não é possível alterar tipo movimentação de uma categoria já utilizada em transação.");

                categoria.AlterarTipoMovimentacao(tipoMovimentacao);
            }

            _repository.Save();
        }

        public void Delete(string id)
        {
            var categoria = GetByIdOrThrow(id);
            
            bool categoriaEmUso = _transacaoRepository.ExistsByCategoria(id);

            if(categoriaEmUso)
                throw new CategoriaEmUsoException("Não é possível deletar uma categoria já utilizada em transação.");

            _repository.Delete(categoria);
        }

        public void ExistsById(string id)
        {
            if(_repository.GetById(id) is null)
                throw new NotFoundException("Categoria não encontrada");
        }

        private Categoria GetByIdOrThrow(string id)
        {
            return _repository.GetById(id)
                ?? throw new NotFoundException("Categoria não encontrada");
        }
    }
}