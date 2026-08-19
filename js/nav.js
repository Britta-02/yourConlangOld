// ==================================================================================================================================!!!!!!!!!!==========NAV=====

const sidebar = document.querySelector(".sidebar");
const modeBtn = document.querySelector(".btn-nav-lock");

let mode = "auto";
// auto = hover opens/closes
// open = always open
// closed = always closed

let openTimeout;

function updateSidebarMode() {
  sidebar.classList.remove("open", "locked-open", "locked-closed");

  if (mode === "open") {
    sidebar.classList.add("open", "locked-open");
    modeBtn.innerHTML = `<i class="fa-solid fa-lock"></i>`;
  } else if (mode === "closed") {
    sidebar.classList.add("locked-closed");
    modeBtn.innerHTML = `<i class="fa-solid fa-lock"></i>`;
  } else {
    modeBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i>`;
  }
}

// initial state
updateSidebarMode();

modeBtn.addEventListener("click", () => {
  if (mode === "auto") mode = "open";
  else if (mode === "open") mode = "closed";
  else mode = "auto";

  updateSidebarMode();
});

// hover behavior (ONLY in auto mode)
sidebar.addEventListener("mouseenter", () => {
  if (mode !== "auto") return;

  openTimeout = setTimeout(() => {
    sidebar.classList.add("open");
  }, 700);
});

sidebar.addEventListener("mouseleave", () => {
  if (mode !== "auto") return;

  clearTimeout(openTimeout);
  sidebar.classList.remove("open");
});

// ===========================================================================================================================================view-toggle=====
document.querySelectorAll(".mode-toggle").forEach((toggle) => {
  const button = toggle.querySelector(".btn-nav-toggle");
  if (!button) return;
  const label = button.querySelector(".toggle-label");
  const icon = button.querySelector("i");

  button.addEventListener("click", () => {
    const current = toggle.dataset.state;

    // VIEW / EDIT
    if (current === "edit") {
      toggle.dataset.state = "view";
      icon.className = "fa-solid fa-eye";
    } else if (current === "view") {
      toggle.dataset.state = "edit";
      icon.className = "fa-solid fa-pencil";
    }

    // MODERN / PROTO
    else if (current === "modern") {
      toggle.dataset.state = "proto";
      icon.className = "fa-solid fa-seedling";
    } else if (current === "proto") {
      toggle.dataset.state = "modern";
      icon.className = "fa-solid fa-tree";
    }

    // UP / DOWN
    else if (current === "down") {
      toggle.dataset.state = "up";
      icon.className = "fa-solid fa-angle-up";

      setAllChapters(true); // collapse everything
    } else if (current === "up") {
      toggle.dataset.state = "down";
      icon.className = "fa-solid fa-angle-down";

      setAllChapters(false); // expand everything
    }
    // LANGUAGES
    // else if (current === "down") {
    //   toggle.dataset.state = "up";
    //   icon.className = "fa-solid fa-angle-up";
    // } else if (current === "up") {
    //   toggle.dataset.state = "down";
    //   icon.className = "fa-solid fa-angle-down";
    // }
  });
});

// ===========================================================================================================================================page-detection=====
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".sidebar .nav-item").forEach((link) => {
  const linkPage = link.getAttribute("href");

  // ignore empty links or anchors
  if (!linkPage || linkPage === "#") return;

  // remove old class just in case
  link.classList.remove("current-page");

  // add class if page matches
  if (linkPage === currentPage) {
    link.classList.add("current-page");
  }
});

// ===========================================================================
// CHAPTER COLLAPSING
// ===========================================================================

function setChapterCollapsed(chapter, collapsed) {
  chapter.classList.toggle("collapsed", collapsed);
}

function setAllChapters(collapsed) {
  document.querySelectorAll(".chap").forEach((chap) => {
    setChapterCollapsed(chap, collapsed);
  });

  document.querySelectorAll(".chap-sub").forEach((chap) => {
    setChapterCollapsed(chap, collapsed);
  });
}

// Click H2 to toggle chapter
document.querySelectorAll(".chap > .chap-title h2").forEach((title) => {
  title.addEventListener("click", () => {
    const chap = title.closest(".chap");
    setChapterCollapsed(chap, !chap.classList.contains("collapsed"));
  });
});

// Click H3 to toggle subchapter
document.querySelectorAll(".chap-sub > h3").forEach((title) => {
  title.addEventListener("click", () => {
    const chap = title.closest(".chap-sub");
    setChapterCollapsed(chap, !chap.classList.contains("collapsed"));
  });
});
