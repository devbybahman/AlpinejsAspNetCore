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
        
        // fetch first 10 city 
        public async Task OnGet(int pageNumber = 1)
        {
            Cities = await _cityService.GetAllCitiesAsync(pageNumber, 10,false);
        }

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            await _cityService.DeleteCityAsync(id);
            return RedirectToPage();
        }
        // fetch the other cities with ajax pagination and filters
        public async Task<JsonResult> OnGetCitiesJsonAsync(int pageNumber = 1, string name = null, string stateName = null, string deliveryType = null, bool? isCashDelivery = null, bool? isActive = null)
        {
            var filter = new CityFilterDto
            {
                Name = name,
                StateName = stateName,
                DeliveryType = deliveryType,
                IsCashDelivery = isCashDelivery,
                IsActive = isActive,
                PageNumber = pageNumber,
                PageSize = 10
            };

            var result = await _cityService.GetFilteredCitiesAsync(filter);

            return new JsonResult(new
            {
                items = result.Items,
                currentPage = result.CurrentPage,
                totalPages = result.TotalPages,
                totalCount = result.TotalCount,
                totalItems = result.TotalCount
            });
        }
        // for exel export
        public async Task<JsonResult> OnGetExportCitiesAsync(string name, string stateName, string deliveryType, bool? isCashDelivery, bool? isActive)
        {
            var allItems = await _cityService.GetFilteredCitiesForExportAsync(name, stateName, deliveryType, isCashDelivery, isActive);
            return new JsonResult(allItems);
        }
    }
}


