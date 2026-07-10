using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos.ContaDTOs;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Models.Enuns;
using Gestao_Financeira.Repositories.ContaRepository;
using Gestao_Financeira.Repositories.TransacaoRepository;
using Gestao_Financeira.Repositories.UserRepository;
using Gestao_Financeira.Services.UserService;

namespace Gestao_Financeira.Services.ContaService
{
    public class ContaService : IContaService
    {
        private readonly IContaRepository _contaRepository;
        private readonly IUserRepository _userRepository;
        private readonly ITransacaoRepository _transacaoRepository;

        public ContaService(IContaRepository contaRepository, IUserRepository userRepository, ITransacaoRepository transacaoRepository)
        {
            _contaRepository = contaRepository;
            _userRepository = userRepository;
            _transacaoRepository = transacaoRepository;
        }

        public List<ContaResponseDto> GetAll()
        {
            var contas = _contaRepository.GetAll()
                .Select(c => new ContaResponseDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    TipoConta = c.TipoConta,
                    SaldoInicial = c.SaldoInicial,
                    UsuarioId = c.UsuarioId
                })
                .ToList();

            if (contas.Count == 0)
                throw new NotFoundException("Nenhuma conta encontrada");

            return contas;
        }

        public List<ContaResponseDto> GetByUsuarioId(string usuarioId)
        {
            return _contaRepository.GetAll()
                .Where(c => c.UsuarioId == usuarioId)
                .Select(c =>
                {
                
                    var transacoesDaConta = _transacaoRepository.GetAll().Where(t => t.ContaId == c.Id);

                    var totalReceitas = transacoesDaConta
                        .Where(t => t.TipoMovimentacao == TipoMovimentacao.Receita)
                        .Sum(t => t.Valor);

                    var totalDespesas = transacoesDaConta
                        .Where(t => t.TipoMovimentacao == TipoMovimentacao.Despesa)
                        .Sum(t => t.Valor);

                    var saldoAtual = c.SaldoInicial + totalReceitas - totalDespesas;

                    var movimentacao = saldoAtual == c.SaldoInicial ? 0 : saldoAtual - c.SaldoInicial;

                    return new ContaResponseDto
                    {
                        Id = c.Id,
                        Nome = c.Nome,
                        TipoConta = c.TipoConta,
                        SaldoInicial = c.SaldoInicial,
                        SaldoAtual = saldoAtual,
                        Movimentacao = movimentacao,
                        UsuarioId = c.UsuarioId
                    };
                    
                })
                .ToList();  
        }

        public ContaResponseDto GetById(string id)
        {
            var conta = GetByIdOrThrow(id);

            return new ContaResponseDto
            {
                Id = conta.Id,
                Nome = conta.Nome,
                TipoConta = conta.TipoConta,
                SaldoInicial = conta.SaldoInicial,
                UsuarioId = conta.UsuarioId
            };
        }

        public ContaResponseDto Add(ContaCreateRequest request)
        {
            if(!Enum.IsDefined(typeof(TipoConta), request.TipoConta))
                throw new ValidationException("Tipo de conta inválido");

            decimal saldoInicial = request.SaldoInicial;

            if (saldoInicial < 0)
                throw new ValidationException("Saldo inicial não pode ser negativo");

            if(_userRepository.GetById(request.UsuarioId) is null)
                throw new ValidationException("Usuário não encontrado");

            Conta conta = new(
                request.Nome,
                request.TipoConta,
                saldoInicial,
                request.UsuarioId
            );

            _contaRepository.Add(conta);

            return new ContaResponseDto
            {
                Id = conta.Id,
                Nome = conta.Nome,
                TipoConta = conta.TipoConta,
                SaldoInicial = conta.SaldoInicial,
                UsuarioId = conta.UsuarioId
            };
        }

        public void Update(ContaUpdateRequest request, string id)
        {
            var conta = GetByIdOrThrow(id);

            if(!string.IsNullOrWhiteSpace(request.Nome))
                conta.AlterarNome(request.Nome);

            if(request.TipoConta.HasValue)
            {
                if(!Enum.IsDefined(typeof(TipoConta), request.TipoConta.Value))
                    throw new ValidationException("Tipo de conta inválido");

                conta.AlterarTipoConta(request.TipoConta.Value);
            }
            
            if(request.SaldoInicial.HasValue)
            {
                if(request.SaldoInicial.Value < 0)
                    throw new ValidationException("Saldo inicial não pode ser negativo");

                conta.AlterarSaldoInicial(request.SaldoInicial.Value);
            }

            _contaRepository.Save();
        }

        public void Delete(string id)
        {
            var conta = GetByIdOrThrow(id);
            _contaRepository.Delete(conta);
        }

        public void ExistsById(string id)
        {
            if(_contaRepository.GetById(id) is null)
                throw new NotFoundException("Conta não encontrada");
        }

        private Conta GetByIdOrThrow(string id)
        {
            return _contaRepository.GetById(id) ?? throw new NotFoundException("Conta não encontrada");
        }
    }
}