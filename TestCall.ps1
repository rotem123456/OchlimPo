$userBody = @{
    email = "PasswordHashTest1@gmail.com"
    name = "PasswordHash1"
    password = "password"
    type = "bloggers"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:3000/users" -ContentType "application/json" -Body $userBody

