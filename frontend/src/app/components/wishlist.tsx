import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import { useGetUserDetailsQuery, useGetWishlistQuery } from '../redux/slices/apiSlice';

const Wishlist = () => {
    const { data: user, isLoading: userLoading } = useGetUserDetailsQuery();
    const { 
        data: wishlistData, 
        isLoading: wishlistLoading, 
        error: wishlistError,
        refetch: refetchWishlist 
    } = useGetWishlistQuery(
        user?.user?._id, 
        { skip: !user?.user?._id }
    );

    // Loading states
    if (userLoading || wishlistLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <FaSpinner className="animate-spin text-2xl text-blue-500" />
                    <span className="text-lg">Loading your wishlist...</span>
                </div>
            </div>
        );
    }

    // Error handling
    if (wishlistError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading wishlist</h2>
                    <button 
                        onClick={() => refetchWishlist()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // User not logged in
    if (!user?.user?._id) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <FaHeart className="text-6xl text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Please log in to view your wishlist</h2>
                    <p className="text-gray-500">You need to be logged in to see your saved properties.</p>
                </div>
            </div>
        );
    }

    // Empty wishlist
    if (!wishlistData || wishlistData.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
                    <div className="flex flex-col items-center justify-center py-16">
                        <FaHeart className="text-6xl text-gray-400 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 text-center max-w-md">
                            Start exploring properties and click the heart icon to add them to your wishlist.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
                    <div className="flex items-center space-x-2">
                        <FaHeart className="text-red-500" />
                        <span className="text-gray-600">
                            {wishlistData.length} {wishlistData.length === 1 ? 'property' : 'properties'}
                        </span>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistData.map((wishlistItem: any) => {
                        const property = wishlistItem.property;
                        
                        // Skip if property is null or undefined
                        if (!property) return null;

                        return (
                            <PropertyCard
                                key={property._id}
                                _id={property._id}
                                images={property.images || []}
                                title={property.title}
                                location={property.location || property.city}
                                price={property.price}
                                beds={property.beds}
                                baths={property.baths}
                                area={property.area}
                                rating={property.rating || 0}
                                reviewsCount={property.reviewsCount || 0}
                                verified={property.verified || false}
                                country={property.country}
                                currencyCode={property.currencyCode}
                                isInWishlist={true} // Since this is the wishlist page
                                className="h-full"
                            />
                        );
                    })}
                </div>

                {/* Refresh Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => refetchWishlist()}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Refresh Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;