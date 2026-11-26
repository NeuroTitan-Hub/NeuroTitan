# Runs the Claude token counts for the Language Cost Index (both Claude tokenizers).
# Asks for your Anthropic API key in a hidden prompt. The key lives only in this window,
# is never written to a file, and is cleared when the script ends.

$ErrorActionPreference = "Stop"
$repo = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $repo
$flores = "C:\Users\Asus republic\Downloads\neurotitan-tools\data\flores200\flores200_dataset\devtest"

$secure = Read-Host "Paste your Anthropic API key (it stays hidden), then press Enter" -AsSecureString
$env:ANTHROPIC_API_KEY = [System.Net.NetworkCredential]::new("", $secure).Password
try {
    foreach ($model in @("claude-opus-5-5", "claude-sonnet-4-6")) {
        Write-Host ""
        Write-Host "Counting on $model ..."
        python -I site/scripts/measure_api_tokens.py anthropic $model $flores site/scripts/api-tokens
        if ($LASTEXITCODE -ne 0) { throw "The $model run stopped with an error (see above)." }
    }
    Write-Host ""
    Write-Host "Done. Both Claude runs finished. Tell Claude in the chat."
}
finally {
    Remove-Item Env:ANTHROPIC_API_KEY -ErrorAction SilentlyContinue
}
