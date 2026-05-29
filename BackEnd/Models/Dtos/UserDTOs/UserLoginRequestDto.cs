using System.ComponentModel.DataAnnotations;

namespace Gestao_Financeira.Models.Dtos
{
    public record UserLoginRequestDto(
        [Required(ErrorMessage = "Email é obrigatório.")]
        [StringLength(150, MinimumLength = 5, ErrorMessage = "O email deve ter entre 5 e 150 caracteres.")]
        [EmailAddress(ErrorMessage = "Formato de email inválido.")]
        string Email,

        [Required(ErrorMessage = "Senha é obrigatória.")]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)\\S{8,50}$", ErrorMessage = "Senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 dígito e ter entre 8 e 50 caracteres, sem espaços em branco.")]
        string Senha
    );
    
}