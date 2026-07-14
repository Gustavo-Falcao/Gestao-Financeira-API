using Microsoft.EntityFrameworkCore;
using Gestao_Financeira.Models.Entities;

namespace Gestao_Financeira.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Conta> Contas { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.UserRole)
                .HasConversion<string>();

            modelBuilder.Entity<Transacao>()
                .HasOne<Categoria>()
                .WithMany()
                .HasForeignKey(transacao => transacao.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}