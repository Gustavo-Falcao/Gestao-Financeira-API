using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.TransacaoRepository;
using Gestao_Financeira.Repositories.ContaRepository;
using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Services.TransacaoService
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly IContaRepository _contaRepository;

        public TransacaoService(
            ITransacaoRepository transacaoRepository,
            IContaRepository contaRepository)
        {
            _transacaoRepository = transacaoRepository;
            _contaRepository = contaRepository;
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
                throw new Exception("Nenhuma transação encontrada");

            return transacoes;
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
            if (request.Valor <= 0)
                throw new Exception("Valor deve ser maior que zero");

            var conta = _contaRepository.GetById(request.ContaId)
                ?? throw new Exception("Conta não encontrada");

            var transacao = new Transacao(
                request.Descricao,
                request.Valor,
                request.TipoMovimentacao,
                request.UsuarioId,
                request.ContaId,
                request.CategoriaId
            );

            // 🔥 REGRA DE NEGÓCIO
            if (request.TipoMovimentacao == TipoMovimentacao.Despesa)
            {
                if (conta.SaldoInicial < request.Valor)
                    throw new Exception("Saldo insuficiente");

                conta.AlterarSaldoInicial(conta.SaldoInicial - request.Valor);
            }
            else
            {
                conta.AlterarSaldoInicial(conta.SaldoInicial + request.Valor);
            }

            _transacaoRepository.Add(transacao);
            _contaRepository.Save();

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

            t.AlterarDescricao(request.Descricao);
            t.AlterarValor(request.Valor);
            t.AlterarTipoMovimentacao(request.TipoMovimentacao);

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
                ?? throw new Exception("Transação não encontrada");
        }
    }
}