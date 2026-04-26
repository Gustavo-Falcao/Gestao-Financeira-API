using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Entities
{
    public class Transacao (string descricao, decimal valor, TipoMovimentacao tipoMovimentacao, string usuarioId, string contaId, string categoriaId)
    {
        public string? Id { get; private set; } = Guid.NewGuid().ToString("N");
        public string? Descricao { get; private set; } = descricao;
        public decimal Valor { get; private set; } = valor;
        public TipoMovimentacao TipoMovimentacao { get; private set; } = tipoMovimentacao;
        public DateTime Data { get; private set; } = DateTime.Now;
        public string? UsuarioId { get; private set; } = usuarioId;
        public string? ContaId { get; private set; } = contaId;
        public string? CategoriaId { get; private set; } = categoriaId;

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

        public void AlterarData(DateTime novaData)
        {
            Data = novaData;
        }
    }
}