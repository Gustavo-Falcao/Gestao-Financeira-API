namespace Gestao_Financeira.Exceptions
{
    public class EmailJaCadastradoException : Exception
    {
        public EmailJaCadastradoException() : base("Já existe um usuário com esse email.")
        {
        }
    }
}