using Gestao_Financeira.Models.Enuns;

namespace Gestao_Financeira.Models.Dtos.UserDTOs
{
    public class UserProfileDto
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public UserRole UserRole { get; set; }
    }
}