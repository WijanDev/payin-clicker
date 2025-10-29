export interface Upgrade {
    id: string
    name: string
    desc: string
    baseCost: number
    cost: number
    clickBonus?: number
    clickBonusMult?: number
    auto: number
    owned: number
    unlockAt: number
    phase: number // 1-4
    autoBonus: number
}