import {useContext, useState} from "react";
import ProductFinder from "../apis/ProductFinder";
import {ProductContext} from "../context/ProductContext";

export const AddProduct: React.FC = () => {
    const {addProduct} = useContext(ProductContext)!;

    const [name, setName] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [year, setYear] = useState<string>("2019");

    const handleSubmit = async function (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (isNaN(parseInt(year))) window.alert("Please enter a valid number for 'year'.");
        if (name === "") window.alert("Please enter a non-empty value for 'name'.");

        try {
            const response = await ProductFinder.post("/", {
                name, 
                model, 
                year,
            });
            addProduct(response.data.data.product);
        } catch (err) {
            console.error(err);
        }
    }

    return(<div className="mb-4">
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                </div>
                <div className="col">
                    <input value={model} onChange={e => setModel(e.target.value)} type="text" className="form-control" placeholder="model"/>
                </div>
                <div className="col">
                    <input value={year} onChange={e => setYear(e.target.value)} type="number" className="form-control" placeholder="year"/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
            </div>
        </form> 
    </div>);
}
