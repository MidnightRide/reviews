import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ProductFinder from "../apis/ProductFinder";

export const UpdateProduct: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [year, setYear] = useState<string>("");

    useEffect(() => {
        (async function fetchData() {
            try {
                const response = await ProductFinder.get(`/${id}`);
                setName(response.data.data.product.name);
                setModel(response.data.data.product.model);
                setYear(response.data.data.product.year);
            }
            catch (err) {
                console.error(err);
            }
        })(); 
    }, [id]);

    const handleSubmit = async function (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        await ProductFinder.put(`/${id}`, {
            name, 
            model, 
            year,
        });

        navigate("/");
    }

    return(<div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text"></input>
            </div>
            <div className="form-group">
                <label htmlFor="name">Model</label>
                <input value={model} onChange={e => setModel(e.target.value)} id="model" className="form-control" type="text"></input>
            </div>
            <div className="form-group">
                <label htmlFor="name">Year</label>
                <input value={year} onChange={e => setYear(e.target.value)} id="year" className="form-control" type="number"></input>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form> 
    </div>);
}
