# pushing to GitHub

I have already initialized your project as a Git repository and committed all your files.

To finish adding your project to GitHub, follow these steps:

1.  **Log in to GitHub** and create a new repository: [https://github.com/new](https://github.com/new)
2.  **Name your repository** (e.g., `wholesale-delivery-system`).
3.  **Do NOT** initialize with a README, .gitignore, or license (I've already handled this locally).
4.  Click **Create repository**.

Once created, copy the URL of your new repository (it will look like `https://github.com/YOUR_USERNAME/wholesale-delivery-system.git`) and run the following commands in your terminal:

```bash
# Link your local repository to GitHub
git remote add origin https://github.com/dorothiiy/babybloom.git

# Push your code
git branch -M main
git push -u origin main
```

That's it! Your project will be live on GitHub.
