using Gestao_Financeira.Data;
using Gestao_Financeira.Repositories.CategoriaRepository;
using Gestao_Financeira.Repositories.ContaRepository;
using Gestao_Financeira.Repositories.TransacaoRepository;
using Gestao_Financeira.Repositories.UserRepository;
using Gestao_Financeira.Services.CategoriaService;
using Gestao_Financeira.Services.ContaService;
using Gestao_Financeira.Services.TransacaoService;
using Gestao_Financeira.Services.UserService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Required for endpoint discovery
builder.Services.AddSwaggerGen(); // Registers Swagger generator
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=app.db"));

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IContaService, ContaService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();
builder.Services.AddScoped<ICategoriaService, CategoriaService>();


// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IContaRepository, ContaRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();

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
