function getActiveLanguage() {
  return appData.languages[activeLanguageId] || null;
}

function getActiveStage() {
  const activeLanguage = getActiveLanguage();

  if (!activeLanguage) {
    return null;
  }

  return activeLanguage.stages[activeStageId] || null;
}

function getActiveStageData() {
  const activeStage = getActiveStage();

  if (!activeStage) {
    return null;
  }

  return activeStage.data;
}

function getAllLanguages() {
  return Object.values(appData.languages);
}

function getAllStages() {
  const activeLanguage = getActiveLanguage();

  if (!activeLanguage) {
    return [];
  }

  return Object.values(activeLanguage.stages);
}

// ============================================================
// GET DATA AT PATH
// ============================================================

function getDataAtPath(path) {
  const stageData = getActiveStageData();

  if (!stageData) {
    return null;
  }

  const parts = path.split(".");

  let current = stageData;

  for (const part of parts) {
    if (current[part] === undefined) {
      return null;
    }

    current = current[part];
  }

  return current;
}

// ============================================================
// DEBUG
// ============================================================

console.log("App data:", appData);

// console.log("Active language:", getActiveLanguage());

// console.log("Active stage:", getActiveStage());

// console.log("Active stage data:", getActiveStageData());
