using System.ComponentModel.DataAnnotations;
using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class TransacaoUpdateRequest
    {
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Descrição deve ter entre 2 e 100 caracteres.")]
        public string? Descricao { get; set; } 
        
        public decimal? Valor { get; set; }
        
        public DateOnly? Data { get; set; }

        public string? ContaId { get; set; }

        public string? CategoriaId { get; set; }
    }
}