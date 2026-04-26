using System.ComponentModel.DataAnnotations;

namespace Gestao_Financeira.Models.Dtos.UserDTOs
{
    public class UserUpdateRequest
    {
        [StringLength(100, MinimumLength = 3, ErrorMessage = "O nome dever ter entre 3 e 100 caracteres.")]
        public string? Nome { get; set; } 

        [StringLength(150, MinimumLength = 5, ErrorMessage = "O email deve ter entre 5 e 150 caracteres.")]
        [EmailAddress(ErrorMessage = "Formato de email inválido.")]
        public string? Email { get; set; } 

        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)\\S{8,50}$", ErrorMessage = "Senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 dígito e ter entre 8 e 50 caracteres, sem espaços em branco.")]
        public string? Senha { get; set; }
    }
}