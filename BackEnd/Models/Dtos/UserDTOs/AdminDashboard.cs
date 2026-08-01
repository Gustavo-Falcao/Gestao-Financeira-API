using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Models.Dtos.UserDTOs
{
    public class AdminDashboard
    {
        public int QuantUsers { get; set; }
        public int QuantAdmin { get; set; }
        public List<UserResponseDto> Users { get; set; } = new ();
    }
}