const slider = document.getElementById("length");
const rangeValue = document.getElementById("range-value");
const pass_Length = document.getElementById("length");
const print_pass = document.querySelector(".print-password");
const new_Pass_Btn = document.querySelector(".new-pass-btn");
const copy_Btn = document.querySelector(".copy-btn");

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "!@#$%^&*()-_=+[]{}|;:',.<>/?`~";
const ALL = UPPERCASE + LOWERCASE + NUMBERS + SPECIAL;

let LENGTH = 20; // Default length

slider.addEventListener("input", () => {
  LENGTH = parseInt(slider.value, 10);
  rangeValue.textContent = slider.value;
  inject_pass();
});

new_Pass_Btn.addEventListener("click", () => {
  inject_pass();
});

copy_Btn.addEventListener("click", () => {
  const copyText = document.querySelector(".generated-password");
  if (!copyText) {
    alert("No password to copy!");
    return;
  }

  const password = copyText.textContent;
  navigator.clipboard.writeText(password)
    .then(() => console.log("Password copied!"))
    .catch(err => console.error("Copy failed:", err));
});

function Pass_Generator(length, usUppercase, usLowercase, usNumbers, usSpecial, usAll) {
  let char = "";

  if (usAll) {
    char = ALL;
  } else {
    if (usUppercase) char += UPPERCASE;
    if (usLowercase) char += LOWERCASE;
    if (usNumbers) char += NUMBERS;
    if (usSpecial) char += SPECIAL;
  }

  if (!char) {
    alert("No character sets selected!");
    return "";
  }

  const result = [];
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);

  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % char.length;
    result.push(char[index]);
  }

  return result.join("");
}



function inject_pass() {
  // Get checkbox states
  const usSpecial   = document.getElementById("special-char").checked;
  const usUppercase = document.getElementById("upper-char").checked;
  const usLowercase = document.getElementById("lower-char").checked;
  const usNumbers   = document.getElementById("number-char").checked;
  const usAll       = document.getElementById("all-char").checked;

  const pass = Pass_Generator(
    LENGTH,
    usUppercase,
    usLowercase,
    usNumbers,
    usSpecial,
    usAll
  );

  const p = document.createElement("p");
  p.textContent = pass;
  p.classList.add("generated-password");

  print_pass.innerHTML = ""; // clear previous
  print_pass.appendChild(p); // insert new
}


// generate initial password
inject_pass();
