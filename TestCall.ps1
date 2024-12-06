$userBody = @{
    email = "PasswordHashTest1@gmail.com"
    name = "PasswordHash1"
    password = "password"
    type = "bloggers"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:4000/user/create" -ContentType "application/json" -Body $userBody

