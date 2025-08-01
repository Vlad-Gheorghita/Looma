export type BillItem = {
    id: number,
    name: string,
    price: string,
    currency: string,
}

export type PersonShare = {
    personIndex: number,
    shares: number,
    percentage?: number, // Calculated percentage based on shares
}