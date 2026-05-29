using Gestao_Financeira.Models.Dtos.UserDTOs;

namespace Gestao_Financeira.Services.ProfileService
{
    public interface IProfileService
    {
        UserProfileResponseDto GetProfileById(string id);
    }
}