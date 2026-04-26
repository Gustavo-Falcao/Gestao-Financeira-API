using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class TransacaoResponseDto
    {
        public string? Id { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public TipoMovimentacao TipoMovimentacao { get; set; }
        public DateTime Data { get; set; }
        public string? UsuarioId { get; set; }
        public string? ContaId { get; set; }
        public string? CategoriaId { get; set; }
    }
}