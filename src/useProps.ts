export interface StateDataProps {
  shop_list: ParamsProps[];
  added: ParamsProps[];
}

export interface ParamsProps {
  id: number,
  name: string,
  price: number,
  num?: number
}
