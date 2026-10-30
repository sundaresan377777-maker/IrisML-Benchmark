# Multi-Class Benchmark Classification Pipeline Using Scikit-Learn

> **AI & Machine Learning Internship Project**  
> Empirical study comparing linear inductive bias (Logistic Regression) vs. non-parametric recursive splitting (Decision Tree Classifier) on the canonical Fisher's Iris benchmark dataset.

---

## 📌 Project Overview

This repository contains the interactive research and benchmark presentation website for the machine learning internship project: **"Multi-Class Benchmark Classification Pipeline Using Scikit-Learn"**.

The study evaluates and compares two foundational machine learning paradigms across the 3-class Iris botanical taxonomy (*Iris Setosa*, *Iris Versicolor*, and *Iris Virginica*), analyzing trade-offs in decision boundary geometry, feature scaling dependency, cross-validation variance, and confusion matrix distributions.

### Key Objectives
* **Dataset Exploration**: Understand the 4 morphometric measurements (Sepal Length, Sepal Width, Petal Length, Petal Width) across 150 specimens.
* **Model Benchmark**: Evaluate **Logistic Regression** (L-BFGS solver, multinomial cross-entropy, L2 regularization) against **Decision Tree Classifier** (Gini impurity, tree depth $d=3$).
* **Methodology Rigor**: Implement a stratified 80/20 train/test holdout partition, fit `StandardScaler` strictly on training data to prevent leakage, and assess generalization stability via 5-Fold Stratified Cross-Validation.
* **Interactive Evaluation**: Real-time browser-based Scikit-Learn inference engine and interactive confusion matrices.

---

## 🛠️ Technology Stack

* **Frontend**: React.js 19 + TypeScript
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide React
* **Machine Learning & Data**: Python 3.10+, Scikit-Learn 1.4+, Pandas, NumPy

---

## 💻 Running the Project in VS Code (Windows PowerShell)

Follow these step-by-step commands to run the website locally on your computer:

### Step 1: Open Terminal in VS Code
1. Open **Visual Studio Code**.
2. Open the project folder (`File > Open Folder...`).
3. Open the integrated terminal by pressing <kbd>Ctrl</kbd> + <kbd>`</kbd> (backtick) or go to `Terminal > New Terminal`.
4. Ensure the dropdown on the top-right of the terminal shows **PowerShell**.

### Step 2: Install Node Dependencies
Run the following command in PowerShell to install required packages:
```powershell
npm install
```

> **Note on Windows Script Permissions**: If PowerShell displays a `PSSecurityException` or restricts execution, run this command once:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

### Step 3: Start the Development Server
Launch the local development server:
```powershell
npm run dev
```

Your terminal will output:
```text
  VITE v8.3.0  ready in 240 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```
Hold <kbd>Ctrl</kbd> and click the `http://localhost:3000/` link (or open it in Chrome / Edge) to view the website.

### Step 4: Build for Production (Optional Verification)
To verify that the project compiles cleanly into static production files:
```powershell
npm run build
```
The compiled output will be generated inside the `dist/` folder.

---

## 🚀 Uploading to GitHub & Publishing on GitHub Pages

### 1. Upload to GitHub
1. Create a new repository on [GitHub](https://github.com/new), for example named: `scikit-learn-iris-benchmark`. Do **not** initialize it with a README or .gitignore (they already exist in this project).
2. In VS Code PowerShell, run:
```powershell
# Initialize git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: initial release of ML benchmark pipeline website"

# Rename branch to main
git branch -M main

# Link your GitHub remote (replace with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/scikit-learn-iris-benchmark.git

# Push code to GitHub
git push -u origin main
```

---

### 2. Publish with GitHub Pages (Method A: Automated GitHub Actions - Recommended)

1. On GitHub, navigate to your repository.
2. Click **Settings** (top tab) → **Pages** (left navigation bar).
3. Under **Build and deployment**:
   * **Source**: Select **GitHub Actions**.
4. Click **Configure** under the **Static HTML** or **Vite** suggestion, or add `.github/workflows/deploy.yml` with:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
5. Once complete, your website will be live at:
   `https://YOUR_USERNAME.github.io/scikit-learn-iris-benchmark/`

*(Note: `vite.config.ts` is already pre-configured with `base: './'` so relative asset links load without 404 errors).*

---

### 3. Alternative: Deploy using `gh-pages` npm package (Method B)

If you prefer a manual CLI deployment:
```powershell
npm install --save-dev gh-pages
```
Add a deploy script to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Then run:
```powershell
npm run deploy
```
Under **Settings > Pages**, set branch to `gh-pages` and save.

---

## 📊 Summary of Benchmark Results

| Evaluation Metric | Logistic Regression | Decision Tree Classifier |
| :--- | :--- | :--- |
| **Test Accuracy** | **96.67%** (29/30) | **96.67%** (29/30) |
| **Macro Precision** | **96.97%** | **96.97%** |
| **Macro Recall** | **96.67%** | **96.67%** |
| **Macro F1-Score** | **96.66%** | **96.66%** |
| **5-Fold Cross-Val Mean** | **96.00%** (± 2.49%) | **94.67%** (± 3.27%) |
| **Training Latency** | 4.12 ms | 1.84 ms |
| **Inductive Surface** | Continuous Hyperplanes | Orthogonal Hyperrectangles |

---

## 👤 Developer Profile & Customization

The **About the Developer** section includes editable placeholders for your academic internship submission:
* **Developer Name**: Sundaresan (or your name)
* **Course**: B.Tech in Artificial Intelligence & Data Science
* **Institution**: Department of Computer Science & Engineering
* **Project Role**: Machine Learning Intern
* **Advisor / Mentor**: Faculty Internship Advisor

You can update these details either directly in `src/components/DeveloperSection.tsx` or using the **"Edit Profile Placeholders"** button on the live website.

---

## 📄 License
This internship project is licensed under the Apache-2.0 License.
