@echo off
echo ========================================================
echo   Venkathanu.Ai — Push Codebase to GitHub Repository
echo   Target: https://github.com/yakshithavt/thanuVbanking
echo ========================================================

git init
git branch -M main
git add .
git commit -m "feat: initial commit for Venkathanu.Ai Autonomous Digital Threat Investigator"
git remote add origin https://github.com/yakshithavt/thanuVbanking.git
git push -u origin main --force

echo ========================================================
echo   Successfully pushed Venkathanu.Ai to GitHub!
echo ========================================================
pause
