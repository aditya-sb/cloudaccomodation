"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewStats {
  count: number;
  averageRating: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

interface ReviewsData {
  reviews: Review[];
  stats: ReviewStats;
}

const BuyerReviews = () => {
  const { propertyId } = useParams();
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analytics/reviews/property/${propertyId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviewsData(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="mt-10 bg-[var(--card)] p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-[var(--copy-primary)]">
          What Our Buyers Say
        </h3>
        <div className="mt-6 p-4 text-center">
          <p className="text-[var(--copy-secondary)]">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 bg-[var(--card)] p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-[var(--copy-primary)]">
          What Our Buyers Say
        </h3>
        <div className="mt-6 p-4 text-center">
          <p className="text-[var(--copy-secondary)]">{error}</p>
        </div>
      </div>
    );
  }

  if (!reviewsData || reviewsData.reviews.length === 0) {
    return (
      <div className="mt-10 bg-[var(--card)] p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-[var(--copy-primary)]">
          What Our Buyers Say
        </h3>
        <div className="mt-6 p-4 text-center">
          <p className="text-[var(--copy-secondary)]">No reviews yet. Be the first to review this property!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-[var(--card)] p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-[var(--copy-primary)] flex items-center gap-2">
        What Our Buyers Say
        <span className="text-sm font-normal bg-blue-100 text-blue-800 rounded-full px-3 py-1">
          {reviewsData.stats.count} reviews
        </span>
      </h3>
      
      {/* Rating summary */}
      <div className="mt-4 flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-[var(--copy-primary)]">{reviewsData.stats.averageRating.toFixed(1)}</div>
          <div className="flex mt-2 text-[var(--rating-star)]">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={16}
                color={i < Math.round(reviewsData.stats.averageRating) ? 'var(--rating-star)' : 'var(--gray-border)'}
              />
            ))}
          </div>
          <div className="text-sm text-[var(--copy-secondary)] mt-1">
            Based on {reviewsData.stats.count} reviews
          </div>
        </div>
        
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviewsData.stats.distribution[rating as keyof typeof reviewsData.stats.distribution];
            const percentage = reviewsData.stats.count ? Math.round((count / reviewsData.stats.count) * 100) : 0;
            
            return (
              <div key={rating} className="flex items-center gap-2 mb-2">
                <div className="w-12 text-sm font-medium">{rating} stars</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-8 text-xs text-right">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews list */}
      <div className="mt-6 space-y-6">
        {reviewsData.reviews.map((review) => (
          <div key={review.id} className="flex items-start space-x-4 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--gray-border)] flex items-center justify-center text-[var(--copy-primary)] font-semibold">
              {review.userName[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-[var(--copy-primary)] font-semibold">
                  {review.userName}
                </p>
                <span className="text-sm text-[var(--copy-secondary)]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex mt-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    size={14}
                    color={idx < review.rating ? 'var(--rating-star)' : 'var(--gray-border)'}
                    className="mr-1"
                  />
                ))}
              </div>
              <p className="text-[var(--copy-secondary)]">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerReviews;
