using Gestao_Financeira.Models.Dtos.ContaDTOs;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.ContaRepository;

namespace Gestao_Financeira.Services.ContaService
{
    public class ContaService : IContaService
    {
        private readonly IContaRepository _contaRepository;

        public ContaService(IContaRepository contaRepository)
        {
            _contaRepository = contaRepository;
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
                throw new Exception("Nenhuma conta encontrada");

            return contas;
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
            if (request.SaldoInicial < 0)
                throw new Exception("Saldo inicial não pode ser negativo");

            Conta conta = new(
                request.Nome,
                request.TipoConta,
                request.SaldoInicial,
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

            conta.AlterarNome(request.Nome);
            conta.AlterarTipoConta(request.TipoConta);
            conta.AlterarSaldoInicial(request.SaldoInicial);

            _contaRepository.Save();
        }

        public void Delete(string id)
        {
            var conta = GetByIdOrThrow(id);
            _contaRepository.Delete(conta);
        }

        private Conta GetByIdOrThrow(string id)
        {
            return _contaRepository.GetById(id)
                ?? throw new Exception("Conta não encontrada");
        }
    }
}