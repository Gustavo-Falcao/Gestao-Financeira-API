using System.ComponentModel.DataAnnotations;
using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class TransacaoUpdateRequest
    {
        public string? Descricao { get; set; } 
        
        public decimal? Valor { get; set; }

        public TipoMovimentacao? TipoMovimentacao { get; set;}
        
        public DateOnly? Data { get; set; }

        public string? ContaId { get; set; }

        public string? CategoriaId { get; set; }
    }
}