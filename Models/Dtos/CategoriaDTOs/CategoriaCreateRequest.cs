using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class CategoriaCreateRequest
    {
        public string Nome { get; set; } = string.Empty;
        public TipoMovimentacao TipoMovimentacao { get; set; }
        public string UsuarioId { get; set; } = string.Empty;
    }
}