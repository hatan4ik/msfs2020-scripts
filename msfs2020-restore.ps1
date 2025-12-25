# Point to your backup folder
$source = "D:\MSFS_Backups\20251224" 

# 1. Identify Target using same dynamic detection as backup
$msStorePath = "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\UserCfg.opt"
$steamPath = "$env:APPDATA\Microsoft Flight Simulator\UserCfg.opt"
$targetCfg = if (Test-Path $msStorePath) { $msStorePath } else { $steamPath }

# 2. Extract Installation Path from the BACKUP config to know where to put mods
$backupCfg = "$source\UserCfg.opt"
$packagesLine = Get-Content $backupCfg | Select-String "InstalledPackagesPath"
$targetPackagesPath = $packagesLine.ToString().Split('"')[1]

# 3. Restore Files
Write-Host "Restoring to: $targetPackagesPath" -Fore Yellow
Copy-Item "$source\UserCfg.opt" -Destination (Split-Path $targetCfg) -Force
robocopy "$source\Community" "$targetPackagesPath\Community" /E /Z /MT:8

Write-Host "Restore Complete. Launch MSFS and select 'Use Local Data'." -Fore Green

