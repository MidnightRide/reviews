import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface Product {
    id: number;
    name: string;
    model: string;
    year: number;
    count: number;
    average_rating: number;
}

export interface Reviews {
    id: number;
    product_id: number;
    name: string;
    message: string;
    rating: number;
    date: string;
}

interface ProductReviews {
    product: Product;
    reviews: Reviews[];
}

export interface ProductContextInterface {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    addProduct(product: Product): void;
    selectedProduct: ProductReviews | null;
    setSelectedProduct: Dispatch<SetStateAction<ProductReviews | null>>;
};

export const ProductContext: React.Context<ProductContextInterface | null> = createContext<ProductContextInterface | null>(null);

export const ProductContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductReviews | null>(null);

    const addProduct = function (product: Product): void {
        setProducts([...products, product]);
    }

    return(
        <ProductContext.Provider value={{products: products, setProducts: setProducts, addProduct: addProduct, 
            selectedProduct: selectedProduct, setSelectedProduct: setSelectedProduct}}>
            { children }
        </ProductContext.Provider>
    );
};
