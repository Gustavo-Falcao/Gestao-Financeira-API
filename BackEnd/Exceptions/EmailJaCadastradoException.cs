namespace Gestao_Financeira.Exceptions
{
    public class EmailJaCadastradoException : Exception
    {
        public EmailJaCadastradoException() : base("O e-mail informado já está cadastrado.")
        {
        }
    }
}