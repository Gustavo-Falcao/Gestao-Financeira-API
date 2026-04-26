using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos
{
    public class TransacaoUpdateRequest
    {
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoMovimentacao TipoMovimentacao { get; set; }
    }
}