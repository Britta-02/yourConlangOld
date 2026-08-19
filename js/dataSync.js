// ============================================================
// GET ACTIVE STAGE DATA
// ============================================================

// function getActiveStageData() {
//   const language = appData.languages[activeLanguageId];

//   if (!language) {
//     console.error(
//       `[dataSync.js] Language "${activeLanguageId}" does not exist.`,
//     );

//     return null;
//   }

//   const stage = language.stages[activeStageId];

//   if (!stage) {
//     console.error(`[dataSync.js] Stage "${activeStageId}" does not exist.`);

//     return null;
//   }

//   return stage.data;
// }

// ============================================================
// SET DATA AT PATH
// ============================================================

function setDataAtPath(path, value) {
  const stageData = getActiveStageData();

  if (!stageData) return;

  const parts = path.split(".");

  let current = stageData;

  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] === undefined || current[parts[i]] === null) {
      console.error(`[dataSync.js] Path does not exist: ${path}`);

      return;
    }

    current = current[parts[i]];
  }

  const finalKey = parts[parts.length - 1];

  // console.log("[dataSync.js] Updating:", path);
  // console.log("[dataSync.js] New value:", value);

  current[finalKey] = value;
}

function setNestedValue(object, path, value) {
  const parts = path.split(".");

  let current = object;

  parts.forEach((part, index) => {
    const isLast = index === parts.length - 1;

    if (isLast) {
      current[part] = value;
      return;
    }

    if (!current[part]) {
      current[part] = {};
    }

    current = current[part];
  });
}

// ============================================================
// CONVERT MINIMAL PAIRS
// ============================================================

function convertMinimalPairs(values) {
  const result = {};

  values.forEach((pair, index) => {
    const source = pair[0] || "";
    const target = pair[1] || "";

    // Ignore completely empty rows
    if (!source && !target) {
      return;
    }

    const id = `minimalPair-${index + 1}`;

    result[id] = {
      id: id,
      source: source,
      target: target,
    };
  });

  return result;
}

function convertPhonemeExceptions(values) {
  const result = {};

  values.forEach((rule, index) => {
    const source = rule.source || "";
    const before = rule.before || "";
    const after = rule.after || "";

    // Ignore completely empty rules
    if (!source && !before && !after) {
      return;
    }

    const id = `rule-${index + 1}`;

    result[id] = {
      id: id,
      order: index + 1,
      source: source,
      unless: {
        before: before,
        after: after,
      },
    };
  });

  return result;
}

function convertRules(values) {
  const result = {};

  values.forEach((rule, index) => {
    const id = `rule-${index + 1}`;

    const convertedRule = {
      id: id,
      order: index + 1,
    };

    Object.entries(rule).forEach(([field, value]) => {
      setNestedValue(convertedRule, field, value);
    });

    result[id] = convertedRule;
  });

  return result;
}

// ============================================================
// SYNC SENTENCE TYPES → INTONATION TYPES
// ============================================================

// function syncIntonationTypes() {
//   const language = appData.languages[activeLanguageId];

//   if (!language) {
//     console.error(
//       `[dataSync.js] Language "${activeLanguageId}" does not exist.`,
//     );

//     return;
//   }

//   const sentenceTypes =
//     language.languageData?.grammaticalProperties?.sentenceTypes;

//   if (!sentenceTypes) {
//     console.error("[dataSync.js] No sentence types found.");

//     return;
//   }

//   const stageData = getActiveStageData();

//   if (!stageData) return;

//   // Make sure intonations exists
//   if (!stageData.phonology.intonations) {
//     stageData.phonology.intonations = {
//       enabled: true,
//       types: {},
//     };
//   }

//   // Make sure types exists
//   if (!stageData.phonology.intonations.types) {
//     stageData.phonology.intonations.types = {};
//   }

//   const intonationTypes = stageData.phonology.intonations.types;

//   Object.values(sentenceTypes).forEach((sentenceType) => {
//     const id = sentenceType.id;

//     // Create missing intonation type
//     if (!intonationTypes[id]) {
//       intonationTypes[id] = {
//         enabled: false,
//         type: null,
//         placement: {},
//       };
//     }
//   });
// }

// ============================================================
// RECEIVE PHONEME UPDATES
// ============================================================

document.addEventListener("iat:phoneme-update", (event) => {
  const container = event.target;

  const path = container.dataset.path;

  const values = event.detail.values;

  if (!path) {
    console.error("[dataSync.js] Phoneme container has no data-path.");

    return;
  }

  // console.log("[dataSync.js] Phoneme update received.");
  // console.log("[dataSync.js] Path:", path);
  // console.log("[dataSync.js] Values:", values);

  setDataAtPath(path, values);
});

// ============================================================
// RECEIVE RULE UPDATES
// ============================================================

document.addEventListener("iat:rule-update", (event) => {
  const container = event.target;

  const path = container.dataset.path;
  const values = event.detail.values;

  if (!path) return;

  // console.log("[dataSync.js] Rule update received.");
  // console.log("[dataSync.js] Path:", path);
  // console.log("[dataSync.js] Values:", values);

  const finalValue = convertRules(values);

  setDataAtPath(path, finalValue);

  document.dispatchEvent(
    new CustomEvent("iat:data-updated", {
      detail: {
        path: path,
      },
    }),
  );
});

// ============================================================
// RECEIVE OPTION UPDATES
// ============================================================

// ============================================================
// RECEIVE OPTION UPDATES
// ============================================================

document.addEventListener("iat:option-update", (event) => {
  const container = event.target;

  const path = container.dataset.path;

  if (!path) {
    console.error("[dataSync.js] Option container has no data-path.");

    return;
  }

  const detail = event.detail;

  // ============================================================
  // MULTI-OPTION STATE
  // ============================================================

  if (detail.key !== undefined) {
    const stageData = getActiveStageData();

    if (!stageData) return;

    const parts = path.split(".");

    let current = stageData;

    for (const part of parts) {
      // console.log("[dataSync.js] Current object:", current);
      // console.log("[dataSync.js] Looking for property:", part);

      if (current[part] === undefined || current[part] === null) {
        console.error(`[dataSync.js] Path does not exist: ${path}`);
        console.error("[dataSync.js] Failed at:", part);

        return;
      }

      current = current[part];
    }

    const key = detail.key;

    if (!current[key]) {
      console.error(`[dataSync.js] Exception key does not exist: ${key}`);

      return;
    }

    // console.log("[dataSync.js] Option update received.");
    // console.log("[dataSync.js] Path:", path);
    // console.log("[dataSync.js] Key:", key);
    // console.log("[dataSync.js] Enabled:", detail.enabled);

    current[key].enabled = detail.enabled;

    document.dispatchEvent(
      new CustomEvent("iat:data-updated", {
        detail: {
          path: path,
          key: key,
          enabled: detail.enabled,
        },
      }),
    );

    return;
  }

  // ============================================================
  // SINGLE OPTION STATE
  // ============================================================

  if (detail.value !== undefined) {
    // console.log("[dataSync.js] Option update received.");
    // console.log("[dataSync.js] Path:", path);
    // console.log("[dataSync.js] Value:", detail.value);

    setDataAtPath(path, detail.value);
  }
});

// ============================================================
// SYNC INTONATION TYPES WITH SENTENCE TYPES
// ============================================================

function syncIntonationPlacementWithPartsOfSpeech(
  intonationType,
  partsOfSpeech,
) {
  if (!intonationType.placement) {
    intonationType.placement = {};
  }

  Object.values(partsOfSpeech).forEach((partOfSpeech) => {
    const id = partOfSpeech.id;

    if (!intonationType.placement[id]) {
      intonationType.placement[id] = {
        id: id,
        enabled: false,
      };
    }
  });

  Object.keys(intonationType.placement).forEach((id) => {
    if (!partsOfSpeech[id]) {
      delete intonationType.placement[id];
    }
  });
}

function syncIntonationTypesWithSentenceTypes() {
  const language = appData.languages[activeLanguageId];

  if (!language) return;

  const grammaticalProperties = language.languageData?.grammaticalProperties;

  if (!grammaticalProperties) return;

  const sentenceTypes = grammaticalProperties.sentenceTypes;

  const partsOfSpeech = grammaticalProperties.partsOfSpeech;

  const stageData = getActiveStageData();

  if (!stageData) return;

  if (!stageData.phonology.intonations) {
    stageData.phonology.intonations = {};
  }

  const intonations = stageData.phonology.intonations;

  if (intonations.enabled === undefined) {
    intonations.enabled = true;
  }

  if (!intonations.types) {
    intonations.types = {};
  }

  Object.values(sentenceTypes).forEach((sentenceType) => {
    const id = sentenceType.id;

    if (!intonations.types[id]) {
      intonations.types[id] = {
        id: id,
        enabled: false,
        type: null,
        placement: {},
      };
    }

    syncIntonationPlacementWithPartsOfSpeech(
      intonations.types[id],
      partsOfSpeech,
    );
  });

  Object.keys(intonations.types).forEach((id) => {
    if (!sentenceTypes[id]) {
      delete intonations.types[id];
    }
  });
}
