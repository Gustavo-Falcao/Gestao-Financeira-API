namespace Gestao_Financeira.Models.Dtos
{
    public class UserCreateRequest
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;

        public UserCreateRequest (string nome, string email, string senha)
        {
            Nome = nome;
            Email = email;
            Senha = senha;
        }
    }
}