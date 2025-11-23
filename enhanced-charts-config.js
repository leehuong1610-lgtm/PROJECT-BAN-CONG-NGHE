


function getEnhancedRadarChartConfig(
  data,
  labelColor = "#333",
  fillAlpha = 0.4
) {
  return {
    type: "radar",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
        delay: (context) => {
          let delay = 0;
          if (context.type === "data" && context.mode === "default") {
            delay = context.dataIndex * 100;
          }
          return delay;
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          min: 0,
          ticks: {
            stepSize: 1,
            font: {
              size: 12,
              family: "Roboto",
              weight: "500",
            },
            color: "#6B4FA2",
            backdropColor: "rgba(255, 255, 255, 0.8)",
            backdropPadding: 4,
          },
          grid: {
            color: "rgba(90, 24, 154, 0.15)",
            lineWidth: 2,
            circular: true,
          },
          angleLines: {
            color: "rgba(90, 24, 154, 0.15)",
            lineWidth: 2,
          },
          pointLabels: {
            font: {
              size: 14,
              weight: "600",
              family: "Roboto",
            },
            color: labelColor,
            padding: 15,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "center",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
            font: {
              size: 14,
              family: "Roboto",
              weight: "500",
            },
            color: "#333",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: 15,
          titleFont: {
            size: 16,
            weight: "bold",
            family: "Roboto",
          },
          bodyFont: {
            size: 14,
            family: "Roboto",
          },
          borderColor: "#5A189A",
          borderWidth: 2,
          borderRadius: 12,
          displayColors: true,
          callbacks: {
            title: function (context) {
              return context[0].label;
            },
            label: function (context) {
              const value = context.parsed.r;
              const percentage = ((value / 5) * 100).toFixed(0);
              return `${context.dataset.label}: ${value.toFixed(
                2
              )}/5.0 (${percentage}%)`;
            },
            afterLabel: function (context) {
              if (context.datasetIndex === 0 && context.dataIndex === 0) {
                const userValue = context.parsed.r;
                const benchmarkValue = context.chart.data.datasets[1]?.data[0];
                if (benchmarkValue) {
                  const diff = userValue - benchmarkValue;
                  if (diff > 0) {
                    return `✓ Vượt chuẩn ${diff.toFixed(1)} điểm`;
                  } else if (diff < 0) {
                    return `⚠ Thiếu ${Math.abs(diff).toFixed(
                      1
                    )} điểm so với chuẩn`;
                  }
                }
              }
              return "";
            },
          },
        },
      },
      elements: {
        line: {
          borderWidth: 3,
          tension: 0.1,
        },
        point: {
          radius: 5,
          hoverRadius: 8,
          borderWidth: 3,
        },
      },
    },
  };
}


function getEnhancedLineChartConfig(labels, data, forecastData = null) {
  const datasets = [
    {
      label: "Điểm Trung bình",
      data: data,
      borderColor: "#5A189A",
      backgroundColor: "rgba(90, 24, 154, 0.1)",
      fill: true,
      tension: 0.4, 
      pointRadius: 6,
      pointHoverRadius: 10,
      pointBackgroundColor: "#FFFFFF",
      pointBorderColor: "#5A189A",
      pointBorderWidth: 3,
      pointHoverBackgroundColor: "#5A189A",
      pointHoverBorderColor: "#FFFFFF",
      borderWidth: 3,
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      shadowBlur: 10,
      shadowColor: "rgba(90, 24, 154, 0.3)",
    },
  ];

  if (forecastData && forecastData.length > 0) {
    datasets.push({
      label: "Dự đoán",
      data: [...data, ...forecastData],
      borderColor: "#4F9AFF",
      backgroundColor: "rgba(79, 154, 255, 0.05)",
      fill: false,
      borderDash: [5, 5],
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.4,
    });
  }

  return {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14,
              family: "Roboto",
              weight: "500",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: 15,
          titleFont: {
            size: 16,
            weight: "bold",
            family: "Roboto",
          },
          bodyFont: {
            size: 14,
            family: "Roboto",
          },
          borderColor: "#5A189A",
          borderWidth: 2,
          borderRadius: 12,
          callbacks: {
            label: function (context) {
              const value = context.parsed.y;
              const trend =
                context.dataIndex > 0
                  ? value >
                    context.chart.data.datasets[0].data[context.dataIndex - 1]
                    ? "↑"
                    : "↓"
                  : "";
              return `${context.dataset.label}: ${value.toFixed(
                2
              )}/5.0 ${trend}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
            font: {
              size: 12,
              family: "Roboto",
            },
            color: "#6B4FA2",
          },
          grid: {
            color: "rgba(90, 24, 154, 0.1)",
            lineWidth: 1,
          },
        },
        x: {
          ticks: {
            font: {
              size: 12,
              family: "Roboto",
              weight: "500",
            },
            color: "#6B4FA2",
          },
          grid: {
            display: false,
          },
        },
      },
    },
  };
}


function getBarChartConfig(labels, userData, benchmarkData = null) {
  const datasets = [
    {
      label: "Điểm của bạn",
      data: userData,
      backgroundColor: function (context) {
        const value = context.parsed.y;
        if (value >= 4.0) return "rgba(16, 185, 129, 0.8)"; 
        if (value >= 3.0) return "rgba(245, 158, 11, 0.8)"; 
        return "rgba(239, 68, 68, 0.8)"; 
      },
      borderColor: function (context) {
        const value = context.parsed.y;
        if (value >= 4.0) return "#10B981";
        if (value >= 3.0) return "#F59E0B";
        return "#EF4444";
      },
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    },
  ];

  if (benchmarkData) {
    datasets.push({
      label: "Mức yêu cầu ngành",
      data: benchmarkData,
      backgroundColor: "rgba(255, 215, 0, 0.3)",
      borderColor: "#FFD700",
      borderWidth: 2,
      borderDash: [5, 5],
      borderRadius: 8,
    });
  }

  return {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14,
              family: "Roboto",
              weight: "500",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: 15,
          titleFont: {
            size: 16,
            weight: "bold",
            family: "Roboto",
          },
          bodyFont: {
            size: 14,
            family: "Roboto",
          },
          borderColor: "#5A189A",
          borderWidth: 2,
          borderRadius: 12,
          callbacks: {
            label: function (context) {
              const value = context.parsed.y;
              const diff = benchmarkData
                ? (value - benchmarkData[context.dataIndex]).toFixed(1)
                : null;
              let label = `${context.dataset.label}: ${value.toFixed(2)}/5.0`;
              if (diff !== null && context.datasetIndex === 0) {
                label += ` (${diff > 0 ? "+" : ""}${diff} so với chuẩn)`;
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
            font: {
              size: 12,
              family: "Roboto",
            },
            color: "#6B4FA2",
          },
          grid: {
            color: "rgba(90, 24, 154, 0.1)",
          },
        },
        x: {
          ticks: {
            font: {
              size: 12,
              family: "Roboto",
              weight: "500",
            },
            color: "#6B4FA2",
          },
          grid: {
            display: false,
          },
        },
      },
    },
  };
}


function getDoughnutChartConfig(labels, data) {
  const colors = [
    "rgba(90, 24, 154, 0.8)", 
    "rgba(79, 154, 255, 0.8)", 
    "rgba(16, 185, 129, 0.8)", 
    "rgba(245, 158, 11, 0.8)", 
    "rgba(239, 68, 68, 0.8)", 
  ];

  return {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderColor: "#FFFFFF",
          borderWidth: 3,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
        easing: "easeInOutQuart",
      },
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 13,
              family: "Roboto",
              weight: "500",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: 15,
          titleFont: {
            size: 16,
            weight: "bold",
            family: "Roboto",
          },
          bodyFont: {
            size: 14,
            family: "Roboto",
          },
          borderColor: "#5A189A",
          borderWidth: 2,
          borderRadius: 12,
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} hoạt động (${percentage}%)`;
            },
          },
        },
      },
      cutout: "60%",
    },
  };
}


function getAreaChartConfig(labels, datasets) {
  const colors = [
    { bg: "rgba(90, 24, 154, 0.6)", border: "#5A189A" },
    { bg: "rgba(79, 154, 255, 0.6)", border: "#4F9AFF" },
    { bg: "rgba(16, 185, 129, 0.6)", border: "#10B981" },
    { bg: "rgba(245, 158, 11, 0.6)", border: "#F59E0B" },
    { bg: "rgba(239, 68, 68, 0.6)", border: "#EF4444" },
  ];

  const formattedDatasets = datasets.map((data, index) => ({
    label: data.label,
    data: data.values,
    backgroundColor: colors[index % colors.length].bg,
    borderColor: colors[index % colors.length].border,
    borderWidth: 2,
    fill: true,
    tension: 0.4,
  }));

  return {
    type: "line",
    data: {
      labels: labels,
      datasets: formattedDatasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 13,
              family: "Roboto",
              weight: "500",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          padding: 15,
          titleFont: {
            size: 16,
            weight: "bold",
            family: "Roboto",
          },
          bodyFont: {
            size: 14,
            family: "Roboto",
          },
          borderColor: "#5A189A",
          borderWidth: 2,
          borderRadius: 12,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          stacked: false,
          ticks: {
            stepSize: 1,
            font: {
              size: 12,
              family: "Roboto",
            },
            color: "#6B4FA2",
          },
          grid: {
            color: "rgba(90, 24, 154, 0.1)",
          },
        },
        x: {
          stacked: false,
          ticks: {
            font: {
              size: 12,
              family: "Roboto",
              weight: "500",
            },
            color: "#6B4FA2",
          },
          grid: {
            display: false,
          },
        },
      },
    },
  };
}

if (typeof window !== "undefined") {
  window.getEnhancedRadarChartConfig = getEnhancedRadarChartConfig;
  window.getEnhancedLineChartConfig = getEnhancedLineChartConfig;
  window.getBarChartConfig = getBarChartConfig;
  window.getDoughnutChartConfig = getDoughnutChartConfig;
  window.getAreaChartConfig = getAreaChartConfig;
}
