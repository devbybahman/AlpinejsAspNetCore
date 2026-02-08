using clean_arch.Application.City.DTOs;
using clean_arch.Application.City.Services;
using clean_arch.Application.State.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Admin.Areas.Admin.Pages.BaseInfo.Pages.Cities;

public class Manage : PageModel
{
    private readonly ICityService _cityService;
    private readonly IStateService _stateService;

    public Manage(ICityService cityService, IStateService stateService)
    {
        _cityService = cityService;
        _stateService = stateService;
    }

    [BindProperty]
    public UpdateCityDto CityData { get; set; } = new();
    public SelectList StateOptions { get; set; }

    public string PageTitle => CityData.Id == 0 ? "افزودن شهر جدید" : "ویرایش شهر";

    public async Task OnGet(int? id)
    {
        await LoadStatesAsync(); 
        if (id.HasValue)
        {
            var city = await _cityService.GetCityByIdAsync(id.Value);
            if (city != null)
            {
                CityData = new UpdateCityDto 
                { 
                    Id = city.Id, 
                    Name = city.Name, 
                    StateId = city.StateId, 
                    IsActive = city.IsActive 
                };
            }
        }
    }

    public async Task<IActionResult> OnPost()
    {
        if (!ModelState.IsValid) return Page();

        if (CityData.Id == 0)
        {
            var createDto = new CreateCityDto { Name = CityData.Name, StateId = CityData.StateId, IsActive = CityData.IsActive };
            await _cityService.CreateCityAsync(createDto);
        }
        else
        {
            await _cityService.UpdateCityAsync(CityData);
        }

        return RedirectToPage("Index");
    }
    private async Task LoadStatesAsync()
    {
        var states = await _stateService.GetAllStatesAsync();
     
        StateOptions = new SelectList(states, "Id", "Name"); 
    }
}