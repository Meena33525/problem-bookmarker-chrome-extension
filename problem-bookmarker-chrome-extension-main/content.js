// content.js - Runs on every webpage
// Detects problem pages and injects bookmark button only on those pages

function isProblemPage() {
  const url = window.location.href;
  const hostname = window.location.hostname;

  // Array of problem page patterns for different platforms
  const problemPatterns = [
    // LeetCode
    /leetcode\.com\/problems\//i,
    // HackerRank
    /hackerrank\.com\/challenges\//i,
    // MAANG
    /maang\.in\/problems\//i,
    // CodeSignal
    /codesignal\.com\/(arcade|interview-practice)/i,
    // CodeChef
    /codechef\.com\/problems\//i,
    // Codeforces
    /codeforces\.com\/problemset\/problem\//i,
    // GeeksforGeeks
    /geeksforgeeks\.org\/problems\//i,
    // InterviewBit
    /interviewbit\.com\/problems\//i,
    // Codewars
    /codewars\.com\/kata\//i,
    // AtCoder
    /atcoder\.jp\/contests\/.+\/tasks\//i,
    // HackerEarth
    /hackerearth\.com\/challenges\//i,
    // TopCoder
    /topcoder\.com\/challenges\//i,
    // Spoj
    /spoj\.com\/problems\//i,
    // Generic problem page detection
    /(problem|challenge|kata|task|exercise)s?\//i
  ];

  // Check if URL matches any problem page pattern
  return problemPatterns.some(pattern => pattern.test(url));
}

function injectBookmarkButton() {
  // Only inject on problem pages
  if (!isProblemPage()) {
    return;
  }

  // Check if button already exists
  if (document.getElementById("to-do-bookmark-btn")) {
    return;
  }

  // Create button
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.id = "to-do-bookmark-btn";
  bookmarkBtn.type = "button";
  bookmarkBtn.title = "Bookmark this problem";
  bookmarkBtn.setAttribute("aria-label", "Bookmark problem");
  
  bookmarkBtn.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 55px;
    height: 55px;
    border-radius: 12px;
    background-color: #fff;
    border: 3px solid #667eea;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 999999 !important;
    font-size: 28px;
    font-weight: bold;
    color: #667eea;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  // Use emoji bookmark
  bookmarkBtn.innerHTML = '📌';

  // Hover effect
  bookmarkBtn.onmouseover = () => {
    bookmarkBtn.style.backgroundColor = "#667eea";
    bookmarkBtn.style.color = "#fff";
    bookmarkBtn.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
    bookmarkBtn.style.transform = "scale(1.1)";
  };

  bookmarkBtn.onmouseout = () => {
    bookmarkBtn.style.backgroundColor = "#fff";
    bookmarkBtn.style.color = "#667eea";
    bookmarkBtn.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
    bookmarkBtn.style.transform = "scale(1)";
  };

  // Click handler
  bookmarkBtn.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveProblem();
  };

  // Prevent accidental triggering
  bookmarkBtn.onmousedown = (e) => {
    e.stopPropagation();
  };

  document.documentElement.appendChild(bookmarkBtn);
}

// Save problem to storage
function saveProblem() {
  const problem = {
    title: document.title || "Untitled Problem",
    url: window.location.href,
    timestamp: new Date().toISOString(),
    domain: new URL(window.location.href).hostname
  };

  chrome.runtime.sendMessage(
    { action: "saveProblem", problem: problem },
    (response) => {
      if (response && response.success) {
        showNotification("✓ Problem bookmarked!", false);
        
        // Change button appearance
        const btn = document.getElementById("to-do-bookmark-btn");
        if (btn) {
          btn.style.backgroundColor = "#10b981";
          btn.style.borderColor = "#10b981";
          btn.style.color = "#fff";
          btn.innerHTML = '✓';
          
          setTimeout(() => {
            btn.style.backgroundColor = "#fff";
            btn.style.borderColor = "#667eea";
            btn.style.color = "#667eea";
            btn.innerHTML = '📌';
          }, 2000);
        }
      } else {
        showNotification(
          response?.message || "Problem already bookmarked or error occurred",
          true
        );
      }
    }
  );
}

// Show notification
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    padding: 16px 24px;
    background-color: ${isError ? "#ef4444" : "#10b981"};
    color: white;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    z-index: 1000000;
    animation: slideInNotif 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  notification.textContent = message;

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInNotif {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  
  if (!document.querySelector("style[data-notification]")) {
    style.setAttribute("data-notification", "true");
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Inject button when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectBookmarkButton);
} else {
  injectBookmarkButton();
}

// Try injection multiple times for SPAs
setTimeout(injectBookmarkButton, 500);
setTimeout(injectBookmarkButton, 1500);
setTimeout(injectBookmarkButton, 3000);

// Handle dynamic page navigation (SPAs like LeetCode, CodeSignal)
window.addEventListener("popstate", () => {
  setTimeout(injectBookmarkButton, 500);
});

// Watch for URL changes (SPA navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  let url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(injectBookmarkButton, 500);
  }
}).observe(document, { subtree: true, childList: true });

// Mutation observer for dynamic content
const observer = new MutationObserver(() => {
  if (isProblemPage() && !document.getElementById("to-do-bookmark-btn")) {
    injectBookmarkButton();
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["data-testid", "class"]
});