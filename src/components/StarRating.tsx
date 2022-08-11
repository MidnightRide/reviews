import {ReactNode} from "react";

interface Props {
    rating: number;
};

export const StarRating: React.FC<Props> = ({ rating }) => {
    const stars: ReactNode[] = [];

    for (let i = 1; i <= 5; ++i) {
        if (i <= rating) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
        } else {
            stars.push(<i key={i} className="far fa-star"></i>);
        }
    }


    return(
        <>
            {stars}
        </>
    );
}
