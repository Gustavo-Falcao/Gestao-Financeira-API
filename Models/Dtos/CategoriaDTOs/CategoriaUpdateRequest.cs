using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class CategoriaUpdateRequest
    {
        public string Nome { get; set; } = string.Empty;
        public TipoMovimentacao TipoMovimentacao { get; set; }
    }
}