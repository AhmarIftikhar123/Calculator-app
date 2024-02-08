const theme_switchs = document.querySelectorAll(".theme_switch input"),
  userInput = document.getElementById("userInput"),
  outPut = document.getElementById("outPut"),
  digit_btns = document.getElementsByName("digit"),
  math_exp = document.querySelectorAll(".math_exp");

// function for saving Themes on localStorage
const saveTheme = (theme_number, Input_number) => {
  localStorage.setItem("colorScheme", `${theme_number}`);
  localStorage.setItem("inputNumber", `${Input_number}`);
};

// function for changeing Theme

const changeTheme = () => {
  let body = document.body;
  if (theme_switchs[0].checked) {
    body.className = "";
    saveTheme(null, 0);
  } else if (theme_switchs[1].checked) {
    body.className = "Theme_2";
    saveTheme("Theme_2", 1);
  } else if (theme_switchs[2]) {
    body.className = "Theme_3";
    saveTheme("Theme_3", 2);
  }
};
theme_switchs[0].addEventListener("change", changeTheme);
theme_switchs[1].addEventListener("change", changeTheme);
theme_switchs[2].addEventListener("change", changeTheme);

// function for Loading Theme

const loadTheme = () => {
  let isThemeStore = localStorage.getItem("colorScheme");
  let theme_number = localStorage.getItem("inputNumber");
  if (isThemeStore && theme_number) {
    document.body.className = isThemeStore;
    theme_switchs[theme_number].checked = true;
  }
};
// Called on page is load
loadTheme();

// input reSet function

const reSet = () => {
  userInput.textContent = "";
  outPut.textContent = "";
};

// function for removeing Last_Digit

const removeLast_Digit = () => {
  let userInput_txt = userInput.textContent;
  let outPut_txt = outPut.textContent;
  if (userInput_txt !== "") {
    userInput.textContent = userInput_txt.slice(0, userInput_txt.length - 1);
  } else {
    outPut.textContent = outPut_txt.slice(0, outPut_txt.length - 1);
  }
};

// for adding digits inputs in the input tag

digit_btns.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    if (
      userInput.innerText.substring(-1).match(/\./g) &&
      e.target.innerText === "."
    ) {
      return;
    }
    userInput.innerText = userInput.textContent.concat(e.target.textContent);
  });
});

// function for adding arithmetic operators

math_exp.forEach((exp) => {
  exp.addEventListener("click", (e) => {
    let modified_exp = e.target.textContent.replace(/x/g, "*");
    if (userInput.textContent !== "") {
      if (outPut.textContent.match(/[\-+/*]/g)) {
        outPut.textContent = outPut.textContent.concat(
          userInput.textContent,
          modified_exp
        );
      } else {
        outPut.textContent = userInput.textContent.concat(
          e.target.innerText.replace(/x/g, "*")
        );
      }
    } else {
      outPut.textContent = outPut.textContent.concat(modified_exp);
    }
    userInput.textContent = "";
  });
});

// function for calculation

const calculate = () => {
  if (userInput.innerText === "" || outPut.innerText === "") {
    console.error("Input Required for claculation");
    return;
  } else {
    let combine_str = outPut.textContent
      .concat(userInput.textContent)
      .replace(/,/g, "")
      .replace(/\/0/g, "+0");
    outPut.innerText = parseFloat(eval(combine_str)).toLocaleString();
    userInput.innerText = "";
  }
};
