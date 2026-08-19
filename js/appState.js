let activeLanguageId = "language1";
let activeStageId = "stage1";

function setActiveLanguage(languageId) {
  const language = appData.languages[languageId];

  if (!language) {
    console.error(`Language with ID "${languageId}" does not exist.`);
    return false;
  }

  activeLanguageId = languageId;

  const stageIds = Object.keys(language.stages);

  if (stageIds.length === 0) {
    activeStageId = null;
  } else if (!language.stages[activeStageId]) {
    activeStageId = stageIds[0];
  }

  return true;
}

function setActiveStage(stageId) {
  const activeLanguage = appData.languages[activeLanguageId];

  if (!activeLanguage) {
    console.error(
      "Cannot change stage because the active language does not exist.",
    );
    return false;
  }

  if (!activeLanguage.stages[stageId]) {
    console.error(
      `Stage with ID "${stageId}" does not exist in language "${activeLanguageId}".`,
    );

    return false;
  }

  activeStageId = stageId;

  return true;
}
