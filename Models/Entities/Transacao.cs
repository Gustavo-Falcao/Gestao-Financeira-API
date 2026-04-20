using GestaoFinanceira.Models.Enuns;

namespace GestaoFinanceira.Models.Entities
{
    public class Transacao (string descricao, decimal valor, TipoMovimentacao tipoMovimentacao, string usuarioId, string contaId, string categoriaId)
    {
        private string? Id { get; set; } = Guid.NewGuid().ToString("N");
        private string? Descricao { get; set; } = descricao;
        private decimal Valor { get; set; } = valor;
        private TipoMovimentacao TipoMovimentacao { get; set; } = tipoMovimentacao;
        private DateTime Data { get; set; } = DateTime.Now;
        private string? UsuarioId { get; set; } = usuarioId;
        private string? ContaId { get; set; } = contaId;
        private string? CategoriaId { get; set; } = categoriaId;

    }
}