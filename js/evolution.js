document.addEventListener("DOMContentLoaded", function () {
  console.log("Evolution.js is loaded");

  // SYMBOLMEANINGMAP
  function replaceSymbolsWithMeanings(inputText, symbolMeaningMap) {
    console.log("replaceSymbolsWithMeanings");
    symbolMeaningMap.forEach((meaning, symbol) => {
      var regex = new RegExp(symbol, "g");
      inputText = inputText.replace(regex, meaning);
    });
    return inputText;
  }

  // WAT ER GEBEURT ALS REGELS MOETEN VERANDEREN
  function applyRuleChanges(
    currentChar,
    newChar,
    beforeChar,
    afterChar,
    unlessBeforeChar,
    unlessAfterChar,
    text,
  ) {
    console.log("applyRuleChanges");
    // Vanaf hier uitvoeren als er geen getallen zijn of als alle getallen symbolen dezelfde waarde hebben. Als dit niet het geval is naar volgende regel
    var currentCharsArray = currentChar.split(" ");
    var newCharsArray = newChar.split(" ");

    for (var i = 0; i < currentCharsArray.length; i++) {
      var currentChar = currentCharsArray[i];
      var newChar = newCharsArray[i];

      if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx1 1-1- 0-0-0-0");
        currentChar = currentChar.replace(/Ø/g, ""); //Should never happen (current char can't be nothing if no conditions)
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(currentChar, "gm");
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx2 1-1- 1-0-0-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(`(?<=${beforeChar}:?"?:?)${currentChar}`, "gm");
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx3 1-1- 0-1-0-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(`${currentChar}(?="?:?"?${afterChar})`, "gm");
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx4 1-1- 1-1-0-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx5 1-1- 0-0-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx6 1-1- 0-0-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx7 1-1- 0-0-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx8 1-1- 1-0-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx9 1-1- 0-1-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx10 1-1- 1-1-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx11 1-1- 1-1-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx12 1-1- 1-1-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx13 1-1- 0-1-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx14 1-1- 0-1-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx15 1-1- 1-0-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<=${beforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm",
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx16 1-1- 1-0-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}`,
          "gm",
        );
        text = text.replace(regex, newChar);
      }
    }
    return text;
  }

  function filledFields(
    currentChar,
    newChar,
    beforeChar,
    afterChar,
    unlessBeforeChar,
    unlessAfterChar,
    text,
  ) {
    console.log("filledFields");
    var filledFieldsAre = "";

    var currentCharsArray = currentChar.split(" ");
    var newCharsArray = newChar.split(" ");

    for (var i = 0; i < currentCharsArray.length; i++) {
      var curChar = currentCharsArray[i];
      var newCharItem = newCharsArray[i];

      if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNew";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBef";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewAft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewUnlbef";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewAftUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAftUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAftUnlbef";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAftUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewAftUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewAftUnlbef";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefUnlbef";
      }
    }

    return filledFieldsAre;
  }

  // GO THROUGH RULES AND GIVE OUTPUT
  function mySubmit() {
    console.log("mySubmit");
    var text = document.getElementById("myText").value;

    // Get all shorts and create a symbol-meaning map
    var shorts = document.querySelectorAll(".evoShort");
    var symbolMeaningMap = new Map();
    shorts.forEach((short) => {
      var symbol = short.querySelector(".symbol-char").value;
      var meaning = short.querySelector(".meaning-char").value;
      meaning = meaning.replace(/\s+/g, "").replace(/^/, "[").replace(/$/, "]");
      if (symbol && meaning) {
        symbolMeaningMap.set(symbol, meaning);
      }
    });

    var rules = document.querySelectorAll(".evoRule");
    rules.forEach((rule) => {
      // > rule loop
      let rightConditions = false;
      var digitsPresent = false;

      var ruleInputs = rule.querySelectorAll(".rule-input");

      var detectDigit = /\d+/;
      ruleInputs.forEach((inputField) => {
        var thisChar = inputField.value;
        if (detectDigit.test(thisChar)) {
          digitsPresent = true;
        }
      });

      // alle inputvelden aanhalen
      var currentChar = replaceSymbolsWithMeanings(
        rule.querySelector(".cur-char").value,
        symbolMeaningMap,
      );
      currentChar = currentChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");

      var newChar = replaceSymbolsWithMeanings(
        rule.querySelector(".new-char").value,
        symbolMeaningMap,
      );
      newChar = newChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\d/g, "");

      var beforeChar = replaceSymbolsWithMeanings(
        rule.querySelector(".bef-char").value,
        symbolMeaningMap,
      );
      beforeChar = beforeChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      beforeChar = beforeChar.replace(/#/gm, "^");

      var afterChar = replaceSymbolsWithMeanings(
        rule.querySelector(".aft-char").value,
        symbolMeaningMap,
      );
      afterChar = afterChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      afterChar = afterChar.replace(/#/gm, "$");

      var unlessBeforeChar = replaceSymbolsWithMeanings(
        rule.querySelector(".unl-bef").value,
        symbolMeaningMap,
      );
      unlessBeforeChar = unlessBeforeChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      unlessBeforeChar = unlessBeforeChar.replace(/#/gm, "^");

      var unlessAfterChar = replaceSymbolsWithMeanings(
        rule.querySelector(".unl-aft").value,
        symbolMeaningMap,
      );
      unlessAfterChar = unlessAfterChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      unlessAfterChar = unlessAfterChar.replace(/#/gm, "$");

      if (digitsPresent) {
        // > digits if
        var allKeys = [];
        symbolMeaningMap.forEach((value, key) => {
          allKeys.push(key);
        });

        let equalBefCurAft = [];
        allKeys.forEach((thisKey) => {
          // > symbol loop
          var digitArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

          const allEqual = (array) =>
            array.length > 0 && array.every((v) => v === array[0]);

          digitArray.forEach((thisDigit) => {
            // > digit loop
            var thisDigitArray = new RegExp(`${thisKey}${thisDigit}`, "g");
            let digitPresent = false;

            var theseElements = [];
            ruleInputs.forEach((inputField) => {
              // > field loop

              const symbolValue = symbolMeaningMap.get(thisKey);

              let indices = [];

              var thisChar = inputField.value;
              if (thisDigitArray.test(thisChar)) {
                // > digitSymbol combi if

                var result = filledFields(
                  currentChar,
                  newChar,
                  beforeChar,
                  afterChar,
                  unlessBeforeChar,
                  unlessAfterChar,
                  text,
                );
                var patternBef = "";
                var patternCur = "";
                var patternAft = "";
                var patternUnlBef = "";
                var patternUnlAft = "";

                // als speciale combi tussen inputfields
                if (result === "curNew") {
                  console.log("2. curNew is true");
                  patternCur += `${currentChar}`;
                } else if (result === "curNewBef") {
                  console.log("2. curNewBef is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                } else if (result === "curNewAft") {
                  console.log("2. curNewAft is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${currentChar})${afterChar}`;
                } else if (result === "curNewBefAft") {
                  console.log("2. curNewBefAft is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                } else if (result === "curNewUnlbef") {
                  console.log("2. curNewUnlbef is true");
                  patternCur += `${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                } else if (result === "curNewUnlaft") {
                  console.log("2. curNewUnlaft is true");
                  patternCur += `${currentChar}`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewUnlbefUnlaft") {
                  console.log("2. curNewUnlbefUnlaft is true");
                  patternCur += `${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefUnlbefUnlaft") {
                  console.log("2. curNewBefUnlbefUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewAftUnlbefUnlaft") {
                  console.log("2. curNewAftUnlbefUnlaft is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefAftUnlbefUnlaft") {
                  console.log("2. curNewBefAftUnlbefUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefAftUnlbef") {
                  console.log("2. curNewBefAftUnlbef is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                } else if (result === "curNewBefAftUnlaft") {
                  console.log("2. curNewBefAftUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewAftUnlaft") {
                  console.log("2. curNewAftUnlaft is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${currentChar})${afterChar}`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewAftUnlbef") {
                  console.log("2. curNewAftUnlbef is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                } else if (result === "curNewBefUnlaft") {
                  console.log("2. curNewBefUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefUnlbef") {
                  console.log("2. curNewBefUnlbef is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                }

                // als inputfield is specifiek character
                if (inputField.classList.contains("cur-char")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)",
                  );
                  for (const match of text.matchAll(patternCur)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("bef-char")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)",
                  );
                  for (const match of text.matchAll(patternBef)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("aft-char")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)",
                  );
                  for (const match of text.matchAll(patternAft)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("unl-bef")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)",
                  );
                  for (const match of text.matchAll(patternUnlBef)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("unl-aft")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)",
                  );
                  for (const match of text.matchAll(patternUnlAft)) {
                    indices.push(match.index);
                  }
                }

                indices.forEach((index) => {
                  // > index loop
                  const element = text[index];
                  theseElements.push(element);
                });

                if (allEqual(theseElements)) {
                  equalValues = true;
                } else {
                  equalValues = false;
                }

                equalBefCurAft.push(equalValues);

                if (equalValues) {
                  document.querySelector(
                    ".container-output",
                  ).style.backgroundColor = "green";
                } else {
                  document.querySelector(
                    ".container-output",
                  ).style.backgroundColor = "red";
                }
              } else {
                // < digitSymbol combi if
              }
            }); // < field loop
          }); // < digit loop
        }); // < symbol loop

        // Check if all values in equalBefCurAft are true and run specific code
        if (equalBefCurAft.every((val) => val)) {
          rightConditions = true;
        } else {
          rightConditions = false;
        }
      } else {
        // < digits if
        rightConditions = true;
      }

      if (rightConditions) {
        // Dit werkt, maar hij voert de regel niet uit. Waarschijnlijk omdat hij de cijfers meepakt
        text = applyRuleChanges(
          currentChar,
          newChar,
          beforeChar,
          afterChar,
          unlessBeforeChar,
          unlessAfterChar,
          text,
        );
        console.log(`rightConditions: ${rightConditions}`);
      } else {
        console.log(`rightConditions: ${rightConditions}`);
      }
    }); // < rule loop

    document.getElementById("output-word").textContent = `${text}`;
  }

  document.getElementById("mySubmit").addEventListener("click", mySubmit);
});
