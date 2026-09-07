var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<SmartInventoryAPI.Services.IInventoryService, SmartInventoryAPI.Services.InventoryService>();

// Allows the local React development server (smartinventory.client) to call the API.
const string ClientCorsPolicy = "SmartInventoryClient";
var allowedClientOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? ["http://localhost:5173"];

builder.Services.AddCors(options =>
{
    options.AddPolicy(ClientCorsPolicy, policy => policy
        .WithOrigins(allowedClientOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors(ClientCorsPolicy);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
