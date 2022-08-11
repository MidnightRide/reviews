import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ProductFinder from "../apis/ProductFinder";

export const AddReview: React.FC = () => {
    const { id } = useParams();
   
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [rating, setRating] = useState<number>(5);

    const handleSubmit = async function (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        try {
            await ProductFinder.post(`/${id}/addReview`, {
                id,
                name, 
                message, 
                rating,
            });
            navigate(0);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} id="rating" className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" className="form-control"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form> 
        </div>
    );
}
