// ===================================================================================== CONST FOR TEMPLATE TITLES ==============================================
// 'Dictionary', converts internal ID's into readable lables. Makes sure the titles of generated content are right.

// =================================================================================================================================================================================================================================================================================================================== IAT OPTIONS SYSTEM
// ==============================================================================================================================================================

// ================================================================ WHAT HAPPENS ON INITIALIZATION OF .IAT-OPTIONS ==============================================
// initializes one option group.
function initOptionsContainer(iat) {
  let activeEditingOption = null;
  const addDataGroup = iat.dataset.createGroup || iat.dataset.group || null;

  // prevent double initialization
  if (iat.dataset.optionsInit === "true") return;
  iat.dataset.optionsInit = "true";

  const addTextButton = iat.querySelector(".btn-add-text");
  const addPopupButton = iat.querySelector(".btn-add-popup");

  const closeButton = iat.querySelector(".btn-close");
  const editButton = iat.querySelector(".btn-edit");

  const addWrapper = iat.querySelector(".inputfield-icon");
  const addInput = iat.querySelector(".opt-inputfield");

  let editMode = false;

  // ============================================================
  // EDIT MODE HELPERS
  // ============================================================

  function applyEditMode(btn) {
    btn.classList.add("delete-mode");

    btn.addEventListener("click", optionEditClick);
  }

  function removeEditMode(btn) {
    btn.classList.remove("delete-mode");

    btn.removeEventListener("click", optionEditClick);
  }

  function getConnectedUsedList() {
    if (!iat.classList.contains("ord-available")) {
      return null;
    }

    const order = iat.closest(".iat-order");

    if (!order) return null;

    return order.querySelector(".ord-used");
  }

  function applyEditModeToUsedList() {
    const usedList = getConnectedUsedList();

    if (!usedList) return;

    usedList.dataset.editMode = "true";

    usedList.querySelectorAll(".p-used").forEach((btn) => {
      btn.classList.add("edit-disabled");

      btn.draggable = false;

      if (btn.classList.contains("user-created")) {
        applyEditMode(btn);
      }
    });
  }

  function removeEditModeFromUsedList() {
    const usedList = getConnectedUsedList();

    if (!usedList) return;

    usedList.dataset.editMode = "false";

    usedList.querySelectorAll(".p-used").forEach((btn) => {
      btn.classList.remove("edit-disabled");

      if (btn.classList.contains("user-created")) {
        removeEditMode(btn);
      }
    });
  }

  function optionEditClick(e) {
    e.stopPropagation();

    // popup-created options cannot edit text
    if (this.dataset.source === "popup") {
      confirmDeleteOption(this);

      return;
    }

    if (this.classList.contains("editing-option")) {
      return;
    }

    startOptionEditing(this);
  }

  function finishOptionEditing(button) {
    const input = button.querySelector("input");

    if (!input) return;

    const value = input.value.trim();

    if (value) {
      button.textContent = value;
    } else {
      button.textContent = button.dataset.oldValue;
    }

    button.classList.remove("editing-option");

    activeEditingOption = null;
  }

  function startOptionEditing(button) {
    if (activeEditingOption && activeEditingOption !== button) {
      finishOptionEditing(activeEditingOption);
    }

    activeEditingOption = button;

    button.classList.add("editing-option");
    const oldValue = button.textContent;
    button.dataset.oldValue = oldValue;

    button.innerHTML = "";

    const input = document.createElement("input");

    input.type = "text";

    input.className = "iat-inputfield";

    input.value = oldValue;

    const deleteButton = document.createElement("button");

    deleteButton.className = "btn-icon btn-delete-option";

    deleteButton.textContent = "✕";

    button.appendChild(input);

    button.appendChild(deleteButton);

    input.focus();

    // ==========================
    // SAVE CHANGES
    // ==========================

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        finishOptionEditing(button);
      }

      if (e.key === "Escape") {
        button.textContent = oldValue;

        button.classList.remove("editing-option");
      }
    });

    // click outside saves
    setTimeout(() => {
      document.addEventListener("click", function outside(e) {
        if (!button.contains(e.target)) {
          finishOptionEditing(button);

          document.removeEventListener("click", outside);
        }
      });
    }, 0);

    // ==========================
    // DELETE
    // ==========================

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();

      confirmDeleteOption(button);
    });
  }

  //
  //
  //

  // ============================================================
  // CREATE OPTION
  // ============================================================

  function createOption(value) {
    value = value.trim();

    if (!value) return;

    const newButton = document.createElement("button");

    newButton.className = "btn btn-opt btn-select user-created";

    // If this option group belongs to an iat-order,
    // create it as an available ordering option.
    if (iat.classList.contains("ord-available")) {
      newButton.classList.add("p-available");
    }

    newButton.textContent = value;

    if (addWrapper.classList.contains("option-popup-add")) {
      newButton.dataset.source = "popup";
    }

    if (addWrapper.classList.contains("option-text-add")) {
      newButton.dataset.source = "text";
    }

    iat.insertBefore(newButton, addWrapper);

    if (editMode) {
      applyEditMode(newButton);
    }

    return newButton;
  }

  //

  //

  //

  // ============================================================
  // TEXT ADD
  // ============================================================

  addTextButton?.addEventListener("click", () => {
    createOption(addInput.value);

    addInput.value = "";

    addInput.focus();
  });

  addInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      createOption(addInput.value);

      addInput.value = "";

      return;
    }

    if (e.key === "Escape") {
      addInput.value = "";

      addInput.blur();
    }
  });

  // ============================================================
  // POPUP ADD
  // ============================================================

  addPopupButton?.addEventListener("click", () => {
    openSelectionPopup(iat, createOption);
  });

  // ============================================================
  // EDIT MODE
  // ============================================================

  editButton?.addEventListener("click", () => {
    editMode = !editMode;

    iat.dataset.editMode = editMode;

    // Tell parent order container about edit mode
    const orderContainer = iat.closest(".iat-order");

    if (orderContainer) {
      orderContainer.dataset.editMode = editMode;
    }
    iat.querySelectorAll(".user-created").forEach((btn) => {
      if (editMode) {
        applyEditMode(btn);
      } else {
        removeEditMode(btn);
      }
    });

    if (editMode) {
      applyEditModeToUsedList();
    } else {
      removeEditModeFromUsedList();
    }

    if (addWrapper) {
      addWrapper.style.display = editMode ? "" : "none";
    }
  });

  // ============================================================
  // COLLAPSE
  // ============================================================

  closeButton?.addEventListener("click", () => {
    const isClosed = iat.classList.toggle("closed");

    const optionButtons = iat.querySelectorAll(".btn-opt.btn-select");

    if (isClosed) {
      optionButtons.forEach((btn) => {
        btn.style.display = btn.classList.contains("selected")
          ? "inline-block"
          : "none";
      });

      addTextButton && (addTextButton.style.display = "none");

      addPopupButton && (addPopupButton.style.display = "none");

      editButton && (editButton.style.display = "none");

      closeButton.textContent = ">";
    } else {
      optionButtons.forEach((btn) => {
        btn.style.display = "inline-block";
      });

      addTextButton && (addTextButton.style.display = "inline-block");

      addPopupButton && (addPopupButton.style.display = "inline-block");

      editButton && (editButton.style.display = "inline-block");

      closeButton.textContent = "<";
    }
  });

  iat.addEventListener("click", (e) => {
    if (!activeEditingOption) return;

    const clickedOption = e.target.closest(".btn-select");

    if (clickedOption && clickedOption !== activeEditingOption) {
      finishOptionEditing(activeEditingOption);
    }
  });
}

function confirmDeleteOption(button) {
  const name = button.querySelector("input")?.value || button.textContent;

  const confirmed = confirm(
    `Delete option "${name}"? This action cannot be undone.`,
  );

  if (confirmed) {
    button.remove();
  }
}

let activeOptionContainer = null;

function openSelectionPopup(iat, addFunction) {
  const overlay = document.getElementById("selection-popup");

  const popupOptions = overlay.querySelector(".popup-options");

  activeOptionContainer = {
    iat: iat,
    addFunction: addFunction,
  };

  popupOptions.innerHTML = "";

  const options = ["Option A", "Option B", "Option C", "Option D"];

  options.forEach((text) => {
    const btn = document.createElement("button");

    btn.className = "btn btn-opt popup-select";

    btn.textContent = text;

    btn.addEventListener("click", () => {
      btn.classList.toggle("selected");
    });

    popupOptions.appendChild(btn);
  });

  overlay.classList.remove("hidden");

  document.body.classList.add("popup-window-open");
}

function initSelectionPopup() {
  const overlay = document.getElementById("selection-popup");

  if (!overlay) return;

  const addButton = overlay.querySelector(".btn-popup-add");
  const closeButton = overlay.querySelector(".btn-popup-close");

  function close() {
    overlay.classList.add("hidden");

    document.body.classList.remove("popup-window-open");

    activeOptionContainer = null;
  }

  // =====================================================
  // ADD SELECTED OPTIONS
  // =====================================================

  addButton.addEventListener("click", () => {
    if (!activeOptionContainer) return;

    const selected = overlay.querySelectorAll(".popup-select.selected");

    selected.forEach((btn) => {
      activeOptionContainer.addFunction(btn.textContent);
    });

    close();
  });

  // =====================================================
  // CLOSE BUTTON
  // =====================================================

  closeButton.addEventListener("click", () => {
    close();
  });

  // =====================================================
  // ESC KEY CLOSE
  // =====================================================

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    // only close if popup is currently open
    if (overlay.classList.contains("hidden")) return;

    close();
  });
}

// =========================================================== LOOP THROUGH EACH .IAT-OPTIONS AND INITIALIZE THEM ==============================================

// Loops through .iat-options and initializes them.
function initOptions(root = document) {
  root.querySelectorAll(".iat-options").forEach((iat) => {
    initOptionsContainer(iat);
  });
}

// ============================================================
// RENDER SENTENCE TYPE OPTIONS
// ============================================================

function renderSentenceTypeOptions(root = document) {
  const container = root.querySelector('[data-generated="sentence-types"]');

  if (!container) {
    console.warn("[iat.js] Sentence type container not found.");

    return;
  }

  const language = appData.languages[activeLanguageId];

  if (!language) {
    console.warn("[iat.js] Active language not found:", activeLanguageId);

    return;
  }

  const sentenceTypes =
    language.languageData?.grammaticalProperties?.sentenceTypes;

  if (!sentenceTypes) {
    console.warn("[iat.js] No sentence types found.");

    return;
  }

  const stageData = getActiveStageData();

  if (!stageData) {
    console.warn("[iat.js] No active stage data found.");

    return;
  }

  const intonationTypes = stageData.phonology?.intonations?.types || {};

  // Remove previously generated buttons
  container.querySelectorAll(".sentence-type-option").forEach((button) => {
    button.remove();
  });

  // Create one button for every sentence type
  Object.values(sentenceTypes).forEach((sentenceType) => {
    const intonationType = intonationTypes[sentenceType.id];

    // The synchronization function should normally
    // have created this object already.
    if (!intonationType) {
      console.warn(
        "[iat.js] No matching intonation type for:",
        sentenceType.id,
      );

      return;
    }

    const button = document.createElement("button");

    button.className = "btn btn-opt btn-select sentence-type-option";

    button.dataset.value = sentenceType.id;

    button.dataset.group = container.dataset.group || "intonation-types";

    button.textContent = sentenceType.name;

    if (intonationType.enabled) {
      button.classList.add("selected");
    }

    container.insertBefore(button, container.querySelector(".btn-close"));
  });
}

// ============================================================
// RENDER SENTENCE TYPE OPTIONS
// ============================================================

// =============================================================================================================================================================================================================================================================================================================== IAT INPUT SYSTEM
// ==============================================================================================================================================================

// =========================================================================================================================================== INPUT FIELD GROWTH

// Create invisible html element, used to meassure text width

// Small text > small input. Long text > wider input
function initAutoGrowInput(input) {
  // Creates helper function
  const measureSpan = document.createElement("span");
  measureSpan.style.position = "absolute";
  measureSpan.style.visibility = "hidden";
  measureSpan.style.whiteSpace = "pre";
  measureSpan.style.top = "-9999px";
  measureSpan.style.left = "-9999px";
  // adds it to page
  document.body.appendChild(measureSpan);
  const resize = () => {
    // Gets font info, makes invisible span use same font.Copies text into invisible span. Makes actual span same width
    const style = getComputedStyle(input);
    measureSpan.style.font = style.font;
    measureSpan.style.letterSpacing = style.letterSpacing;
    measureSpan.textContent = input.value || input.placeholder || "";
    input.style.width = `${measureSpan.offsetWidth + 16}px`;
  };

  // Runs whenever user types
  input.addEventListener("input", resize);
  resize();
}

// Textarea grows vertically instead of showing scrollbars
function initNoteInputAutoHeight(textarea) {
  const adjust = () => {
    // resets height
    textarea.style.height = "auto";
    // set height equil to content
    textarea.style.height = textarea.scrollHeight + "px";
  };

  textarea.addEventListener("input", adjust);
  adjust();
}

// ============================================================ RUN INITaUTOgROWiNPUT AND INITnOTEiNPUTaUTOhEIGHT ==============================================

// Initialises ordinary inputs. Runs initAutoGrowInput and initNoteInputAutoHeight for the correct input fields.
function initStaticInputs(root = document) {
  root
    .querySelectorAll(
      ".iat-input:not(.inp-rule):not(.inp-info) .iat-inputfield",
    )
    .forEach(initAutoGrowInput);

  root
    .querySelectorAll(".iat-input.inp-info .iat-inputfield")
    .forEach(initNoteInputAutoHeight);
}

// ========================================================================================= POWERS .INP-PHONEMES ==============================================

// Powers .inp-phoneme
function initPhonemeInputs(root = document) {
  const containers = root.querySelectorAll(".iat-input.inp-phoneme");

  containers.forEach((container) => {
    if (container.dataset.phonemeInit === "true") return;
    container.dataset.phonemeInit = "true";

    const list = container.querySelector(".phoneme-wrap");
    const addBtn = container.querySelector(".btn-add");
    const editBtn = container.querySelector(".btn-edit");
    const controls = container.querySelector(".phoneme-btn");

    let editMode = false;

    const items = () => list.querySelectorAll(".phoneme-item");

    function getValues() {
      return [...list.querySelectorAll(".phoneme-item input")]
        .map((input) => input.value.trim())
        .filter((value) => value !== "");
    }

    function dispatchPhonemeUpdate() {
      const values = getValues();

      container.dispatchEvent(
        new CustomEvent("iat:phoneme-update", {
          bubbles: true,
          detail: {
            values: values,
          },
        }),
      );
    }

    function wrapExistingInputsOnce() {
      list.querySelectorAll("input").forEach((input) => {
        if (input.closest(".phoneme-item")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "phoneme-item";

        input.before(wrapper);
        wrapper.appendChild(input);

        initAutoGrowInput(input);

        input.addEventListener("input", () => {
          dispatchPhonemeUpdate();
        });
      });
    }

    function createPhonemeInput(value = "", focus = true) {
      const wrapper = document.createElement("div");
      wrapper.className = "phoneme-item";

      const input = document.createElement("input");
      input.type = "text";
      input.className = "iat-inputfield";
      input.placeholder = "p";
      input.value = value;

      wrapper.appendChild(input);
      list.insertBefore(wrapper, controls);

      initAutoGrowInput(input);

      input.addEventListener("input", () => {
        dispatchPhonemeUpdate();
      });

      if (editMode) {
        input.readOnly = true;
        wrapper.classList.add("delete-mode");
      }

      if (focus) input.focus();

      return input;
    }

    function setEditMode(state) {
      editMode = state;

      container.dataset.editMode = state ? "1" : "0";
      editBtn.classList.toggle("btn-active", state);

      items().forEach((item) => {
        const input = item.querySelector("input");

        input.readOnly = state;
        item.classList.toggle("delete-mode", state);
      });
    }

    wrapExistingInputsOnce();

    addBtn?.addEventListener("click", () => {
      createPhonemeInput("", true);
    });

    list.addEventListener("keydown", (e) => {
      if (!e.target.classList.contains("iat-inputfield")) return;

      if (e.key !== "Enter" && e.key !== " ") return;

      e.preventDefault();

      const item = e.target.closest(".phoneme-item");

      if (editMode) {
        if (items().length <= 1) return;

        item?.remove();
        dispatchPhonemeUpdate();

        return;
      }

      createPhonemeInput("", true);
    });

    list.addEventListener("click", (e) => {
      if (!editMode) return;

      const item = e.target.closest(".phoneme-item");

      if (!item) return;

      if (items().length <= 1) return;

      item.remove();

      dispatchPhonemeUpdate();
    });

    editBtn?.addEventListener("click", () => {
      setEditMode(!editMode);
    });
  });
}
// ============================================================================================ POWERS .INP-RULES ==============================================
// ============================================================================================
// POWERS .INP-RULES
// ============================================================================================

// ============================================================================================
// POWERS .INP-RULES
// ============================================================================================

function initRuleInputs(root = document) {
  root.querySelectorAll(".iat-input.inp-rule").forEach((container) => {
    if (container.dataset.ruleInit === "true") return;

    container.dataset.ruleInit = "true";

    const editBtn = container.querySelector(".btn-edit");
    const addBtn = container.querySelector(".btn-add");
    const btnContainer = container.querySelector(".rule-btn");

    let draggedRow = null;

    // ============================================================
    // HELPERS
    // ============================================================

    const getRows = () => [...container.querySelectorAll(".rule")];

    function getPrefix() {
      const first = getRows()[0];

      if (!first?.id) return "rule";

      const match = first.id.match(/^(.*)-\d+$/);

      return match ? match[1] : "rule";
    }

    // ============================================================
    // COLLECT DATA FROM ALL RULES
    // ============================================================
    function getRuleValues() {
      return getRows().map((row) => {
        const values = {};

        row.querySelectorAll("[data-field]").forEach((input) => {
          const field = input.dataset.field;

          values[field] = input.value.trim();
        });

        return values;
      });
    }

    function getRuleFieldName(input) {
      const fieldClasses = [
        "source",
        "target",
        "cur-char",
        "new-char",
        "bef-char",
        "aft-char",
        "unl-bef",
        "unl-aft",
      ];

      return fieldClasses.find((className) =>
        input.classList.contains(className),
      );
    }

    // ============================================================
    // SEND DATA TO dataSync.js
    // ============================================================

    function dispatchRuleUpdate() {
      const values = getRuleValues();

      container.dispatchEvent(
        new CustomEvent("iat:rule-update", {
          bubbles: true,

          detail: {
            values: values,
          },
        }),
      );
    }

    // ============================================================
    // RENUMBER RULES
    // ============================================================

    function renumberRules() {
      const prefix = getPrefix();

      getRows().forEach((row, index) => {
        const newId = `${prefix}-${index + 1}`;

        row.id = newId;

        row.querySelectorAll("input").forEach((input) => {
          input.dataset.ruleId = newId;

          if (input.id) {
            const base = input.id.replace(/-\d+$/, "");

            input.id = `${base}-${index + 1}`;
          }
        });
      });
    }

    // ============================================================
    // CREATE NEW RULE
    // ============================================================

    function addRow(row) {
      const clone = row.cloneNode(true);

      clone.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });

      clone.removeAttribute("id");

      return clone;
    }

    function insertRow(row, after = null) {
      container.insertBefore(row, after || btnContainer);

      renumberRules();

      dispatchRuleUpdate();
    }

    // ============================================================
    // REMOVE RULE
    // ============================================================

    function removeRow(row) {
      if (!row) return;

      if (getRows().length <= 1) return;

      row.remove();

      renumberRules();

      dispatchRuleUpdate();
    }

    // ============================================================
    // EDIT MODE
    // ============================================================

    function setEditing(state) {
      container.classList.toggle("editing", state);

      editBtn?.classList.toggle("btn-active", state);

      getRows().forEach((row) => {
        row.querySelectorAll("input").forEach((input) => {
          input.readOnly = state;
        });
      });
    }

    // ============================================================
    // EDIT BUTTON
    // ============================================================

    editBtn?.addEventListener("click", () => {
      const editing = !container.classList.contains("editing");

      setEditing(editing);
    });

    // ============================================================
    // ADD BUTTON
    // ============================================================

    addBtn?.addEventListener("click", () => {
      const rows = getRows();

      if (!rows.length) return;

      const newRow = addRow(rows[rows.length - 1]);

      insertRow(newRow, btnContainer);
    });

    // ============================================================
    // INPUT CHANGES
    // ============================================================

    container.addEventListener("input", (event) => {
      if (!event.target.matches("input")) return;

      dispatchRuleUpdate();
    });

    // ============================================================
    // DELETE
    // ============================================================

    container.addEventListener("click", (event) => {
      if (!event.target.classList.contains("btn-delete")) return;

      const row = event.target.closest(".rule");

      removeRow(row);
    });

    // ============================================================
    // DRAG & DROP
    // ============================================================

    container.addEventListener("mousedown", (event) => {
      if (!event.target.classList.contains("btn-reorder")) return;

      const row = event.target.closest(".rule");

      row.draggable = true;

      row.addEventListener(
        "dragstart",
        (event) => {
          draggedRow = row;

          row.classList.add("dragging");

          const img = new Image();

          img.src =
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=";

          event.dataTransfer.setDragImage(img, 0, 0);
        },
        { once: true },
      );

      row.addEventListener(
        "dragend",
        () => {
          getRows().forEach((row) => {
            row.classList.remove("delete-hover", "reorder-hover", "dragging");

            row.draggable = false;
          });

          draggedRow = null;

          renumberRules();

          dispatchRuleUpdate();
        },
        { once: true },
      );
    });

    // ============================================================
    // DROP POSITIONING
    // ============================================================

    function getAfterRow(y) {
      const rows = [...container.querySelectorAll(".rule:not(.dragging)")];

      return rows.reduce(
        (closest, row) => {
          const box = row.getBoundingClientRect();

          const offset = y - box.top - box.height / 2;

          if (offset < 0 && offset > closest.offset) {
            return {
              offset,
              element: row,
            };
          }

          return closest;
        },
        {
          offset: Number.NEGATIVE_INFINITY,
        },
      ).element;
    }

    container.addEventListener("dragover", (event) => {
      event.preventDefault();

      if (!draggedRow) return;

      const after = getAfterRow(event.clientY);

      container.insertBefore(draggedRow, after || btnContainer);
    });

    // ============================================================
    // INITIALIZATION
    // ============================================================

    renumberRules();

    dispatchRuleUpdate();
  });
}

// ============================================================================================ POWERS .INP-NOTES ==============================================
function syncCardOptions(card) {
  const options = card.querySelectorAll(".iat-options");

  const result = [];

  options.forEach((group) => {
    const label =
      group.querySelector(".p-info")?.textContent?.replace(":", "").trim() ||
      "Options";

    const selected = [...group.querySelectorAll(".btn-select.selected")];

    const values = selected.map((b) => b.textContent.trim());

    if (values.length) {
      result.push(`${label}: ${values.join(", ")}`);
    }
  });

  // STORE AS SINGLE STRING
  card.dataset.optionsText = result.join(" | ");
  renderCardPreview(card);
}

function renderCardPreview(card) {
  const popup = card.querySelector(".popup-window");
  const wordBtn = card.querySelector(".btn-card-word");
  const body = card.querySelector(".card-body");

  if (!popup || !wordBtn || !body) return;

  // =========================
  // 1. MODERN WORD → button
  // =========================
  const modernWordInput = popup.querySelector(
    'input[placeholder="Modern word..."]',
  );
  if (modernWordInput) {
    wordBtn.textContent = modernWordInput.value.trim() || "—";
  }

  // =========================
  // 2. CLEAR BODY
  // =========================
  body.innerHTML = "";

  // =========================
  // 3. MAP ALL INPUTS → TEXT
  // =========================

  const map = [
    { label: "Proto word", selector: 'input[placeholder="Proto word..."]' },
    { label: "Written word", selector: 'input[placeholder="Written word..."]' },
    {
      label: "Translated word",
      selector: 'input[placeholder="Translated word..."]',
    },
    { label: "Used for", selector: 'input[placeholder="Input..."]' },
    { label: "Meaning", selector: 'textarea[placeholder="Meaning..."]' },
    { label: "Notes", selector: 'textarea[placeholder="Your notes..."]' },
  ];

  map.forEach(({ label, selector }) => {
    popup.querySelectorAll(selector).forEach((el) => {
      const value = el.value?.trim();
      if (!value) return;

      const p = document.createElement("p");
      p.className = "card-line";
      p.textContent = `${label}: ${value}`;
      body.appendChild(p);
    });
  });
  // =========================
  // 4. OPTIONS (Part of speech etc.)
  // =========================
  const optionsText = card.dataset.optionsText;

  if (optionsText && body) {
    const p = document.createElement("p");
    p.className = "card-line";
    p.textContent = optionsText;
    body.appendChild(p);
  }
}

// ============================================================
// RENDER INTONATION PLACEMENT OPTIONS
// ============================================================

function renderIntonationPlacementOptions(root = document) {
  const containers = root.querySelectorAll(
    '[data-generated="intonation-placement"]',
  );

  if (!containers.length) return;

  const language = appData.languages[activeLanguageId];

  if (!language) {
    console.warn("[iat.js] Active language not found.");

    return;
  }

  const partsOfSpeech =
    language.languageData?.grammaticalProperties?.partsOfSpeech;

  if (!partsOfSpeech) {
    console.warn("[iat.js] No parts of speech found.");

    return;
  }

  containers.forEach((container) => {
    const instance = container.closest("[data-instance]");

    if (!instance) {
      console.warn("[iat.js] Could not find parent intonation instance.");

      return;
    }

    const sentenceTypeId = instance.dataset.sentenceTypeId;

    if (!sentenceTypeId) {
      console.warn("[iat.js] Intonation instance has no sentence type ID.");

      return;
    }

    const stageData = getActiveStageData();

    if (!stageData) return;

    const intonationType =
      stageData.phonology?.intonations?.types?.[sentenceTypeId];

    const instanceOptions = instance.querySelectorAll(".iat-options");

    instanceOptions.forEach((options) => {
      if (options.dataset.generated === "intonation-placement") {
        return;
      }

      options.dataset.path = `phonology.intonations.types.${sentenceTypeId}.type`;
    });

    if (!intonationType) {
      console.warn("[iat.js] No intonation type found for:", sentenceTypeId);

      return;
    }

    const placement = intonationType.placement || {};

    const typeContainer = instance.querySelector(
      '[data-generated="intonation-type"]',
    );

    if (typeContainer) {
      typeContainer.dataset.path = `phonology.intonations.types.${sentenceTypeId}.type`;

      const typeButtons = typeContainer.querySelectorAll(".btn-select");

      typeButtons.forEach((button) => {
        const value = button.dataset.value;

        button.classList.toggle("selected", value === intonationType.type);
      });
    }

    // ============================================================
    // SET DYNAMIC DATA PATH
    // ============================================================

    container.dataset.path = `phonology.intonations.types.${sentenceTypeId}.placement`;

    // ============================================================
    // REMOVE OLD GENERATED BUTTONS
    // ============================================================

    container
      .querySelectorAll(".intonation-placement-option")
      .forEach((button) => {
        button.remove();
      });

    // ============================================================
    // CREATE PART-OF-SPEECH BUTTONS
    // ============================================================

    Object.values(partsOfSpeech).forEach((partOfSpeech) => {
      const placementState = placement[partOfSpeech.id];

      if (!placementState) {
        console.warn("[iat.js] No placement state found for:", partOfSpeech.id);

        return;
      }

      const button = document.createElement("button");

      button.className = "btn btn-opt btn-select intonation-placement-option";

      button.dataset.value = partOfSpeech.id;

      button.textContent = partOfSpeech.name;

      if (placementState.enabled) {
        button.classList.add("selected");
      }

      container.insertBefore(button, container.querySelector(".btn-close"));
    });
  });
}

// ============================================================================================ POWERS .INP-POPUP ==============================================

function initPopupInputs(root = document) {
  root.querySelectorAll(".iat-input.inp-popup").forEach((container) => {
    if (container.dataset.popupInit === "1") return;

    container.dataset.popupInit = "1";

    const openBtn = container.querySelector(".btn-popup-open");

    const overlay = container.querySelector(".popup-overlay");

    const popup = container.querySelector(".popup-window");

    const closeBtn = container.querySelector(".btn-popup-close");

    const addBtn = container.querySelector(".btn-popup-add");

    // =====================================================
    // OPEN
    // =====================================================

    function openPopup() {
      overlay.classList.remove("hidden");
      document.body.classList.add("popup-window-open");
    }

    // =====================================================
    // CLOSE
    // =====================================================

    function closePopup() {
      overlay.classList.add("hidden");
      document.body.classList.remove("popup-window-open");
    }

    openBtn?.addEventListener("click", openPopup);

    container
      .querySelector(".inputfield-icon")
      ?.addEventListener("click", openPopup);

    closeBtn?.addEventListener("click", closePopup);

    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) closePopup();
    });

    // =====================================================
    // ADD BUTTON
    // =====================================================

    addBtn?.addEventListener("click", () => {
      // later this will copy selected options
      // into the original option group

      closePopup();
    });
  });
}

function initNoteInputs(root = document) {
  root.querySelectorAll(".iat-input.inp-note").forEach((container) => {
    const noteBtn = container.querySelector(".btn-note");
    const overlay = container.querySelector(".popup-overlay");
    const popup = container.querySelector(".popup-window");
    const closeBtn = container.querySelector(".btn-note-close");

    const editor = container.querySelector(".note-editor");

    const boldBtn = container.querySelector(".btn-bold");
    const italicBtn = container.querySelector(".btn-italic");
    const underlineBtn = container.querySelector(".btn-underline");

    const pBtn = container.querySelector(".btn-p");
    const h3Btn = container.querySelector(".btn-h3");
    const h4Btn = container.querySelector(".btn-h4");

    // use nearest chapter h2 as popup title
    const chapterTitle = container.closest(".chap")?.querySelector("h2");

    const popupTitle = container.querySelector(".note-title");

    // set popup title
    if (chapterTitle) {
      popupTitle.textContent = chapterTitle.textContent;
    }

    // ============================================================
    // open popup
    // ============================================================

    noteBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      document.body.classList.add("popup-window-open");
    });

    // ============================================================
    // close popup
    // ============================================================

    function closePopup() {
      overlay.classList.add("hidden");
      document.body.classList.remove("popup-window-open");
    }

    closeBtn.addEventListener("click", closePopup);

    // click outside popup closes it
    overlay.addEventListener("click", (e) => {
      if (!popup.contains(e.target)) {
        closePopup();
      }
    });

    // ============================================================
    // toolbar formatting
    // ============================================================

    function applyCommand(command, value = null) {
      editor.focus();
      document.execCommand(command, false, value);
      updateNoteState();
    }

    // bold
    boldBtn.addEventListener("click", () => {
      applyCommand("bold");
    });

    // italic
    italicBtn.addEventListener("click", () => {
      applyCommand("italic");
    });

    // underline
    underlineBtn.addEventListener("click", () => {
      applyCommand("underline");
    });

    // paragraph
    pBtn.addEventListener("click", () => {
      applyCommand("formatBlock", "p");
    });

    // H1 styling (actually h3)
    h3Btn.addEventListener("click", () => {
      applyCommand("formatBlock", "h3");
    });

    // H2 styling (actually h4)
    h4Btn.addEventListener("click", () => {
      applyCommand("formatBlock", "h4");
    });

    // ============================================================
    // detect content -> switch icon style
    // ============================================================

    function updateNoteState() {
      const hasContent = editor.textContent.trim().length > 0;

      const icon = noteBtn.querySelector("i");

      icon.classList.toggle("fa-regular", !hasContent);
      icon.classList.toggle("fa-solid", hasContent);
    }

    editor.addEventListener("input", updateNoteState);

    updateNoteState();
  });
}

function openCard(card) {
  const overlay = card.querySelector(".popup-overlay");
  if (!overlay) return;

  overlay.classList.remove("hidden");
  document.body.classList.add("popup-window-open");
}

function closeCard(card) {
  const overlay = card.querySelector(".popup-overlay");
  if (!overlay) return;

  overlay.classList.add("hidden");
  document.body.classList.remove("popup-window-open");

  requestAnimationFrame(() => {
    const list = card.closest(".cards-list");
    const allCards = list?.querySelectorAll(".word-card");

    if (!list) return;

    // ONLY delete if empty AND there are other cards OR it's a fresh unsaved one
    if (isEmptyCard(card)) {
      if (allCards.length > 1 || card.dataset.new === "1") {
        card.remove();
      }
    }
  });
}

function isEmptyCard(card) {
  const modern = card.querySelector('input[placeholder="Modern word..."]');
  const proto = card.querySelector('input[placeholder="Proto word..."]');
  const written = card.querySelector('input[placeholder="Written word..."]');
  const translated = card.querySelector(
    'input[placeholder="Translated word..."]',
  );
  const meaning = card.querySelector("textarea");

  const word = modern?.value.trim() || "";

  const hasAnyData =
    word ||
    proto?.value.trim() ||
    written?.value.trim() ||
    translated?.value.trim() ||
    meaning?.value.trim();

  return !hasAnyData;
}

function attachCommitBehavior(card) {
  const inputs = card.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      // once user types anything → card becomes real
      if (input.value.trim().length > 0) {
        delete card.dataset.new;
      }
    });
  });
}

function initSingleWordCard(card) {
  if (card.dataset.cardInit === "1") return;
  card.dataset.cardInit = "1";

  const container = card.closest(".iat-cards.car-words");

  const body = card.querySelector(".card-body");
  const wordBtn = card.querySelector(".btn-card-word");

  const overlay = card.querySelector(".popup-overlay");
  const popup = card.querySelector(".popup-window");
  const closeBtn = card.querySelector(".btn-card-close");

  const inputs = card.querySelectorAll("input, textarea");

  // ============================================================
  // EDIT MODE CHECK
  // ============================================================
  function isEditMode() {
    return container?.dataset.editMode === "1";
  }

  // ============================================================
  // OPEN / CLOSE
  // ============================================================
  function openCard() {
    overlay?.classList.remove("hidden");
    document.body.classList.add("popup-window-open");
  }

  function closeCard() {
    overlay?.classList.add("hidden");
    document.body.classList.remove("popup-window-open");

    requestAnimationFrame(() => {
      if (!isEmptyCard(card)) return;

      const list = card.closest(".cards-list");
      const all = list?.querySelectorAll(".word-card");

      if (all && all.length > 0) {
        card.remove();
      }
    });
  }

  // expose it
  card._closeCard = closeCard;

  // ============================================================
  // RENDER PREVIEW (popup → card)
  // ============================================================
  function updatePreview() {
    const modern = card.querySelector('input[placeholder="Modern word..."]');
    const proto = card.querySelector('input[placeholder="Proto word..."]');
    const written = card.querySelector('input[placeholder="Written word..."]');
    const translated = card.querySelector(
      'input[placeholder="Translated word..."]',
    );
    const meaning = card.querySelector("textarea");

    // =========================
    // MAIN WORD (always safe)
    // =========================
    if (wordBtn) {
      wordBtn.textContent = modern?.value?.trim() || "—";
    }

    // =========================
    // BODY (NEVER EMPTY)
    // =========================
    if (body) {
      const lines = [];

      if (proto?.value?.trim()) lines.push(proto.value.trim());
      if (written?.value?.trim()) lines.push(written.value.trim());
      if (translated?.value?.trim()) lines.push(translated.value.trim());
      if (meaning?.value?.trim()) lines.push(meaning.value.trim());

      // IMPORTANT: fallback so body always exists visually
      if (lines.length === 0) {
        lines.push("No details yet");
      }

      body.innerHTML = lines.map((v) => `<p>${v}</p>`).join("");
    }
  }

  // ============================================================
  // LIVE UPDATE PREVIEW
  // ============================================================
  inputs.forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  updatePreview();

  // ============================================================
  // EVENTS
  // ============================================================

  body?.addEventListener("click", (e) => {
    if (isEditMode()) {
      e.preventDefault();

      card.remove(); // delete in edit mode
      return;
    }

    openCard();
  });

  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeCard();
    }
  });

  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeCard();
  });

  attachCommitBehavior(card);
}

function createWordCard(container) {
  const list = container.querySelector(".cards-list");
  const tpl = document.getElementById("word-card-template");

  // console.log(tpl);

  const card = tpl.content.firstElementChild.cloneNode(true);

  // mark as temporary draft
  card.dataset.new = "1";

  // reset inputs
  card.querySelectorAll("input, textarea").forEach((i) => (i.value = ""));

  list.appendChild(card);

  initSingleWordCard(card);

  openCard(card);

  return card;
}

// ============================================================================================ POWERS .WORD-CARDS ==============================================
// ============================================================================================ POWERS .WORD-CARDS ==============================================
function initWordCards(root = document) {
  // console.log(
  //   "word card containers:",
  //   root.querySelectorAll(".iat-cards.car-words").length,
  // );

  root.querySelectorAll(".iat-cards.car-words").forEach((container) => {
    if (container.dataset.init === "1") return;
    container.dataset.init = "1";

    const addBtn = container.querySelector(".btn-add");
    const editBtn = container.querySelector(".btn-edit");
    const list = container.querySelector(".cards-list");

    let editMode = false;

    function setEditMode(state) {
      editMode = state;
      container.dataset.editMode = state ? "1" : "0";

      editBtn?.classList.toggle("btn-active", state);

      list.querySelectorAll(".word-card").forEach((card) => {
        card.classList.toggle("delete-mode", state);
      });
    }

    // ADD
    addBtn?.addEventListener("click", () => {
      createWordCard(container);
    });

    // EDIT MODE
    editBtn?.addEventListener("click", () => {
      setEditMode(!editMode);
    });

    // INIT EXISTING (if any)
    list.querySelectorAll(".word-card").forEach((card) => {
      initSingleWordCard(card, {
        editMode,
        onDeleteRequest: (c) => {
          if (list.querySelectorAll(".word-card").length > 1) {
            c.remove();
          }
        },
      });
    });

    container.dataset.editMode = "0";
  });
}

// =================================================================================== CALLS ALL .IAT-INPUT TYPES ==============================================

function initInput(root = document) {
  initStaticInputs(root);
  initPhonemeInputs(root);
  initRuleInputs(root);
  initSelectionPopup();
  initPopupInputs(root);
  initNoteInputs(root);
  initWordCards(root);

  renderSentenceTypeOptions(root);
  renderIntonationPlacementOptions(root);

  initOptions(root);
}

// =============================================================================================================================================================================================================================================================================================================== IAT ORDER SYSTEM
// ==============================================================================================================================================================

// =================================================================================================================================================== FUNCTION
function initOrderContainer(container) {
  if (container.dataset.orderInit === "true") return;
  container.dataset.orderInit = "true";

  const availableList = container.querySelector(".ord-available");
  const usedList = container.querySelector(".ord-used");

  if (!usedList) return;

  let draggedItem = null;

  // ============================================================
  // INIT
  // ============================================================

  initializeUsedItems();
  dispatchUpdate();

  function dispatchUpdate() {
    document.dispatchEvent(new Event("iat:update"));
  }

  // ============================================================
  // CLICK FROM AVAILABLE → USED
  // ============================================================

  if (availableList) {
    availableList.addEventListener("click", (e) => {
      const item = e.target.closest(".p-available");
      if (!item) return;

      // Do nothing during edit mode
      if (container.dataset.editMode === "true") return;

      moveToUsed(item);
    });
  }

  // ============================================================
  // NEW: CLICK FROM USED → AVAILABLE
  // ============================================================

  usedList.addEventListener("click", (e) => {
    const item = e.target.closest(".p-used");

    if (!item) return;

    if (item.classList.contains("edit-disabled")) {
      return;
    }

    if (item.classList.contains("p-fixed")) return;

    moveBackToAvailable(item);
  });

  // ============================================================
  // USED ITEM DRAG INIT
  // ============================================================

  function initializeUsedItems() {
    usedList.querySelectorAll(".p-used").forEach((item) => {
      const draggable =
        !item.classList.contains("p-fixed") &&
        !item.classList.contains("edit-disabled");

      item.draggable = draggable;

      item.removeEventListener("dragstart", handleDragStart);
      item.removeEventListener("dragend", handleDragEnd);

      if (draggable) {
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragend", handleDragEnd);
      }
    });
  }

  // ============================================================
  // MOVE TO USED
  // ============================================================

  function moveToUsed(item) {
    item.classList.remove("p-available");
    item.classList.add("p-used");

    usedList.appendChild(item);

    initializeUsedItems();
    dispatchUpdate();
  }

  // ============================================================
  // MOVE BACK TO AVAILABLE
  // ============================================================

  function moveBackToAvailable(item) {
    if (!availableList) return;

    item.classList.remove("p-used");
    item.classList.add("p-available");

    item.draggable = false;

    const firstControl = availableList.querySelector(
      ".inputfield-icon, .btn-edit, .btn-close",
    );

    if (firstControl) {
      availableList.insertBefore(item, firstControl);
    } else {
      availableList.appendChild(item);
    }

    initializeUsedItems();
    dispatchUpdate();
  }

  // ============================================================
  // DRAG START
  // ============================================================

  function handleDragStart(event) {
    draggedItem = event.currentTarget;

    const img = new Image();
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=";

    event.dataTransfer.setDragImage(img, 0, 0);

    requestAnimationFrame(() => {
      draggedItem.classList.add("dragging");
    });
  }

  // ============================================================
  // DRAG END (ONLY REORDER LOGIC NOW)
  // ============================================================

  function handleDragEnd() {
    if (!draggedItem) return;

    draggedItem.classList.remove("dragging");

    draggedItem = null;

    initializeUsedItems();
    dispatchUpdate();
  }

  // ============================================================
  // REORDER INSIDE USED (UNCHANGED)
  // ============================================================

  usedList.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (!draggedItem) return;

    const afterElement = getDragAfterElement(usedList, event.clientX);

    if (!afterElement) {
      usedList.appendChild(draggedItem);
    } else {
      usedList.insertBefore(draggedItem, afterElement);
    }
  });

  // ============================================================
  // ORDER CALCULATION
  // ============================================================

  function getDragAfterElement(container, x) {
    const elements = [...container.querySelectorAll(".p-used:not(.dragging)")];

    return elements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }

        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  }
}

// ====================================================================================================== FUNCTION ==============================================
// MASTER INITIALIZER
function initOrder(root = document) {
  root.querySelectorAll(".iat-order").forEach((container) => {
    initOrderContainer(container);
  });
}

// ================================================================================================================================================================================================================================================================================================ RUN INIT FUNCTIONS ON PAGE LOAD
// =============================================================================================================================================================

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const openOverlays = document.querySelectorAll(".popup-overlay:not(.hidden)");

  openOverlays.forEach((overlay) => {
    const card = overlay.closest(".word-card");
    const closeBtn = card?.querySelector(".btn-card-close");

    closeBtn?.click();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initOptions(document);
  initInput(document);
  initOrder(document);
  // initTableSystem(document);

  // updateAllFeatureInstances();
});

document.addEventListener("iat:option-update", (event) => {
  const container = event.target.closest("[data-path]");

  if (!container) return;

  const path = container.dataset.path;
  const { key, enabled, value } = event.detail;

  if (key !== undefined) {
    setDataAtPath(`${path}.${key}.enabled`, enabled);
  }

  if (value !== undefined) {
    setDataAtPath(path, value);
  }

  document.dispatchEvent(
    new CustomEvent("iat:data-updated", {
      detail: {
        path: path,
      },
    }),
  );
});

// ========================================================================= !!!!!! DECLARE ALL TEMPLATE INSTANCES ==============================================
// ============================================================
// FEATURE REGISTRY (IMPORTANT IMPROVEMENT)
// ============================================================

// Create dynamic sub-sections using templates, but not used for all template creations?
// const FEATURE_INSTANCES = [
//   "intonation-types",
//   "syllable-structure",
//   "nounPhrase",
//   "active-strategies",
// ];

// =============================================================================================================================================================================================================================================================================================================== CLICIK DETECTION
// ==============================================================================================================================================================

// Creates a listener for each click on the page. Whenever the user clicks anything, (e) contains information about that click
document.addEventListener("click", (e) => {
  console.log("Correct clickEvent");

  const button = e.target.closest(".btn-select");

  if (!button) return;

  const container = button.closest(".iat-options");

  if (container) {
    // console.log("Container:", container);

    if (button.classList.contains("no-toggle")) return;

    if (container.classList.contains("closed")) return;

    if (!button.classList.contains("btn-opt")) return;

    if (container.dataset.editMode === "true") return;

    const optionButtons = container.querySelectorAll(".btn-select");

    // ============================================================
    // MULTI SELECT
    // ============================================================

    if (container.classList.contains("opt-multi")) {
      button.classList.toggle("selected");

      const card = button.closest(".word-card");

      if (card) {
        syncCardOptions(card);
      }

      // ============================================================
      // DATA SYNCHRONIZATION
      // ============================================================

      const path = container.dataset.path;

      const key = button.dataset.value;

      if (path && key) {
        const enabled = button.classList.contains("selected");

        container.dispatchEvent(
          new CustomEvent("iat:option-update", {
            bubbles: true,

            detail: {
              key: key,
              enabled: enabled,
            },
          }),
        );
      }

      document.dispatchEvent(new Event("iat:update"));

      return;
    }

    // ============================================================
    // SINGLE SELECT
    // ============================================================

    if (container.classList.contains("opt-single")) {
      const isSelected = button.classList.contains("selected");

      // Remove selection from all options
      optionButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      // If the clicked option was not selected,
      // select it.
      if (!isSelected) {
        button.classList.add("selected");
      }

      // ============================================================
      // DATA SYNCHRONIZATION
      // ============================================================

      const path = container.dataset.path;

      if (path) {
        const value = isSelected
          ? null
          : button.dataset.value || button.textContent.trim();

        container.dispatchEvent(
          new CustomEvent("iat:option-update", {
            bubbles: true,

            detail: {
              value: value,
            },
          }),
        );
      }

      document.dispatchEvent(new Event("iat:update"));

      return;
    }

    return;
  }

  // ============================================================
  // FALLBACK OUTSIDE .IAT-OPTIONS
  // ============================================================

  button.classList.toggle("selected");
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  document.querySelectorAll(".word-card").forEach((card) => {
    card._closeCard?.();
  });

  document.querySelectorAll(".inp-note .popup-overlay").forEach((overlay) => {
    overlay.classList.add("hidden");
  });

  document.body.classList.remove("popup-window-open");
});
