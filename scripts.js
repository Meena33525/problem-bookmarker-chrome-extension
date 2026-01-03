// scripts.js - Popup functionality

let allProblems = [];
let searchQuery = "";

// DOM Elements
const problemsList = document.getElementById("problems-list");
const searchInput = document.getElementById("search-input");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProblems();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderProblems();
  });
}

// Load problems from storage
function loadProblems() {
  chrome.runtime.sendMessage({ action: "getProblems" }, (response) => {
    if (response && response.success) {
      allProblems = response.problems || [];
      allProblems.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      renderProblems();
    }
  });
}

// Render problems
function renderProblems() {
  let filtered = allProblems;

  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.url.toLowerCase().includes(searchQuery) ||
        p.domain.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    problemsList.innerHTML = `
      <div class="empty-state">
        <p>${
          allProblems.length === 0
            ? "No problems bookmarked yet!"
            : "No problems match your search."
        }</p>
        <p>${
          allProblems.length === 0
            ? "Click the bookmark icon on any problem page"
            : ""
        }</p>
      </div>
    `;
    return;
  }

  problemsList.innerHTML = filtered.map(createProblemCard).join("");

  // Attach event listeners
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const url = e.currentTarget.dataset.url;
      chrome.tabs.create({ url: url });
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const problemId = e.currentTarget.dataset.id;
      deleteProblem(problemId);
    });
  });
}

// Create problem card - SIMPLIFIED with just icons
function createProblemCard(problem) {
  const date = new Date(problem.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return `
    <div class="problem-item">
      <div class="problem-info">
        <h3 class="problem-title">${escapeHtml(problem.title)}</h3>
        <p class="problem-time">${date}</p>
      </div>
      <div class="problem-icons">
        <button class="play-btn" data-url="${problem.url}" title="Open">
          <img src="assets/play.png" alt="Open">
        </button>
        <button class="delete-btn" data-id="${problem.id}" title="Delete">
          <img src="assets/delete.png" alt="Delete">
        </button>
      </div>
    </div>
  `;
}

// Delete problem
function deleteProblem(problemId) {
  if (confirm("Delete this problem?")) {
    chrome.runtime.sendMessage(
      { action: "deleteProblem", problemId: problemId },
      (response) => {
        if (response && response.success) {
          loadProblems();
        }
      }
    );
  }
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}