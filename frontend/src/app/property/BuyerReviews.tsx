const reviews = [
  {
    name: "John Doe",
    review: "This villa is absolutely stunning! The ocean views are breathtaking and the amenities are top-notch.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    review: "The location is perfect, and the property is very spacious. I highly recommend this place!",
    rating: 4,
  },
];

const BuyerReviews = () => (
  <div className="mt-10 bg-[var(--card)] p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-semibold text-[var(--copy-primary)]">
      What Our Buyers Say
    </h3>
    <div className="mt-6 space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-[var(--gray-border)] flex items-center justify-center text-[var(--copy-primary)] font-semibold">
            {review.name[0]}
          </div>
          <div>
            <p className="text-[var(--copy-primary)] font-semibold">
              {review.name}
            </p>
            <p className="text-[var(--copy-secondary)]">{review.review}</p>
            <div className="flex mt-2">
              {[...Array(review.rating)].map((_, idx) => (
                <span key={idx} className="text-[var(--rating-star)]">★</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default BuyerReviews;
