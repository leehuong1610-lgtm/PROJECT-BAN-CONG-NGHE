(() => {
  const USERS_KEY = "fx_users";
  const ACTIVITIES_KEY = "userActivities";
  const CURRENT_USER_KEY = "currentUser";
  const CURRENT_USER_PROFILE_KEY = "currentUserProfile";

  const MOCK_USERS = [
    {
      id: "user_demo",
      fullName: "Sinh viên Demo",
      username: "demo",
      email: "demo@futurexion.com",
      password: "Future@123",
      provider: "local",
      university: "ĐH Kinh tế Quốc dân",
      major: "Quản trị Kinh doanh",
    },
    {
      id: "user_ops",
      fullName: "Lan Anh (Operations)",
      username: "lananh",
      email: "lananh@futurexion.com",
      password: "LanAnh@2024",
      provider: "local",
      university: "ĐH Ngoại thương",
      major: "Logistics",
    },
    {
      id: "user_dev",
      fullName: "Tuấn Kiệt (Product)",
      username: "kietproduct",
      email: "kiet@futurexion.com",
      password: "Kiet#Product1",
      provider: "local",
      university: "ĐH Bách Khoa",
      major: "Khoa học Máy tính",
    },
  ];

  const MOCK_ACTIVITIES = [
    {
      id: 1,
      user: "Sinh viên Demo",
      name: "Dẫn dắt dự án gây quỹ CLB",
      skill: "Lãnh đạo",
      date: "2024-05-12",
      points: 88,
      description:
        "Tổ chức đội 8 thành viên, đạt 120% KPI tài trợ cho sự kiện Mùa Hè Xanh.",
      translations: {
        vi: {
          user: "Sinh viên Demo",
          name: "Dẫn dắt dự án gây quỹ CLB",
          description:
            "Tổ chức đội 8 thành viên, đạt 120% KPI tài trợ cho sự kiện Mùa Hè Xanh.",
            skill: "Lãnh đạo",
        },
        en: {
          user: "Demo Student",
          name: "Led club fundraising campaign",
          description:
            "Coordinated an 8-person team and surpassed the Green Summer sponsorship KPI by 120%.",
        },
      },
    },
    {
      id: 2,
      user: "Sinh viên Demo",
      name: "Workshop thuyết trình cấp khoa",
      skill: "Giao tiếp",
      date: "2024-06-03",
      points: 92,
      description:
        "Chia sẻ về storytelling cho 150 sinh viên, nhận đánh giá 4.6/5.",
      translations: {
        vi: {
          user: "Sinh viên Demo",
          name: "Workshop thuyết trình cấp khoa",
          description:
            "Chia sẻ về storytelling cho 150 sinh viên, nhận đánh giá 4.6/5.",
             skill: "Giao tiếp",
        },
        en: {
          user: "Demo Student",
          name: "Faculty keynote on storytelling",
          description:
            "Delivered a storytelling workshop to 150 students and received a 4.6/5 rating.",
        },
      },
    },
    {
      id: 3,
      user: "Sinh viên Demo",
      name: "Giải case cuộc thi BizChallenge",
      skill: "Giải quyết vấn đề",
      date: "2024-07-25",
      points: 95,
      description:
        "Phân tích dữ liệu thị trường và đề xuất chiến lược marketing đa kênh.",
      translations: {
        vi: {
          user: "Sinh viên Demo",
          name: "Giải case cuộc thi BizChallenge",
          description:
            "Phân tích dữ liệu thị trường và đề xuất chiến lược marketing đa kênh.",
        skill: "Giải quyết vấn đề",
          },
        en: {
          user: "Demo Student",
          name: "Solved BizChallenge case competition",
          description:
            "Analyzed market data and proposed an integrated multi-channel marketing strategy.",
        },
      },
    },
    {
      id: 4,
      user: "Sinh viên Demo",
      name: "Sprint xây dựng landing page",
      skill: "Làm việc nhóm",
      date: "2024-08-14",
      points: 84,
      description:
        "Phối hợp nhóm 4 người, hoàn thiện giao diện và nội dung trong 48 giờ.",
      translations: {
        vi: {
          user: "Sinh viên Demo",
          name: "Sprint xây dựng landing page",
          description:
            "Phối hợp nhóm 4 người, hoàn thiện giao diện và nội dung trong 48 giờ.",
        skill: "Làm việc nhóm",
          },
        en: {
          user: "Demo Student",
          name: "Landing-page sprint build",
          description:
            "Partnered with a 4-person squad to finalize UI and copy within 48 hours.",
        },
      },
    },
    {
      id: 5,
      user: "Sinh viên Demo",
      name: "Phân tích hành vi người dùng nội bộ",
      skill: "Tư duy phản biện",
      date: "2024-09-09",
      points: 78,
      description: "Sử dụng phương pháp SWOT để đề xuất 3 cải tiến sản phẩm.",
      translations: {
        vi: {
          user: "Sinh viên Demo",
          name: "Phân tích hành vi người dùng nội bộ",
          description:
            "Sử dụng phương pháp SWOT để đề xuất 3 cải tiến sản phẩm.",
        skill: "Tư duy phản biện",
          },
        en: {
          user: "Demo Student",
          name: "Internal user behavior analysis",
          description:
            "Applied SWOT insights to recommend three product experience improvements.",
        },
      },
    },
    {
      id: 6,
      user: "Sinh viên Demo",
      name: "Mentor cho đàn em về kỹ năng mềm",
      skill: "Lãnh đạo",
      date: "2024-10-01",
      points: 81,
      description:
        "Thiết kế lộ trình 4 tuần, theo dõi tiến độ từng mentee qua Notion.",
      translations: {
        vi: {
          user: "Sinh viên Demo",
          name: "Mentor cho đàn em về kỹ năng mềm",
          description:
            "Thiết kế lộ trình 4 tuần, theo dõi tiến độ từng mentee qua Notion.",
        skill: "Lãnh đạo",
          },
        en: {
          user: "Demo Student",
          name: "Mentored juniors on soft skills",
          description:
            "Designed a 4-week plan and tracked each mentee's progress inside Notion.",
        },
      },
    },
  ];

  const safeParse = (value, fallback) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn("Không thể parse dữ liệu mock:", error);
      return fallback;
    }
  };

  function ensureMockUsers() {
    const storedUsers = safeParse(localStorage.getItem(USERS_KEY), []);
    if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
      localStorage.setItem(USERS_KEY, JSON.stringify(MOCK_USERS));
      localStorage.setItem(CURRENT_USER_KEY, MOCK_USERS[0].fullName);
      localStorage.setItem(
        CURRENT_USER_PROFILE_KEY,
        JSON.stringify(MOCK_USERS[0])
      );
    }
  }

  function ensureMockActivities(force = false) {
    const storedActivities = safeParse(
      localStorage.getItem(ACTIVITIES_KEY),
      []
    );
    if (
      force ||
      !Array.isArray(storedActivities) ||
      storedActivities.length === 0
    ) {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(MOCK_ACTIVITIES));
    }
  }

  function ensureMockData() {
    ensureMockUsers();
    ensureMockActivities();
  }

  function getCurrentLanguage() {
    return localStorage.getItem("language") || "vi";
  }

  function getLocalizedActivityText(
    activity,
    field,
    lang = getCurrentLanguage()
  ) {
    if (!activity) return "";
    if (
      activity.translations &&
      activity.translations[lang] &&
      activity.translations[lang][field]
    ) {
      return activity.translations[lang][field];
    }
    if (activity[field]) return activity[field];
    if (
      activity.translations &&
      activity.translations.vi &&
      activity.translations.vi[field]
    ) {
      return activity.translations.vi[field];
    }
    return "";
  }

  ensureMockData();

  window.MockData = {
    USERS_KEY,
    ACTIVITIES_KEY,
    CURRENT_USER_KEY,
    CURRENT_USER_PROFILE_KEY,
    MOCK_USERS,
    MOCK_ACTIVITIES,
    ensureMockUsers,
    ensureMockActivities,
    ensureMockData,
    getLocalizedActivityText,
    getCurrentLanguage,
  };
})();
