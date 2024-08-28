const tabs = document.querySelectorAll("[data-tab-target]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabTarget = document.querySelector(tab.dataset.tabTarget);
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });

    tab.classList.add("active");
    tabTarget.classList.add("active");
  });
});
