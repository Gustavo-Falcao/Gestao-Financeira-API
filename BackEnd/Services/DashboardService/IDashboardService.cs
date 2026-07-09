using Gestao_Financeira.Models.Dtos.UserDTOs;

namespace Gestao_Financeira.Services.DashboardService
{
    public interface IDashboardService
    {
        UserDashboardDto GetDashboardByUserId(string id);
    }
}