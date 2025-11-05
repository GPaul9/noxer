import { Pagination } from './pagination';

export type Image = {
  Image_ID: number;
  Image_URL: string;
  MainImage: boolean;
  Product_ID: number;
  position: string;
  sort_order: number;
  title: string;
};

export type ProductMark = {
  Mark_Name: string,
  color_code: string,
};

export type Product = {
  id: number;
  images: Image[];
  marks: ProductMark[];
  name: string;
  old_price: number | null;
  price: number;
};

export type ProductFilterParams = {
  page: number;
  per_page: number;
  search: string;
}

export type ProductFilterResponse = {
  filters: object;
  pagination: Pagination;
  products: Product[];
  status: string;
  total: number;
};
