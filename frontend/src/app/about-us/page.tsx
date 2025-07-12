import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs: React.FC = () => {
    return (
        <>

            <Header isPropertyPage={false} />

            <div className="w-full py-8">
                {/* Hero */}
                <div className="relative py-16">
                    {/* Image as background with lower z-index */}
                    <img
                        src="/images/cityscape.jpeg"
                        alt="Toronto cityscape"
                        className="absolute inset-0 object-cover w-full h-full z-0"
                    />

                    {/* Overlay for darkening */}
                    <div className="absolute inset-0 bg-gray-900 dark:bg-gray-100 opacity-50 z-10"></div>

                    {/* Content above image and overlay */}
                    <div className="relative max-w-4xl mx-auto px-6 text-center z-20">
                        <h1 className="text-4xl font-extrabold text-white dark:text-gray-900 mb-4">
                            About Us
                        </h1>
                        <p className="text-lg text-white dark:text-gray-600">
                            Making secure, affordable housing accessible for international students and newcomers.
                        </p>
                    </div>
                </div>


                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-gray-800 dark:text-gray-200">
                    <div className="space-y-4">
                        <p>
                            <span className="font-semibold">Cloud Accommodation</span> is a trusted monthly rental
                            platform designed to help international students and newcomers find secure and
                            affordable housing in Canada.
                        </p>
                        <p>
                            We make it easy to book accommodations from your home country by offering verified
                            listings, flexible lease terms, and personalized support every step of the way. Unlike
                            traditional rental platforms, we allow students to secure their housing by paying only a
                            security deposit upfront — rent is paid directly to the landlord upon arrival, ensuring
                            transparency and peace of mind.
                        </p>
                        <p>
                            Our mission is to simplify your relocation process with instant booking options, 24/7
                            customer assistance, and a growing network of trusted property partners. Whether you’re
                            a student, working professional, or landlord, Cloud Accommodation is here to make your
                            rental experience smooth, safe, and stress-free.
                        </p>
                    </div>

                    <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <h2 className="text-2xl font-bold">What Sets Us Apart</h2>
                        <p>
                            With Cloud Accommodation, you can search verified listings, connect with responsive
                            support agents, and book your new home confidently — all before you arrive in Canada. We
                            partner with landlords who value transparency and fairness, giving you peace of mind
                            that your housing is secure and ready when you need it.
                        </p>
                    </div>

                    <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <h2 className="text-2xl font-bold">Our Promise</h2>
                        <p>
                            We promise to provide trustworthy rental solutions, clear terms, and friendly assistance
                            at every step. Our goal is to make your transition to life in Canada as easy as
                            possible.
                        </p>
                    </div>

                    <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <h2 className="text-2xl font-bold">Join Our Community</h2>
                        <p>
                            Thousands of students, professionals, and landlords trust Cloud Accommodation. Whether
                            you’re looking for your first Canadian apartment or want to list your property for
                            reliable tenants, we’re here to help.
                        </p>
                        <p>
                            Have questions? Reach out to our support team anytime at{' '}
                            <a
                                href="mailto:info@cloudaccommodation.com"
                                className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                                info@cloudaccommodation.com
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
