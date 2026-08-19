// ============================================================
// SAVE PROJECT
// ============================================================

async function saveProject() {
  if (!window.electronAPI) {
    console.error("[projectSave.js] electronAPI is not available.");

    return false;
  }

  console.log("[projectSave.js] Data being saved:", structuredClone(appData));

  const result = await window.electronAPI.saveProject(appData);

  if (!result.success) {
    console.error("[projectSave.js] Failed to save project:", result.error);

    return false;
  }

  console.log("[projectSave.js] Project saved successfully.");
  console.log("[projectSave.js] Saved to:", result.filePath);

  document.dispatchEvent(
    new CustomEvent("project:saved", {
      detail: {
        filePath: result.filePath,
      },
    }),
  );

  return true;
}

// ============================================================
// LOAD PROJECT
// ============================================================

async function loadProject() {
  if (!window.electronAPI) {
    console.error("[projectSave.js] electronAPI is not available.");

    return false;
  }

  const result = await window.electronAPI.loadProject();

  if (!result.success) {
    console.error("[projectSave.js] Failed to load project:", result.error);

    return false;
  }

  if (result.projectData === null) {
    console.log("[projectSave.js] No saved project found.");

    return true;
  }

  // Replace the contents of appData
  Object.keys(appData).forEach((key) => {
    delete appData[key];
  });

  Object.assign(appData, result.projectData);

  console.log("[projectSave.js] Project loaded successfully.");

  document.dispatchEvent(new CustomEvent("project:loaded"));

  return true;
}

// ============================================================
// SAVE BUTTON
// ============================================================

document.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-action='save-project']");

  if (!saveButton) return;

  saveProject();
});

// ============================================================
// SAVE EVENT
// ============================================================

document.addEventListener("project:saved", () => {
  console.log("[projectSave.js] Project saved.");
});
