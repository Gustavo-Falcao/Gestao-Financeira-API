using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Entities
{
    public class Transacao (string descricao, decimal valor, DateOnly data, TipoMovimentacao tipoMovimentacao, string usuarioId, string contaId, string categoriaId)
    {
        public string Id { get; private set; } = Guid.NewGuid().ToString("N");
        public string Descricao { get; private set; } = descricao;
        public decimal Valor { get; private set; } = valor;
        public TipoMovimentacao TipoMovimentacao { get; private set; } = tipoMovimentacao;
        public DateOnly Data { get; private set; } = data;
        public string UsuarioId { get; private set; } = usuarioId;
        public string ContaId { get; private set; } = contaId;
        public string CategoriaId { get; private set; } = categoriaId;

        public void AlterarDescricao(string novaDescricao)
        {
            Descricao = novaDescricao;
        }

        public void AlterarValor(decimal novoValor)
        {
            Valor = novoValor;
        }

        public void AlterarTipoMovimentacao(TipoMovimentacao novoTipoMovimentacao)
        {
            TipoMovimentacao = novoTipoMovimentacao;
        }

        public void AlterarData(DateOnly novaData)
        {
            Data = novaData;
        }

        public void AlterarContaId(string contaId)
        {
            ContaId = contaId;
        }

        public void AlterarCategoriaId(string categoriaId)
        {
            CategoriaId = categoriaId;
        }
    }
}