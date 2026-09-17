@echo off
echo ========================================================
echo   Venkathanu.Ai — Push Codebase to GitHub Repository
echo   Target: https://github.com/yakshithavt/thanuVbanking
echo ========================================================
echo.
echo If you have your Personal Access Token (PAT):
echo Paste your token when prompted below.
echo.
set /p GH_TOKEN="Enter your GitHub Personal Access Token (PAT): "

if "%GH_TOKEN%"=="" (
    echo No token entered. Using standard git push...
    git remote set-url origin https://github.com/yakshithavt/thanuVbanking.git
) else (
    echo Setting remote with token authentication...
    git remote set-url origin https://%GH_TOKEN%@github.com/yakshithavt/thanuVbanking.git
)

echo Pushing to GitHub repository...
git push -u origin main --force

echo ========================================================
echo   Push complete! Check https://github.com/yakshithavt/thanuVbanking
echo ========================================================
pause
