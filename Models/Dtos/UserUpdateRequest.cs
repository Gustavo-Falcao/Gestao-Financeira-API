namespace Gestao_Financeira.Models.Dtos
{
    public class UserUpdateRequest
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public UserUpdateRequest (string nome, string email)
        {
            Nome = nome;
            Email = email;
        }
    }
}