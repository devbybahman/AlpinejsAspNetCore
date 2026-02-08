using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Admin.Areas.Admin.Pages;

//[Authorize]
[AllowAnonymous]
public class IndexModel : PageModel
{
    // آمار بالای صفحه
    public long TotalSalesToday { get; set; }
    public int PendingOrdersCount { get; set; }
    public int NewUsersCount { get; set; }
    public int LowStockProductsCount { get; set; }

    // لیست سفارشات اخیر
    public List<RecentOrderViewModel> RecentOrders { get; set; } = new();

    public void OnGet()
    {
        // TODO: بعداً این‌ها را از سرویس‌های مربوطه (ReportService) بخوانید
        // فعلاً دیتای نمایشی برای پرزنت:

        TotalSalesToday = 125000000; // ۱۲۵ میلیون
        PendingOrdersCount = 14;
        NewUsersCount = 5;
        LowStockProductsCount = 3;

        RecentOrders = new List<RecentOrderViewModel>
        {
            new()
            {
                Id = 1050, CustomerName = "علی رضایی", TotalPrice = 15000000, Status = "پرداخت شده",
                StatusColor = "green", Date = "1403/10/09"
            },
            new()
            {
                Id = 1049, CustomerName = "سارا امینی", TotalPrice = 4500000, Status = "در انتظار بررسی",
                StatusColor = "yellow", Date = "1403/10/09"
            },
            new()
            {
                Id = 1048, CustomerName = "شرکت معماری آرت", TotalPrice = 89000000, Status = "ارسال شده",
                StatusColor = "blue", Date = "1403/10/08"
            },
            new()
            {
                Id = 1047, CustomerName = "محمد محمدی", TotalPrice = 2100000, Status = "لغو شده", StatusColor = "red",
                Date = "1403/10/08"
            },
            new()
            {
                Id = 1046, CustomerName = "مریم کاظمی", TotalPrice = 12500000, Status = "پرداخت شده",
                StatusColor = "green", Date = "1403/10/08"
            },
        };
    }

    public string GetGreeting()
    {
        var hour = DateTime.Now.Hour;
        return hour < 12 ? "صبح بخیر" : (hour < 18 ? "عصر بخیر" : "شب بخیر");
    }
}

// ویومدل داخلی برای گرید داشبورد
public class RecentOrderViewModel
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public long TotalPrice { get; set; }
    public string Status { get; set; }
    public string StatusColor { get; set; } // green, red, yellow, blue
    public string Date { get; set; }
}