namespace Gestao_Financeira.Models.Entities
{
    public class User(string nome, string email, string senhaHash)
    {
        public string? Id { get; private set; } = Guid.NewGuid().ToString("N");
        public string? Nome { get; private set; } = nome;
        public string? Email { get; private set; } = email;
        public string? SenhaHash { get; private set; } = BCrypt.Net.BCrypt.HashPassword(senhaHash);

        public void AlterarNome(string novoNome)
        {
            Nome = novoNome;
        }

        public void AlterarEmail(string novoEmail)
        {
            Email = novoEmail;
        }

        public void AlterarSenhaHash(string novaSenhaHash)
        {
            SenhaHash = novaSenhaHash;
        }

    }
}