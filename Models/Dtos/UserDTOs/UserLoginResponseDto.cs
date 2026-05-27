namespace Gestao_Financeira.Models.Dtos.UserDTOs
{
    public class UserLoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}