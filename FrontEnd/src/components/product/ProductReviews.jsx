import React from 'react';
import { FaStar, FaThumbsUp, FaCheckCircle } from 'react-icons/fa';

const ProductReviews = () => {
    // Mock Data
    const reviews = [
        {
            id: 1,
            author: "Sarah J.",
            date: "October 12, 2023",
            rating: 5,
            title: "Absolutely perfect fit!",
            content: "Bought this for my daughter's competition. The fit is immaculate and the material quality is top-notch. Highly recommend!",
            verified: true,
            helpful: 24
        },
        {
            id: 2,
            author: "Michael R.",
            date: "September 28, 2023",
            rating: 4,
            title: "Great quality, slightly pricey",
            content: "The construction is solid. It feels durable. Just wish it came in more color options.",
            verified: true,
            helpful: 8
        },
        {
            id: 3,
            author: "Emily W.",
            date: "August 15, 2023",
            rating: 5,
            title: "Best investment for riding",
            content: "I've tried many brands, but this one stands out. Comfortable for all-day wear.",
            verified: true,
            helpful: 12
        }
    ];

    const distribution = [
        { stars: 5, percent: 78 },
        { stars: 4, percent: 14 },
        { stars: 3, percent: 5 },
        { stars: 2, percent: 2 },
        { stars: 1, percent: 1 },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8">
            <h3 className="text-2xl font-display font-bold text-text mb-8">Customer Reviews</h3>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Summary Section */}
                <div className="lg:w-1/3 flex flex-col gap-6">
                    <div className="bg-gray-50 p-6 rounded-2xl text-center">
                        <span className="text-6xl font-black text-text block mb-2">4.8</span>
                        <div className="flex justify-center gap-1 mb-2 text-yellow-400 text-xl">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <p className="text-text-light font-medium">Based on 128 Reviews</p>
                    </div>

                    <div className="space-y-3">
                        {distribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-3 text-sm">
                                <span className="font-bold w-3">{item.stars}</span>
                                <FaStar className="text-yellow-400" />
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-yellow-400 rounded-full" 
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                                <span className="w-8 text-right text-text-light">{item.percent}%</span>
                            </div>
                        ))}
                    </div>

                    <button className="btn-premium w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
                        Write a Review
                    </button>
                </div>

                {/* Reviews List */}
                <div className="lg:w-2/3 space-y-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-600">
                                        {review.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text flex items-center gap-2">
                                            {review.author} 
                                            {review.verified && <FaCheckCircle className="text-green-500 text-xs" title="Verified Purchase"/>}
                                        </h4>
                                        <span className="text-xs text-text-light">{review.date}</span>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 text-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < review.rating ? "" : "text-gray-200"} />
                                    ))}
                                </div>
                            </div>

                            <h5 className="font-bold text-lg mb-2 text-text">{review.title}</h5>
                            <p className="text-text-light leading-relaxed mb-4">{review.content}</p>

                            <button className="flex items-center gap-2 text-xs text-text-light font-medium hover:text-primary transition-colors">
                                <FaThumbsUp /> Helpful ({review.helpful})
                            </button>
                        </div>
                    ))}

                    <button className="text-primary font-bold text-sm hover:underline underline-offset-4">
                        Load More Reviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;
