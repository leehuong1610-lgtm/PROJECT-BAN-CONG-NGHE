(() => {
  const SIDEBAR_ITEMS = [
    {
      key: "dashboard",
      labelKey: "menu_dashboard",
      icon: "fas fa-chart-pie",
      href: "dashboard.html",
    },
    {
      key: "activity",
      labelKey: "menu_activity",
      icon: "fas fa-pen-nib",
      href: "activity.html",
    },
    {
      key: "courses",
      labelKey: "menu_courses",
      icon: "fas fa-graduation-cap",
      href: "courses.html",
    },
    {
      key: "goals",
      labelKey: "menu_goals",
      icon: "fas fa-bullseye",
      href: "goals.html",
    },
    {
      key: "progress",
      labelKey: "menu_progress",
      icon: "fas fa-chart-line",
      href: "progress.html",
    },
    {
      key: "badges",
      labelKey: "menu_badges",
      icon: "fas fa-award",
      href: "badges.html",
    },
    {
      key: "history",
      labelKey: "menu_history",
      icon: "fas fa-history",
      href: "history.html",
    },
    {
      key: "report",
      labelKey: "menu_report",
      icon: "fas fa-file-alt",
      href: "report.html",
    },
    {
      key: "terms",
      labelKey: "menu_terms",
      icon: "fas fa-shield-alt",
      href: "terms.html",
    },
    {
      key: "settings",
      labelKey: "menu_settings",
      icon: "fas fa-cog",
      href: "settings.html",
    },
    {
      key: "logout",
      labelKey: "menu_logout",
      icon: "fas fa-sign-out-alt",
      href: "auth.html",
      onClick: "localStorage.clear();",
    },
  ];

  const SidebarTranslations = {
    vi: {
      menu_dashboard: "Tổng quan",
      menu_activity: "Ghi nhận Hoạt động",
      menu_courses: "Khóa học",
      menu_goals: "Mục tiêu",
      menu_progress: "Tiến độ",
      menu_badges: "Huy hiệu",
      menu_history: "Nhật ký",
      menu_report: "Hồ sơ Kỹ năng",
      menu_terms: "Điều khoản & Chính sách",
      menu_settings: "Cài đặt",
      menu_settings_adv: "Cài đặt nâng cao",
      menu_logout: "Đăng xuất",
    },
    en: {
      menu_dashboard: "Dashboard",
      menu_activity: "Log Activity",
      menu_courses: "Courses",
      menu_goals: "Goals",
      menu_progress: "Progress",
      menu_badges: "Badges",
      menu_history: "History",
      menu_report: "Skill Profile (CV)",
      menu_terms: "Terms & Privacy",
      menu_settings: "Settings",
      menu_settings_adv: "Advanced Settings",
      menu_logout: "Logout",
    },
  };

  function getCurrentLang() {
    return localStorage.getItem("language") || "vi";
  }

  function getLabel(key, lang = getCurrentLang()) {
    const dict = SidebarTranslations[lang] || SidebarTranslations.vi;
    return dict[key] || SidebarTranslations.vi[key] || key;
  }

  function renderSidebar(activeKey) {
    const nav = document.querySelector(".sidebar nav");
    if (!nav) return;
    const lang = getCurrentLang();
    nav.innerHTML = SIDEBAR_ITEMS.map((item) => {
      const activeClass = item.key === activeKey ? "active" : "";
      const label = getLabel(item.labelKey, lang);
      const onClickAttr = item.onClick ? ` onclick="${item.onClick}"` : "";
      return `<a href="${item.href}" class="${activeClass}" data-translate="${item.labelKey}"${onClickAttr}><i class="${item.icon}"></i> ${label}</a>`;
    }).join("");
  }

  function applySidebarLanguage(lang) {
    const targetLang = lang || getCurrentLang();
    document.querySelectorAll(".sidebar [data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate");
      const icon = el.querySelector("i");
      el.innerHTML = `${icon ? icon.outerHTML : ""} ${getLabel(
        key,
        targetLang
      )}`;
    });
  }

  window.Sidebar = {
    renderSidebar,
    applySidebarLanguage,
    SIDEBAR_ITEMS,
    SidebarTranslations,
  };
})();
