using System.ComponentModel.DataAnnotations;

namespace Gestao_Financeira.Models.Dtos
{
    public class TransacaoUpdateRequest
    {
        public string? Descricao { get; set; } 
        
        public decimal? Valor { get; set; }
        
        public DateOnly? Data { get; set; }

        public string? ContaId { get; set; }

        public string? CategoriaId { get; set; }
    }
}