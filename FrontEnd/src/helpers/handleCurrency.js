export function handleCurrency() {

    function formatarDinheiroInput(valor) {
        const valorNumerico = Number(valor) / 100

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorNumerico)

        return valorFormatado
    }

    function converterMoedaBRParaNumero(valor) {
        return Number(valor
            .replace("R$", "")
            .trim()
            .replace(/\./g, "")
            .replace(",", ".")
        )
    }

    function formatarDinheiroVindoApi(valor) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(valor));
    }

    return{ formatarDinheiroInput, converterMoedaBRParaNumero, formatarDinheiroVindoApi }
}