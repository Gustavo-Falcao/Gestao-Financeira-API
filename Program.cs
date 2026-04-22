using Gestao_Financeira.Data;
using Gestao_Financeira.Repositories.Users;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Required for endpoint discovery
builder.Services.AddSwaggerGen(); // Registers Swagger generator
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=app.db"));
builder.Services.AddScoped<IUserRepository, UserRepository>();

// No caso de Frontend(Vue, React, Angular) será necessário utilizar CORS

// Registro de Repos abaixo

var app = builder.Build();

using(var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger(); // Generates the openapi.json file
    app.UseSwaggerUI(); // Enables the interactive web UI
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
