// formato de moeda
const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 2,
})

// função para formatar a moeda
export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

// formato de número
const NUMBER_FORMATTER = new Intl.NumberFormat("pt-BR")

// função para formatar o número
export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number)
}