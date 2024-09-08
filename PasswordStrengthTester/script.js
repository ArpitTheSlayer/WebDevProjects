const strengthMeter = document.querySelector(".strength-meter");
const password = document.querySelector("#password");
const reasons = document.querySelector(".reasons");

const strength = calculateStrength(password.value);
strengthMeter.style.setProperty("--strength", strength);
strengthMeter.textContent = `${strength}%`;

password.addEventListener("input", () => {
  reasons.textContent = "";
  const strength = calculateStrength(password.value);
  strengthMeter.style.setProperty("--strength", strength);
  strengthMeter.textContent = `${strength}%`;
});

function calculateStrength(password) {
  const weaknesses = [];
  let strength = 100;

  if (password === "") {
    weaknesses.push({
      message: "No password to check.",
      deduction: 100,
    });
  } else {
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(
      characterTypeWeakness(password, /[a-z]/g, "lowercase characters")
    );
    weaknesses.push(
      characterTypeWeakness(password, /[A-Z]/g, "uppercase characters")
    );
    weaknesses.push(characterTypeWeakness(password, /[0-9]/g, "numbers"));
    weaknesses.push(
      characterTypeWeakness(password, /[^A-Za-z0-9\s]/g, "special characters")
    );
    weaknesses.push(repeatCharactersWeakness(password));
  }
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;
    const message = document.createElement("div");
    message.textContent = weakness.message;
    reasons.append(message);
  });

  if (strength < 0) {
    strength = 0;
  }

  return strength;
}

function lengthWeakness(password) {
  if (password.length <= 2) {
    return {
      message: "Your password is too short.",
      deduction: 20,
    };
  } else if (password.length <= 6) {
    return {
      message: "Your password should be longer.",
      deduction: 15,
    };
  }
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];
  if (matches.length <= 2) {
    return {
      message: `Your password should contain more ${type}.`,
      deduction: 10,
    };
  }
}

function repeatCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];
  if (matches.length > 0) {
    return {
      message: "Your password contains repeat characters.",
      deduction: 10 * matches.length,
    };
  }
}
