'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAddReviewMutation } from '@/app/redux/slices/apiSlice';

interface ReviewFormProps {
  propertyId: string;
  onReviewSubmitted?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ propertyId, onReviewSubmitted }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // RTK mutation hook
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear messages
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validate form
    if (rating === 0) {
      setErrorMessage('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setErrorMessage('Please enter a review comment');
      return;
    }
    
    try {
      // Submit the review
      await addReview({
        propertyId,
        reviewData: { rating, comment }
      }).unwrap();
      
      // Reset form
      setRating(0);
      setComment('');
      setSuccessMessage('Thank you for your review!');
      
      // Call callback if provided
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      setErrorMessage('Failed to submit review. Please try again later.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Your Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="cursor-pointer p-1"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingHover(star)}
                onMouseLeave={handleRatingLeave}
              >
                <FaStar
                  size={24}
                  color={
                    (hoverRating || rating) >= star
                      ? '#FFD700' // Gold color for selected stars
                      : '#e4e5e9' // Gray color for unselected stars
                  }
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="review-comment" className="block mb-2 font-medium">
            Your Review
          </label>
          <textarea
            id="review-comment"
            className="w-full p-3 border border-gray-300 rounded-md min-h-[120px]"
            placeholder="Share your experience with this property..."
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm; 