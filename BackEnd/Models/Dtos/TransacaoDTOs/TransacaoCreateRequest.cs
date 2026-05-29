using System.ComponentModel.DataAnnotations;
using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class TransacaoCreateRequest
    {
        [Required(ErrorMessage = "Descrição é obrigatória.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Descrição deve ter entre 2 e 100 caracteres.")]
        public string Descricao { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Valor é obrigatório.")]
        public decimal Valor { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Tipo de movimentação é obrigatório.")]
        public TipoMovimentacao TipoMovimentacao { get; set; }

        [Required(ErrorMessage = "Data é obrigatória.")]
        public DateOnly? Data { get; set; }

        [Required(ErrorMessage = "Id do usuario é obrigatório.")]
        public string UsuarioId { get; set; } = string.Empty;

        [Required(ErrorMessage = "Id da conta é obrigatório.")]
        public string ContaId { get; set; } = string.Empty;

        [Required(ErrorMessage = "Id da categoria é obrigatório.")]
        public string CategoriaId { get; set; } = string.Empty;
    }
}