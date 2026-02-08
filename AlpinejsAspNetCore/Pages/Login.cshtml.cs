using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Admin;

[AllowAnonymous]
public class Login : PageModel
{
    [BindProperty] public InputModel Input { get; set; }

    public string ReturnUrl { get; set; }

    public void OnGet(string returnUrl = null)
    {
        ReturnUrl = returnUrl ?? "/admin/";
    }

    public async Task<IActionResult> OnPostAsync(string returnUrl = null)
    {
        returnUrl ??= "/admin/";

        if (!ModelState.IsValid) return Page();

        // TODO: اینجا باید سرویس یوزر (UserService) رو صدا بزنی و چک کنی توی دیتابیس هست یا نه
        // فعلاً برای تست، هاردکد چک می‌کنیم:
        if (Input.Username == "admin" && Input.Password == "123")
        {
            // 1. ساختن هویت کاربر (Claims)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, "Admin User"),
                new Claim(ClaimTypes.NameIdentifier, "1"), // User ID
                new Claim(ClaimTypes.Role, "SuperAdmin") // نقش کاربر
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = Input.RememberMe, // مرا به خاطر بسپار
                ExpiresUtc = DateTime.UtcNow.AddHours(8)
            };

            // 2. صدور کوکی (Sign In)
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            // 3. هدایت به صفحه‌ای که کاربر می‌خواست برود
            return LocalRedirect(returnUrl);
        }

        // اگر رمز اشتباه بود
        ModelState.AddModelError(string.Empty, "نام کاربری یا رمز عبور اشتباه است.");
        return Page();
    }

    public class InputModel
    {
        [Required(ErrorMessage = "نام کاربری الزامی است")]
        public string Username { get; set; }

        [Required(ErrorMessage = "رمز عبور الزامی است")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}