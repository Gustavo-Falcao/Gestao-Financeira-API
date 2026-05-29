using System.ComponentModel.DataAnnotations;
using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos.ContaDTOs
{
    public class ContaCreateRequest
    {
        [Required(ErrorMessage = "Nome é obrigatório.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Nome deve ter entre 2 e 100 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "Tipo da conta é obrigatório.")]
        public TipoConta TipoConta { get; set; }
        public decimal? SaldoInicial { get; set; }

        [Required(ErrorMessage = "Id do usuario é obrigatório.")]
        public string UsuarioId { get; set; } = string.Empty;
    }
}