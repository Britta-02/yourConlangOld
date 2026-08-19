const languageSwitchButton = document.querySelector(".btn-language-switch");
const stageSwitchButton = document.querySelector(".btn-stage-switch");

function updateLanguageAndStageButtons() {
  const activeLanguage = getActiveLanguage();
  const activeStage = getActiveStage();

  if (activeLanguage) {
    languageSwitchButton.textContent = activeLanguage.name;
  }

  if (activeStage) {
    stageSwitchButton.textContent = activeStage.name;
  }
}

function switchToLanguage(languageId) {
  const success = setActiveLanguage(languageId);

  if (!success) {
    return;
  }

  updateLanguageAndStageButtons();

  console.log("Switched to language:", getActiveLanguage());
  console.log("Current stage:", getActiveStage());
}

function switchToStage(stageId) {
  const success = setActiveStage(stageId);

  if (!success) {
    return;
  }

  updateLanguageAndStageButtons();

  console.log("Switched to stage:", getActiveStage());
}

languageSwitchButton.addEventListener("click", () => {
  const languages = getAllLanguages();

  const currentIndex = languages.findIndex(
    (language) => language.id === activeLanguageId,
  );

  const nextIndex = (currentIndex + 1) % languages.length;

  switchToLanguage(languages[nextIndex].id);
});

stageSwitchButton.addEventListener("click", () => {
  const stages = getAllStages();

  const currentIndex = stages.findIndex((stage) => stage.id === activeStageId);

  const nextIndex = (currentIndex + 1) % stages.length;

  switchToStage(stages[nextIndex].id);
});

updateLanguageAndStageButtons();
