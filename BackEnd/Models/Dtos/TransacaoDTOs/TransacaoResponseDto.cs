using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class TransacaoResponseDto
    {
        public string Id { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoMovimentacao TipoMovimentacao { get; set; }
        public DateOnly Data { get; set; }
        public string UsuarioId { get; set; } = string.Empty;
        public string ContaId { get; set; } = string.Empty;
        public string CategoriaId { get; set; } = string.Empty;
    }
}