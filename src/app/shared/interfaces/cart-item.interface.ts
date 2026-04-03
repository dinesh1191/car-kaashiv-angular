export interface CartItem {
    cartId: number;
    partId: number;
    partName: string;
    price: number;
    quantity: number;
    subTotal: number;
    imageUrl?: string;
}

export interface AddToCartRequest{
  partId:number;
  quantity:number;  
}
export interface UpdateCartQuantityRequest{
  partId:number;
  quantity:number;  
}