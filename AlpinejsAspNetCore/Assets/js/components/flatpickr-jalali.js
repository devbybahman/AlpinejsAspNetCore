import moment from "jalali-moment";

export function flatpickrPluginJalali() {
  return function (fp) {
    const toPersianNumber = (num) => {
      const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return String(num).replace(
        /\d/g,
        (digit) => persianDigits[parseInt(digit)],
      );
    };

    const l10n = {
      weekdays: {
        shorthand: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
        longhand: [
          "یک‌شنبه",
          "دوشنبه",
          "سه‌شنبه",
          "چهارشنبه",
          "پنج‌شنبه",
          "جمعه",
          "شنبه",
        ],
      },
      months: {
        shorthand: [
          "فرو",
          "ارد",
          "خرد",
          "تیر",
          "مرد",
          "شهر",
          "مهر",
          "آبا",
          "آذر",
          "دی",
          "بهم",
          "اسف",
        ],
        longhand: [
          "فروردین",
          "اردیبهشت",
          "خرداد",
          "تیر",
          "مرداد",
          "شهریور",
          "مهر",
          "آبان",
          "آذر",
          "دی",
          "بهمن",
          "اسفند",
        ],
      },
      firstDayOfWeek: 6,
    };

    fp.l10n = { ...fp.l10n, ...l10n };

    // تبدیل با jalali-moment
    const toJalali = (date) => {
      const m = moment(date).locale("fa");
      return {
        jy: parseInt(m.format("jYYYY")),
        jm: parseInt(m.format("jM")),
        jd: parseInt(m.format("jD")),
      };
    };

    const toGregorian = (jy, jm, jd) => {
      return moment(`${jy}/${jm}/${jd}`, "jYYYY/jM/jD").toDate();
    };

    // فرمت خروجی
    const originalFormatDate = fp.formatDate;
    fp.formatDate = function (date, format) {
      if (format === "Y/m/d" || format === "Y-m-d") {
        const m = moment(date).locale("fa");
        return m.format("jYYYY/jMM/jDD");
      }
      return originalFormatDate(date, format);
    };

    // پارس ورودی
    const originalParseDate = fp.parseDate;
    fp.parseDate = function (dateStr, format) {
      if (
        (format === "Y/m/d" || format === "Y-m-d") &&
        typeof dateStr === "string"
      ) {
        const m = moment(dateStr, "jYYYY/jMM/jDD");
        if (m.isValid()) {
          return m.toDate();
        }
      }
      return originalParseDate(dateStr, format);
    };

    function updateCalendar() {
      setTimeout(() => {
        if (fp.currentMonthElement && fp.currentYearElement) {
          const viewDate = new Date(fp.currentYear, fp.currentMonth, 15);
          const j = toJalali(viewDate);

          fp.currentMonthElement.textContent = l10n.months.longhand[j.jm - 1];
          fp.currentYearElement.value = j.jy;
        }

        const dayElements =
          fp.calendarContainer.querySelectorAll(".flatpickr-day");
        dayElements.forEach((dayEl) => {
          if (dayEl.dateObj) {
            const j = toJalali(dayEl.dateObj);
            dayEl.textContent = toPersianNumber(j.jd);
          }
        });
      }, 0);
    }

    return {
      onReady: [updateCalendar],
      onMonthChange: [updateCalendar],
      onYearChange: [updateCalendar],
      onOpen: [updateCalendar],
      onValueUpdate: [updateCalendar],
    };
  };
}
