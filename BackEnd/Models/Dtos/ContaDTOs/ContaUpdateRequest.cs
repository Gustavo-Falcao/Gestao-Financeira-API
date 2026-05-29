using System.ComponentModel.DataAnnotations;
using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos.ContaDTOs
{
    public class ContaUpdateRequest
    {
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Nome deve ter entre 2 e 100 caracteres.")]
        public string? Nome { get; set; }
        public TipoConta? TipoConta { get; set; }
        public decimal? SaldoInicial { get; set; }
    }
}