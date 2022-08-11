import {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import ProductFinder from "../apis/ProductFinder";
import {AddReview} from "../components/AddReview";
import {Reviews} from "../components/Reviews";
import {StarRating} from "../components/StarRating";
import {ProductContext} from "../context/ProductContext";

export const ProductDetail: React.FC = () => {
    const {id} = useParams();
    const {selectedProduct, setSelectedProduct} = useContext(ProductContext)!;

    useEffect(() => {
        (async function fetchData() {
            try {
                const response = await ProductFinder.get(`/${id}`);
                setSelectedProduct(response.data.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id, setSelectedProduct]);

    return(
        <div>
            {selectedProduct && (
                <>
                    <h1 className="text-center display-1">{selectedProduct.product.name}</h1>
                    <div className="text-center">
                        <StarRating rating={selectedProduct.product.average_rating}/> 
                        ({selectedProduct.product.count ? selectedProduct.product.count : 0})
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedProduct.reviews}></Reviews>
                        <AddReview></AddReview>
                    </div>
                </>
            )}
        </div>
    );
}
