using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.TransacaoRepository;
using Gestao_Financeira.Models.Enuns;
using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Repositories.UserRepository;
using Gestao_Financeira.Repositories.ContaRepository;
using Gestao_Financeira.Repositories.CategoriaRepository;

namespace Gestao_Financeira.Services.TransacaoService
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly IContaRepository _contaRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public TransacaoService(ITransacaoRepository transacaoRepository,IContaRepository contaRepository, IUserRepository userRepository, ICategoriaRepository categoriaRepository)
        {
            _transacaoRepository = transacaoRepository;
            _contaRepository = contaRepository;
            _userRepository = userRepository;
            _categoriaRepository = categoriaRepository;
        }

        public List<TransacaoResponseDto> GetAll()
        {
            var transacoes = _transacaoRepository.GetAll()
                .Select(t => new TransacaoResponseDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    TipoMovimentacao = t.TipoMovimentacao,
                    Data = t.Data,
                    UsuarioId = t.UsuarioId,
                    ContaId = t.ContaId,
                    CategoriaId = t.CategoriaId
                })
                .ToList();

            if (transacoes.Count == 0)
                throw new NotFoundException("Nenhuma transação encontrada");

            return transacoes;
        }

        public List<TransacaoResponseDto> GetByUsuarioId(string usuarioId)
        {
            return _transacaoRepository.GetAll()
                .Where(t => t.UsuarioId == usuarioId)
                .Select(t => new TransacaoResponseDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    TipoMovimentacao = t.TipoMovimentacao,
                    Data = t.Data,
                    UsuarioId = t.UsuarioId,
                    ContaId = t.ContaId,
                    CategoriaId = t.CategoriaId
                })
                .ToList();
        }

        public TransacaoResponseDto GetById(string id)
        {
            var t = GetByIdOrThrow(id);

            return new TransacaoResponseDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                TipoMovimentacao = t.TipoMovimentacao,
                Data = t.Data,
                UsuarioId = t.UsuarioId,
                ContaId = t.ContaId,
                CategoriaId = t.CategoriaId
            };
        }

        public TransacaoResponseDto Add(TransacaoCreateRequest request)
        {
            if(request.Valor <= 0)
                throw new ValidationException("Valor deve ser maior que zero");

            if(!Enum.IsDefined(typeof(TipoMovimentacao), request.TipoMovimentacao))
                throw new ValidationException("Tipode movimentação inválido");

            if(request.Data.HasValue)
            {
                if(request.Data.Value > DateOnly.FromDateTime(DateTime.Today))
                    throw new ValidationException("A data da transação não poder ser futura.");
            }

            if(_userRepository.GetById(request.UsuarioId) is null)
                throw new ValidationException("Usuário não encontrado");

            var conta = _contaRepository.GetById(request.ContaId) ?? throw new ValidationException("Conta não encontrada");
            
            var categoria = _categoriaRepository.GetById(request.CategoriaId) ?? throw new ValidationException("Categoria não encontrada");
        
            if(conta.UsuarioId != request.UsuarioId)
                throw new ValidationException("A conta informada não pertence ao usuário.");

            if(categoria.UsuarioId != request.UsuarioId)
                throw new ValidationException("A categoria informada não pertence ao usuário.");

            if(categoria.TipoMovimentacao != request.TipoMovimentacao)
                throw new ValidationException("O tipo de movimentação da transação não corresponde ao tipo da categoria.");

            var transacao = new Transacao(
                request.Descricao.Trim(),
                request.Valor,
                request.Data!.Value,
                request.TipoMovimentacao,
                request.UsuarioId,
                request.ContaId,
                request.CategoriaId
            );

            _transacaoRepository.Add(transacao);

            return new TransacaoResponseDto
            {
                Id = transacao.Id,
                Descricao = transacao.Descricao,
                Valor = transacao.Valor,
                TipoMovimentacao = transacao.TipoMovimentacao,
                Data = transacao.Data,
                UsuarioId = transacao.UsuarioId,
                ContaId = transacao.ContaId,
                CategoriaId = transacao.CategoriaId
            };
        }

        public void Update(TransacaoUpdateRequest request, string id)
        {
            var t = GetByIdOrThrow(id);

            if(!string.IsNullOrWhiteSpace(request.Descricao))
                t.AlterarDescricao(request.Descricao);

            if(request.Valor.HasValue)
            {
                if(request.Valor.Value <= 0)
                    throw new ValidationException("Valor deve ser maior que zero");

                t.AlterarValor(request.Valor.Value);
            }

            if(request.Data.HasValue)
            {
                if(request.Data.Value > DateOnly.FromDateTime(DateTime.Today))
                    throw new ValidationException("A data da transação não poder ser futura.");

                t.AlterarData(request.Data.Value);
            }

            if(!string.IsNullOrWhiteSpace(request.ContaId))
            {
                if(_contaRepository.GetById(request.ContaId) is null) 
                    throw new ValidationException("Conta não foi encontrada");
                t.AlterarContaId(request.ContaId);
            }

            if(!string.IsNullOrWhiteSpace(request.CategoriaId))
            {
                var categoria = _categoriaRepository.GetById(request.CategoriaId) ?? throw new ValidationException("Categoria não encontrada");

                if(categoria.TipoMovimentacao != t.TipoMovimentacao) 
                    throw new ValidationException("O tipo de movimentação da transação não corresponde ao tipo da categoria.");

                t.AlterarCategoriaId(categoria.Id);
            }

            _transacaoRepository.Save();
        }

        public void Delete(string id)
        {
            var t = GetByIdOrThrow(id);
            _transacaoRepository.Delete(t);
        }

        private Transacao GetByIdOrThrow(string id)
        {
            return _transacaoRepository.GetById(id)
                ?? throw new NotFoundException("Transação não encontrada");
        }
    }
}