async function initializeApplication() {
  // ============================================================
  // LOAD SAVED PROJECT
  // ============================================================

  await loadProject();

  // ============================================================
  // INITIALIZE DATA STRUCTURE
  // ============================================================

  syncIntonationTypesWithSentenceTypes();

  // ============================================================
  // INITIALIZE INTERFACE SYSTEMS
  // ============================================================

  initOptions(document);
  initInput(document);
  initOrder(document);
  initTableSystem(document);

  // ============================================================
  // UPDATE PAGE BUTTONS
  // ============================================================

  updateLanguageAndStageButtons();

  console.log("[dataInitialization.js] Application initialized.");
}
