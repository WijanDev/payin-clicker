export function formatNumber(value: number): string {
    if (value < 1000) return value.toFixed(2)

    const suffixes = ['k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc']
    const tier = Math.floor(Math.log10(value) / 3)

    if (tier === 0) return value.toFixed(2)

    const suffix = suffixes[tier - 1] || ''
    const scale = Math.pow(10, tier * 3)
    const scaled = value / scale

    // Muestra 2 decimales si es <10, 1 si es <100, y ninguno si es mayor
    const formatted =
        scaled < 10 ? scaled.toFixed(2) : scaled < 100 ? scaled.toFixed(1) : scaled.toFixed(0)

    return `${formatted}${suffix}`
}