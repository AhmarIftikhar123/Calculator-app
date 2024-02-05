const theme_switchs = document.querySelectorAll(".theme_switch input"),
  userInput = document.getElementById("userInput"),
  outPut = document.getElementById("outPut"),
  digit_btns = document.getElementsByName("digit"),
  math_exp = document.querySelectorAll(".math_exp");

// function for changeing Theme

let changeTheme = () => {
  let body = document.body;
  if (theme_switchs[0].checked) {
    body.className = "";
  } else if (theme_switchs[1].checked) {
    body.className = "Theme_2";
  } else if (theme_switchs[2].checked) {
    body.className = "Theme_3";
  }
};
theme_switchs[0].addEventListener("change", changeTheme);
theme_switchs[1].addEventListener("change", changeTheme);
theme_switchs[2].addEventListener("change", changeTheme);

// input reSet function

let reSet = () => {
  userInput.textContent = "";
  outPut.textContent = "";
};

// function for removeing Last_Digit

let removeLast_Digit = () => {
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
    userInput.innerText = userInput.textContent.concat(e.target.textContent);
  });
});

// function for adding arithmetic operators

math_exp.forEach((exp) => {
  exp.addEventListener("click", (e) => {
    let exp_txt = e.target.textContent;
    let modified_exp = exp_txt.replace(/x/g, "*");
    if (userInput.textContent !== "") {
      if (outPut.textContent.match(/[\-+/*]/g)) {
        outPut.textContent = outPut.textContent.concat(
          userInput.textContent,
          modified_exp
        );
      } else {
        outPut.textContent = userInput.textContent.concat(e.target.innerText);
      }
    } else {
      outPut.textContent = outPut.textContent.concat(modified_exp);
    }
    userInput.textContent = "";
  });
});

// function for calculation

let calculate = () => {
  if (userInput.innerText === "" || outPut.innerText === "") {
    console.error("Input Required for claculation");
    return;
  } else {
    let combine_str = outPut.textContent
      .concat(userInput.textContent)
      .replace(/,/g, "");
    outPut.innerText = parseFloat(eval(combine_str)).toLocaleString();
    userInput.innerText = "";
  }
};
