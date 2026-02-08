using clean_arch.Application.City.DTOs;
using clean_arch.Application.City.Services;
using clean_arch.Domain.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Admin.Areas.Admin.Pages.BaseInfo.Pages.Cities
{
    public class Index : PageModel
    {
        private readonly ICityService _cityService;

        public Index(ICityService cityService)
        {
            _cityService = cityService;
        }
        
        public PagedResult<CityDto> Cities { get; set; }
        
        public async Task OnGet(int pageNumber = 1)
        {
            Cities = await _cityService.GetAllCitiesAsync(pageNumber, 10);
        }

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            await _cityService.DeleteCityAsync(id);
            return RedirectToPage();
        }   
    }
}
