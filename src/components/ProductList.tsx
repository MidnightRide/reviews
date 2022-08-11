import {AxiosResponse} from "axios";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ProductFinder from "../apis/ProductFinder";import {ProductContext} from "../context/ProductContext";
import {StarRating} from "./StarRating";

export const ProductList: React.FC = () => {
    const {products, setProducts} = useContext(ProductContext)!;
    const navigate = useNavigate(); 

    useEffect(() => {
        (async function fetchData() {
            try {
                const response: AxiosResponse<any, any> = await ProductFinder.get("/");
                setProducts(response.data.data.products);
            } catch(err) {
                console.error(err);
            }
        })();
    }, [setProducts]);

    const handleDelete = async function (e: React.MouseEvent<HTMLButtonElement>, id: number) {
        e.stopPropagation();
        
        try {
            await ProductFinder.delete(`/${id}`);
            
            setProducts(products.filter(product => {
                return product.id !== id;
            }));
        } catch (err) {
            console.error(err);
        }
    }

    const handleUpdate = function (e: React.MouseEvent<HTMLButtonElement>, id: number): void {
        e.stopPropagation();

        navigate(`/products/${id}/update`); 
    }
    
    const handleProductSelect = function (id: number): void {
        
        navigate(`/products/${id}`);
    }

    return(<div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Product</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map((el) => {
                    return(<tr key={el.id} onClick={() => handleProductSelect(el.id)}>
                        <td>{el.name}</td>
                        <td>{el.model}</td>
                        <td>{el.year}</td>
                        <td><StarRating rating={el.average_rating}/> ({el.count ? el.count : 0})</td>
                        <td><button onClick={(e) => handleUpdate(e, el.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e) => handleDelete(e, el.id)} className="btn btn-danger">Delete</button></td>
                   </tr>);
                })}
            </tbody>
        </table>  
    </div>);
}
