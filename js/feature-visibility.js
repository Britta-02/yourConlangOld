document.addEventListener("DOMContentLoaded", () => {
  // ============================================================
  // LABELS
  // ============================================================

  const FEATURE_LABELS = {
    "normal-sentences": "Normal sentences",
    declarative: "Declaratives",
    whQuestion: "Wh- questions",
    yesNoQuestion: "Yes/no questions",
    negative: "Negative",

    onsetInitial: "Onset, word initial",
    onsetGeneral: "Onset, general",

    nucleusInitial: "Nucleus, initial",
    nucleusGeneral: "Nucleus, general",
    nucleusFinal: "Nucleus, final",

    codaGeneral: "Coda, general",
    codaFinal: "Coda, word final",

    sentenceType1: "sentenceType1",
    sentenceType2: "sentenceType2",
  };

  // ============================================================
  // EXISTING BUTTON-BASED SYSTEM
  // ============================================================

  function getSelectedValues(groupName, scope) {
    if (!scope) {
      scope = document;
    }

    return Array.from(
      scope.querySelectorAll(`.btn-select.selected[data-group="${groupName}"]`),
    ).map((btn) => btn.dataset.value);
  }

  function getGroupNameFromButton(btn) {
    return btn.dataset.group;
  }

  function getValueFromButton(btn) {
    return btn.dataset.value;
  }

  function findContainer(groupName, scope) {
    return scope.querySelector(`:scope [data-container="${groupName}"]`);
  }

  // ============================================================
  // EXISTING BUTTON-DRIVEN TEMPLATE SYSTEM
  // ============================================================

  function updateFeatureGroup(groupName, scope = document) {
    // console.log("[feature-visibility] Updating button group:", groupName);

    const container = findContainer(groupName, scope);

    const template = document.querySelector(`[data-template="${groupName}"]`);

    if (!container || !template) {
      return;
    }

    // This line stays.
    //
    // It is still needed for all the existing
    // button-driven template groups.
    const selected = getSelectedValues(groupName, scope);

    // ============================================================
    // REMOVE OLD INSTANCES
    // ============================================================

    container.querySelectorAll("[data-instance]").forEach((block) => {
      const value = block.dataset.instance;

      if (!selected.includes(value)) {
        block.remove();
      }
    });

    // ============================================================
    // CREATE NEW INSTANCES
    // ============================================================

    selected.forEach((value) => {
      if (container.querySelector(`[data-instance="${value}"]`)) {
        return;
      }

      const clone = template.content.cloneNode(true);

      const block = clone.querySelector("[data-instance]");

      if (!block) {
        return;
      }

      block.dataset.instance = value;

      if (groupName === "intonation-types") {
        block.dataset.sentenceTypeId = value;
      }

      const title = block.querySelector("[data-instance-title]");

      if (title) {
        title.textContent = FEATURE_LABELS[value] || value;
      }

      container.appendChild(clone);

      const insertedBlock = container.querySelector(
        `[data-instance="${value}"]`,
      );

      requestAnimationFrame(() => {
        if (typeof initOrder === "function") {
          initOrder(insertedBlock);
        }

        if (typeof initOptions === "function") {
          initOptions(insertedBlock);
        }

        if (typeof initInput === "function") {
          initInput(insertedBlock);
        }

        if (typeof initTableSystem === "function") {
          initTableSystem(insertedBlock);
        }
      });
    });
  }

  // ============================================================
  // DATA-DRIVEN SYLLABLE EXCEPTIONS
  // ============================================================

  function renderDataDrivenExceptionGroup() {
    const container = document.querySelector(
      '[data-container="syllableStructure"]',
    );

    const template = document.querySelector(
      '[data-template="syllableStructure"]',
    );

    if (!container || !template) {
      return;
    }

    const exceptions = getDataAtPath("phonology.syllables.syllableExceptions");

    if (!exceptions) {
      return;
    }

    const enabledKeys = Object.keys(exceptions).filter(
      (key) => exceptions[key].enabled === true,
    );

    // ============================================================
    // REMOVE DISABLED INSTANCES
    // ============================================================

    container.querySelectorAll("[data-instance]").forEach((block) => {
      const key = block.dataset.instance;

      if (!enabledKeys.includes(key)) {
        block.remove();
      }
    });

    // ============================================================
    // CREATE ENABLED INSTANCES
    // ============================================================

    enabledKeys.forEach((key) => {
      const existingBlock = container.querySelector(`[data-instance="${key}"]`);

      if (existingBlock) {
        return;
      }

      const clone = template.content.cloneNode(true);

      const block = clone.querySelector("[data-instance]");

      if (!block) {
        return;
      }

      // ========================================================
      // IDENTIFY THIS INSTANCE
      // ========================================================

      block.dataset.instance = key;

      block.dataset.exceptionKey = key;

      // ========================================================
      // SET TITLE
      // ========================================================

      const title = block.querySelector("[data-instance-title]");

      if (title) {
        title.textContent = FEATURE_LABELS[key] || key;
      }

      // ========================================================
      // SET PHONEME DATA PATH
      // ========================================================

      const phonemeContainer = block.querySelector(".inp-phoneme");

      if (phonemeContainer) {
        phonemeContainer.dataset.path = `phonology.syllables.syllableExceptions.${key}.phonemes`;
      }

      // ========================================================
      // INSERT TEMPLATE
      // ========================================================

      container.appendChild(clone);

      const insertedBlock = container.querySelector(`[data-instance="${key}"]`);

      // ========================================================
      // INITIALIZE GENERATED CONTENT
      // ========================================================

      requestAnimationFrame(() => {
        if (typeof initInput === "function") {
          initInput(insertedBlock);
        }
      });
    });
  }

  // ============================================================
  // BUTTON-DRIVEN UPDATE
  // ============================================================

  document.addEventListener("click", (e) => {
    const button = e.target.closest(".btn-select");

    if (!button) {
      return;
    }

    const groupName = button.dataset.group;

    if (!groupName) {
      return;
    }

    // Climb to the topmost template instance
    let root = button.closest("[data-instance]");

    while (root?.parentElement?.closest("[data-instance]")) {
      root = root.parentElement.closest("[data-instance]");
    }

    requestAnimationFrame(() => {
      updateFeatureGroup(groupName, root || document);
    });
  });

  // ============================================================
  // DATA-DRIVEN EXCEPTION UPDATE
  // ============================================================

  document.addEventListener("iat:data-updated", (event) => {
    const { path } = event.detail;

    if (path === "phonology.syllables.syllableExceptions") {
      renderDataDrivenExceptionGroup();
    }
  });

  // ============================================================
  // INITIAL BUTTON-DRIVEN TEMPLATE LOAD
  // ============================================================

  document.querySelectorAll(".iat-options").forEach((group) => {
    const name = group.querySelector("[data-group]")?.dataset.group;

    if (name) {
      updateFeatureGroup(name);
    }
  });

  // ============================================================
  // INITIAL DATA-DRIVEN EXCEPTION LOAD
  // ============================================================

  renderDataDrivenExceptionGroup();
});
