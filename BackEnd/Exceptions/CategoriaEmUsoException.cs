namespace Gestao_Financeira.Exceptions
{
    public class CategoriaEmUsoException : Exception
    {
        public CategoriaEmUsoException() : base("Não é possível excluir categoria vinculada a transações."){}
    }
}