using Gestao_Financeira.Models.Enuns;
using Gestao_Financeira.Exceptions;
using Gestao_Financeira.Models.Dtos;
using Gestao_Financeira.Models.Dtos.ContaDTOs;
using Gestao_Financeira.Models.Dtos.UserDTOs;
using Gestao_Financeira.Models.Entities;
using Gestao_Financeira.Repositories.CategoriaRepository;
using Gestao_Financeira.Repositories.ContaRepository;
using Gestao_Financeira.Repositories.TransacaoRepository;
using Gestao_Financeira.Repositories.UserRepository;

namespace Gestao_Financeira.Services.ProfileService
{
    public class ProfileService : IProfileService
    {
        private readonly IUserRepository _userRepository;
        private readonly IContaRepository _contaRepository;
        private readonly ICategoriaRepository _categoriRepository;
        private readonly ITransacaoRepository _transacaoRepository;

        public ProfileService(IUserRepository userRepository, IContaRepository contaRepository, ICategoriaRepository categoriaRepository, ITransacaoRepository transacaoRepository)
        {
            _userRepository = userRepository;
            _contaRepository = contaRepository;
            _categoriRepository = categoriaRepository;
            _transacaoRepository = transacaoRepository;
        }

        public UserProfileResponseDto GetProfileById(string id)
        {
            User user = _userRepository.GetById(id) ?? throw new NotFoundException("Usuário não encontrado");

            List<Conta> contas = _contaRepository.GetByUsuarioId(id);
            List<Categoria> categorias = _categoriRepository.GetByUsuarioId(id);
            List<Transacao> transacoes = _transacaoRepository.GetByUsuarioId(id);

            List<ContaResponseDto> contasResponseDtos = contas
                .Select(c => new ContaResponseDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    TipoConta = c.TipoConta,
                    SaldoInicial = c.SaldoInicial,
                    UsuarioId = c.UsuarioId
                })
                .ToList();

            List<CategoriaResponseDto> categoriasResponseDtos = categorias
                .Select(c => new CategoriaResponseDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    TipoMovimentacao = c.TipoMovimentacao,
                    UsuarioId = c.UsuarioId
                })
                .ToList();

            List<TransacaoResponseDto> transacoesResponseDtos = transacoes
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

            decimal totalSaldoInicial = contas.Sum(conta => conta.SaldoInicial);

            decimal totalReceitas = transacoes
                .Where(t => t.TipoMovimentacao == TipoMovimentacao.Receita)
                .Sum(t => t.Valor);

            decimal totalDespesas = transacoes
                .Where(t => t.TipoMovimentacao == TipoMovimentacao.Despesa)
                .Sum(t => t.Valor);

            decimal saldoTotal = totalSaldoInicial + totalReceitas - totalDespesas;

            return new UserProfileResponseDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email,
                SaldoTotal = saldoTotal,
                Contas = contasResponseDtos,
                Categorias = categoriasResponseDtos,
                Transacoes = transacoesResponseDtos
            };
        }
    }   
}