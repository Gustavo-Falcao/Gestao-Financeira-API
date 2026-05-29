using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Entities
{
    public class Categoria (string nome, TipoMovimentacao tipoMovimentacao, string usuarioId)
    {
        public string Id { get; private set; } = Guid.NewGuid().ToString("N");
        public string Nome { get; private set; } = nome;
        public TipoMovimentacao TipoMovimentacao { get; private set; } = tipoMovimentacao;
        public string UsuarioId { get; private set; } = usuarioId;

        public void AlterarNome(string novoNome)
        {
            Nome = novoNome;
        }

        public void AlterarTipoMovimentacao(TipoMovimentacao novoTipoMovimentacao)
        {
            TipoMovimentacao = novoTipoMovimentacao;
        }
     }
}