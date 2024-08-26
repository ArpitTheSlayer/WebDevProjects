const evilButton = document.querySelector(".evil-button");
const OFFSET = 100;

evilButton.addEventListener("click", () => {
  alert("Nice Try!");
  window.close();
});

document.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const buttonBox = evilButton.getBoundingClientRect();
  const horizontalDistance = distanceFromCenter(
    buttonBox.x,
    x,
    buttonBox.width
  );
  const verticalDistance = distanceFromCenter(buttonBox.y, y, buttonBox.height);
  const horizontalOffset = buttonBox.width / 2 + OFFSET;
  const verticalOffset = buttonBox.height / 2 + OFFSET;

  if (
    Math.abs(horizontalDistance) <= horizontalOffset &&
    Math.abs(verticalDistance) <= verticalOffset
  ) {
    setButtonPosition(
      buttonBox.x + (horizontalOffset / horizontalDistance) * 10,
      buttonBox.y + (verticalOffset / verticalDistance) * 10
    );
  }
});

function setButtonPosition(left, top) {
  const buttonBox = evilButton.getBoundingClientRect();
  const windowBox = document.body.getBoundingClientRect();

  if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - OFFSET;
  } else if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
    left = windowBox.left + OFFSET;
  }

  if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - OFFSET;
  } else if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
    top = windowBox.top + OFFSET;
  }

  evilButton.style.top = `${top}px`;
  evilButton.style.left = `${left}px`;
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
