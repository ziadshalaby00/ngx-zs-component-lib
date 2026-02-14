@echo off
setlocal enabledelayedexpansion

echo ============================
echo Cleaning dist...
echo ============================
if exist dist rmdir /s /q dist

echo.
echo ============================
echo Building Tailwind...
echo ============================
call npx @tailwindcss/cli ^
 -i projects/ngx-zs-component/src/lib/ngx-zs-component/global.css ^
 -o projects/ngx-zs-component/output.css

if errorlevel 1 goto error

echo.
echo ============================
echo Building Angular library...
echo ============================
call ng build ngx-zs-component

if errorlevel 1 goto error

echo.
echo ============================
echo Publishing package...
echo ============================
cd dist\ngx-zs-component || goto error
call npm publish --access public

echo.
echo ✅ Publish done successfully
pause
exit /b 0

:error
echo.
echo ❌ Error occurred. Stopping publish.
pause
exit /b 1
