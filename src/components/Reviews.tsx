import {Reviews as IReviews} from "../context/ProductContext";
import {StarRating} from "./StarRating";

interface Props {
    reviews: IReviews[];
};

export const Reviews: React.FC<Props> = ({ reviews }) => {
    const parseDate = function(str: string): Date | null { 
        const t = str.split(/[- :]/);
        return new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]), parseInt(t[3]) || 0, parseInt(t[4]) || 0, parseInt(t[5]) || 0);          
    }

    return(
        <div className="row row-cols-3 mb-2">
            {reviews.map((review) => {
                return(<div key={review.id} className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "18rem"}}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><StarRating rating={review.rating}/></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{review.message}</p>
                        <small>{parseDate(review.date)!.toString()}</small>
                    </div>
                </div>);
            })}
        </div>
    );
}
