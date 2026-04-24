namespace Gestao_Financeira.Models.Entities
{
    public class User
    {
        public string Id { get; private set; } = string.Empty;
        public string Nome { get; private set; } = string.Empty;
        public string Email { get; private set; } = string.Empty;
        public string SenhaHash { get; private set; } = string.Empty;

        public User(string nome, string email, string senhaHash)
        {
            Id = Guid.NewGuid().ToString("N");
            Nome = nome;
            Email = email;
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(senhaHash);
        }

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
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(novaSenhaHash);
        }

    }
}