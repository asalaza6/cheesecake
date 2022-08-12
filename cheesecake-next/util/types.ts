export interface LineItem {
    price: string; // price id
    quantity: number; // qty of cheesecake
    name: string; // only ui purposes
    priceAmount: number; // only ui purposes
    metadata?: any; // only ui purposes & email
}


export const ProductType = {
    'small': 'small',
    'trio': 'small',
    'teninch': 'teninch',
    'variety': 'small',
    'teninchdouble': 'teninch',
}

export type ProductTypeType = keyof typeof ProductType;

export const ProductTypeName: Record<ProductTypeType, string> = {
    small: 'Small',
    trio: 'Trio',
    teninch: '10 inch',
    variety: 'Variety',
    teninchdouble: '10 inch half/half',
}