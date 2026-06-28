@echo off
chcp 65001 >nul
cd /d "%~dp0"
(
  echo === Limpando repositorio antigo ===
  if exist ".git" rmdir /s /q ".git"
  echo === git init ===
  git init
  git branch -M main
  git config user.email "ayrton1711@gmail.com"
  git config user.name "Kautsu12"
  echo === git add ===
  git add -A
  echo === git commit ===
  git -c commit.gpgsign=false commit -m "Estrutura inicial: site de fa do Bucky Barnes (Astro + Tailwind)"
  echo === remote ===
  git remote add origin https://github.com/Kautsu12/TITEDOBUCK.git
  echo === push ===
  git push -u origin main
  echo === FIM ===
) > push_log.txt 2>&1
