export interface Decision {
    id: string
    name: string
    desc: string
    cooldown: number
    cooldownLeft: number
    cost: number
    benefit: number
    icon: string
}