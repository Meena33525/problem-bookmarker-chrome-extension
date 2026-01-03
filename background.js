// background.js - Background service worker
// Handles storage operations and message passing

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveProblem") {
    saveProblemToStorage(request.problem, sendResponse);
  } else if (request.action === "getProblems") {
    getProblemsFromStorage(sendResponse);
  } else if (request.action === "deleteProblem") {
    deleteProblemFromStorage(request.problemId, sendResponse);
  } else if (request.action === "updateProblem") {
    updateProblemStatus(request.problemId, request.status, sendResponse);
  }

  // Return true to indicate we'll send a response asynchronously
  return true;
});

// Save problem to Chrome storage
function saveProblemToStorage(problem, callback) {
  chrome.storage.local.get("problems", (data) => {
    const problems = data.problems || [];

    // Check if problem already exists (same URL)
    const exists = problems.some((p) => p.url === problem.url);

    if (exists) {
      callback({ success: false, message: "Problem already in list" });
      return;
    }

    // Add unique ID and status
    const newProblem = {
      ...problem,
      id: Date.now().toString(), // Simple unique ID
      status: "pending" // pending, in-progress, completed
    };

    problems.push(newProblem);

    // Save to Chrome storage
    chrome.storage.local.set({ problems: problems }, () => {
      callback({ success: true, message: "Problem saved successfully" });
    });
  });
}

// Get all problems from storage
function getProblemsFromStorage(callback) {
  chrome.storage.local.get("problems", (data) => {
    const problems = data.problems || [];
    callback({ success: true, problems: problems });
  });
}

// Delete problem from storage
function deleteProblemFromStorage(problemId, callback) {
  chrome.storage.local.get("problems", (data) => {
    const problems = data.problems || [];
    const filteredProblems = problems.filter((p) => p.id !== problemId);

    chrome.storage.local.set({ problems: filteredProblems }, () => {
      callback({ success: true, message: "Problem deleted successfully" });
    });
  });
}

// Update problem status (pending -> in-progress -> completed)
function updateProblemStatus(problemId, status, callback) {
  chrome.storage.local.get("problems", (data) => {
    const problems = data.problems || [];
    const updated = problems.map((p) => {
      if (p.id === problemId) {
        return { ...p, status: status };
      }
      return p;
    });

    chrome.storage.local.set({ problems: updated }, () => {
      callback({ success: true, message: "Problem status updated" });
    });
  });
}