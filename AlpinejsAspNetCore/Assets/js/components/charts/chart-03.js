import ApexCharts from "apexcharts";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);
dayjs.calendar("jalali");

const chart03 = () => {
  const allData = {
    sales: [
      { x: "2025-03-21", y: 180 },
      { x: "2025-04-21", y: 190 },
      { x: "2025-05-22", y: 170 },
      { x: "2025-06-21", y: 160 },
      { x: "2025-07-22", y: 175 },
      { x: "2025-08-22", y: 165 },
      { x: "2025-09-22", y: 170 },
      { x: "2025-10-22", y: 205 },
      { x: "2025-11-21", y: 230 },
      { x: "2025-12-21", y: 210 },
      { x: "2026-01-20", y: 240 },
      { x: "2026-02-19", y: 235 },
    ],
    revenue: [
      { x: "2025-03-21", y: 40 },
      { x: "2025-04-21", y: 30 },
      { x: "2025-05-22", y: 50 },
      { x: "2025-06-21", y: 40 },
      { x: "2025-07-22", y: 55 },
      { x: "2025-08-22", y: 40 },
      { x: "2025-09-22", y: 70 },
      { x: "2025-10-22", y: 100 },
      { x: "2025-11-21", y: 110 },
      { x: "2025-12-21", y: 120 },
      { x: "2026-01-20", y: 150 },
      { x: "2026-02-19", y: 140 },
    ],
  };

  const getSeriesData = (type) => {
    if (type === "overview") {
      return [
        { name: "فروش", data: allData.sales },
        { name: "درآمد", data: allData.revenue },
      ];
    } else if (type === "sales") {
      return [{ name: "فروش", data: allData.sales }];
    } else if (type === "revenue") {
      return [{ name: "درآمد", data: allData.revenue }];
    }
  };

  const options = {
    series: getSeriesData("overview"),

    chart: {
      type: "area",
      height: 310,
      fontFamily: "kalame, sans-serif",
      toolbar: { show: false },
    },

    colors: ["#465FFF", "#9CB9FF"],

    stroke: {
      curve: "straight",
      width: 2,
    },

    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },

    dataLabels: { enabled: false },

    markers: {
      size: 5,
      strokeWidth: 2,
      strokeColors: "#fff",
      hover: {
        size: 7,
        sizeOffset: 3,
      },
    },

    legend: { show: false },

    xaxis: {
      type: "datetime",
      labels: {
        formatter: (value) =>
          dayjs(value).calendar("jalali").locale("fa").format("MMMM"),
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    tooltip: {
      shared: true,
      intersect: false,
      followCursor: false,
      fixed: {
        enabled: false,
      },
      x: {
        formatter: (value) =>
          dayjs(value).calendar("jalali").locale("fa").format("YYYY/MM/DD"),
      },
    },

    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },

    yaxis: {
      title: { text: "" },
    },
  };

  const el = document.querySelector("#chartThree");
  if (el) {
    const chart = new ApexCharts(el, options);
    chart.render();

    // گوش دادن به کلیک دکمه‌ها
    const buttons = document.querySelectorAll('[x-data*="selected"] button');

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const buttonText = e.target.textContent.trim();
        let type = "overview";

        if (buttonText === "فروش") {
          type = "sales";
        } else if (buttonText === "درآمد") {
          type = "revenue";
        }

        chart.updateSeries(getSeriesData(type));
      });
    });
  }
};

export default chart03;
