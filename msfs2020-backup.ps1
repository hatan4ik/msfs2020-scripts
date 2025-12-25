# 1. Detect Config File based on Version
$msStorePath = "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\UserCfg.opt"
$steamPath = "$env:APPDATA\Microsoft Flight Simulator\UserCfg.opt"

if (Test-Path $msStorePath) { $cfgFile = $msStorePath }
elseif (Test-Path $steamPath) { $cfgFile = $steamPath }
else { Write-Error "UserCfg.opt not found. MSFS may not be installed."; return }

# 2. Extract the actual Packages folder path from UserCfg.opt
$packagesLine = Get-Content $cfgFile | Select-String "InstalledPackagesPath"
$installPath = $packagesLine.ToString().Split('"')[1] # Extracts text between quotes
$communitySource = Join-Path $installPath "Community"

# 3. Setup Backup Destination
$backupRoot = "D:\MSFS_Backups\$(Get-Date -Format 'yyyyMMdd')"
New-Item -ItemType Directory -Path $backupRoot -Force

# 4. Perform Backup
Write-Host "Detected MSFS Packages at: $installPath" -Fore Cyan
Copy-Item $cfgFile -Destination $backupRoot
# Backup controller profiles (wgs)
$wgs = if ($cfgFile -eq $msStorePath) { "$($msStorePath.Replace('\LocalCache\UserCfg.opt',''))\SystemAppData\wgs" } 
       else { Get-ChildItem "$env:LOCALAPPDATA\Steam\userdata" -Recurse -Filter "1250410" | Select -Expand FullName }
Copy-Item $wgs -Destination $backupRoot -Recurse -Force

# Incremental backup of Community folder using Robocopy
robocopy "$communitySource" "$backupRoot\Community" /E /Z /MT:8 /R:1 /W:1 /NP


