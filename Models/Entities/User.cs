namespace GestaoFinanceira.Models.Entities
{
    public class User(string nome, string email, string senhaHash)
    {
        private string? Id { get; set; } = Guid.NewGuid().ToString("N");
        private string? Nome { get; set; } = nome;
        private string? Email { get; set; } = email;
        private string? SenhaHash { get; set; } = senhaHash;
    }
}