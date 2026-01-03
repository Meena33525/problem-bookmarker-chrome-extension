📌 Problem Tracker - Chrome Extension

## 📖 Description

**Problem Tracker** is a lightweight Chrome Extension that helps you **quickly bookmark coding problems when you get stuck** and want to practice them later. 

When you encounter a difficult problem during interview preparation, simply click the bookmark button to save it. All bookmarked problems are stored in one centralized location for easy review and practice.

---

## 🎯 Problem Statement

Students and developers often face challenges during problem-solving practice:

- **Difficult Problems** - When stuck on a problem, you want to bookmark it to practice later
- **Forgotten Problems** - After solving many problems, hard to remember which ones were challenging
- **No Quick Access** - Can't quickly refer back to problems you struggled with
- **Multiple Platforms** - Problems are scattered across LeetCode, HackerRank, MAANG, etc.
- **Manual Tracking** - Using notes or browser history to track difficult problems

**Problem Tracker** solves this with a **simple one-click bookmark**.

---

## 🎯 Objectives

### Primary Objectives:
1. **One-Click Problem Bookmarking** - Instantly bookmark any problem you get stuck on
2. **Quick Memory Aid** - Remember difficult problems for later practice
3. **Unified Problem Repository** - Keep all bookmarked problems in one place
4. **Easy Access** - Quickly view all saved problems whenever needed
5. **Local & Private** - Store all data locally without relying on servers
6. **Minimal Friction** - Simple UI that doesn't interfere with problem-solving

### Secondary Objectives:
- Automatic detection of problem pages
- Support for all major coding platforms
- Real-time search to find specific problems
- Support for Single Page Applications (SPAs)
- Zero performance impact on problem-solving

---

## ✨ Features

### 🔖 **One-Click Bookmark Button**
- Click once when stuck to bookmark the problem
- White button with purple border and 📌 emoji
- Visual feedback (turns green with ✓ when bookmarked)
- Works on any coding platform universally

### 💾 **Save Problems You Get Stuck On**
- Bookmark problems that challenge you during practice
- Automatically captures problem title, URL, and timestamp
- No need to manually type or remember problem names

### 📋 **View All Bookmarked Problems**
- See all your stuck/difficult problems in one unified list
- Shows each problem with bookmark time
- Clean, organized interface for quick review

### 🔍 **Smart Search & Filter**
- Search bookmarked problems by problem name, platform, or keywords
- Find your specific stuck problems in seconds
- Case-insensitive and instant results

### ⚡ **Quick Access**
- **▶️ Open** - Click to revisit the problem (opens in new tab)
- **🗑️ Delete** - Remove from list once you've practiced enough

### 💾 **Local, Private Storage**
- All data stored on your device (no internet required)
- No tracking, no analytics, completely private
- Data persists across browser sessions

### 🌐 **Works Everywhere**
- Detects problem pages on LeetCode, HackerRank, MAANG, CodeSignal, CodeChef, and 90+ platforms
- Only shows button when viewing a problem
- Seamlessly handles all coding websites

---
### 📸 Screenshots

### 📌 Bookmark Button on Problem Page
This snapshot shows the bookmark button added directly to a coding problem page, allowing users to save a problem with a single click when they get stuck.

### ✅ Successful Bookmark Message
This snapshot displays the confirmation message shown after a problem is successfully bookmarked, giving clear feedback to the user.

### ⚠️ Duplicate Bookmark Warning
This snapshot shows the warning message displayed when a user tries to bookmark a problem that has already been saved, preventing duplicate entries.

### 🌐 Bookmarked Problems from Multiple Platforms
This snapshot demonstrates that the extension works across multiple coding platforms, showing bookmarked problems from different websites in a single unified list with options to open or delete them.


## 💻 Tech Stack

### **Frontend:**
- JavaScript (ES6+)
- HTML5
- CSS3

### **Chrome APIs:**
- Chrome Storage API (data persistence)
- Chrome Runtime API (message passing)
- Chrome Tabs API (opening links)
- Content Scripts (injecting UI)

---

## 📋 Requirements

### **System Requirements:**
- Google Chrome version 88 or higher
- Windows, macOS, or Linux
- Minimal RAM and storage

### **Developer Requirements:**
- Text Editor (VS Code recommended)
- Chrome browser for testing
- Basic knowledge of JavaScript, HTML, CSS

---

## 📥 Installation

### **Step 1: Download the Extension**
```bash
git clone https://github.com/yourusername/problem-tracker.git
cd problem-tracker
```

### **Step 2: Open Chrome Extensions Page**
1. Open Google Chrome
2. Go to `chrome://extensions/`
3. Toggle **"Developer Mode"** (top-right corner)

### **Step 3: Load the Extension**
1. Click **"Load unpacked"**
2. Navigate to your project folder
3. Select the project folder
4. Extension will appear in your Chrome toolbar!

### **Step 4: Verify Installation**
1. Visit a problem page (e.g., `https://leetcode.com/problems/two-sum/`)
2. Look for the **📌 button** in top-right corner
3. Extension is ready to use!


## 🚀 Future Enhancements

### **Planned Features for v1.1:**
- Difficulty tracking (Easy/Medium/Hard)
- Custom notes for problems
- Attempt tracking
- Solution links
- Keyboard shortcuts

### **Planned Features for v1.2:**
- Categories by topic (Arrays, DP, Strings, etc.)
- Time tracking per problem
- Priority tagging
- Export list as PDF/Excel
- Dark mode

### **Long-Term Vision (v2.0+):**
- AI recommendations for practice
- Learning path suggestions
- Progress analytics and charts
- Cloud backup option
- Mobile companion app

---

## 👨‍💻 Author
 Meenakshi IC

---

## 📝 License

This project is licensed under the **MIT License**.
