const expandableTexts = document.querySelectorAll(".expandable-text");
const expandButtons = document.querySelectorAll(".expand-button");

overflow();
addEventListener("resize", overflow);
expandButtons.forEach((expandButton) => {
  expandButton.addEventListener("click", () => {
    const expandableContent = expandButton.parentElement;

    if (expandableContent.classList.contains("expanded")) {
      expandableContent.classList.remove("expanded");
      expandButton.innerText = "Read More";
      return;
    }
    expandableContent.classList.add("expanded");
    expandButton.innerText = "Read Less";
  });
});

function overflow() {
  expandableTexts.forEach((expandableText) => {
    if (expandableText.parentElement.classList.contains("expanded")) return;
    const overflowing =
      expandableText.scrollHeight > expandableText.clientHeight;
    expandableText.dataset.overflow = overflowing;
  });
}
