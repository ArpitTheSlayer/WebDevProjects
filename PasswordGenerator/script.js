const passwordDisplay = document.querySelector(".password-display");
const form = document.querySelector(".form");
const characterRange = document.querySelector("#character-range");
const characterNumber = document.querySelector("#character-number");
const includeLowercase = document.querySelector("#include-lowercase");
const includeUpperCase = document.querySelector("#include-uppercase");
const includeNumbers = document.querySelector("#include-numbers");
const includeSymbols = document.querySelector("#include-symbols");

const lowercaseCharacterArray = generateCharacterArrays(97, 122);
const uppercaseCharacterArray = generateCharacterArrays(65, 90);
const numbersCharacterArray = generateCharacterArrays(48, 57);
const symbolsCharacterArray = generateCharacterArrays(33, 47)
  .concat(generateCharacterArrays(58, 64))
  .concat(generateCharacterArrays(91, 96))
  .concat(generateCharacterArrays(123, 126));

characterRange.addEventListener("input", syncCharacter);

characterNumber.addEventListener("input", syncCharacter);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = generatePassword(
    characterNumber.value,
    includeLowercase.checked,
    includeUpperCase.checked,
    includeNumbers.checked,
    includeSymbols.checked
  );

  passwordDisplay.textContent = password;
});

function syncCharacter(e) {
  characterRange.value = e.target.value;
  characterNumber.value = e.target.value;
}

function generatePassword(
  characterNumber,
  includeLowercase,
  includeUpperCase,
  includeNumbers,
  includeSymbols
) {
  let characterArray = [];
  const password = [];

  if (includeLowercase) {
    characterArray = characterArray.concat(lowercaseCharacterArray);
  }
  if (includeUpperCase) {
    characterArray = characterArray.concat(uppercaseCharacterArray);
  }
  if (includeNumbers) {
    characterArray = characterArray.concat(numbersCharacterArray);
  }
  if (includeSymbols) {
    characterArray = characterArray.concat(symbolsCharacterArray);
  }

  if (characterArray.length == 0) {
    return "Check atleast one of the options.";
  }

  for (let i = 0; i < characterNumber; i++) {
    const index = Math.floor(Math.random() * characterArray.length);
    password.push(characterArray[index]);
  }

  return password.join("");
}

function generateCharacterArrays(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(String.fromCharCode(i));
  }
  return array;
}
