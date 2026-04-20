using GestaoFinanceira.Models.Enuns;

namespace GestaoFinanceira.Models.Entities
{
    public class Categoria (string nome, TipoMovimentacao tipoMovimentacao, string usuarioId)
    {
        private string? Id { get; set; } = Guid.NewGuid().ToString("N");
        private string? Nome { get; set; } = nome;
        private TipoMovimentacao TipoMovimentacao { get; set; } = tipoMovimentacao;
        private string? UsuarioId { get; set; } = usuarioId;
    }
}