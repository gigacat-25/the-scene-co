Set-Location -LiteralPath "$env:USERPROFILE\Desktop\the-scene-co-1"
$env:PATH = "C:\Program Files\Git\bin;C:\Program Files\nodejs;$env:PATH"
npm run pages:build
