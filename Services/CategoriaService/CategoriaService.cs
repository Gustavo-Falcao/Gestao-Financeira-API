using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.CategoriaRepository;

namespace Gestao_Financeira.Services.CategoriaService
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _repository;

        public CategoriaService(ICategoriaRepository repository)
        {
            _repository = repository;
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
                throw new Exception("Nenhuma categoria encontrada");

            return categorias;
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
            if (string.IsNullOrWhiteSpace(request.Nome))
                throw new Exception("Nome da categoria é obrigatório");

            var categoria = new Categoria(
                request.Nome,
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

            categoria.AlterarNome(request.Nome);
            categoria.AlterarTipoMovimentacao(request.TipoMovimentacao);

            _repository.Save();
        }

        public void Delete(string id)
        {
            var categoria = GetByIdOrThrow(id);
            _repository.Delete(categoria);
        }

        private Categoria GetByIdOrThrow(string id)
        {
            return _repository.GetById(id)
                ?? throw new Exception("Categoria não encontrada");
        }
    }
}