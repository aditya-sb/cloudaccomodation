"use client"

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const AboutUs: React.FC = () => {
    return (
        <>
            <Header isPropertyPage={false} />

            {/* How It Works Section */}
            <div className="w-full py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How it works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We are with you at every step of your journey!</p>
                    </div>

                    <div className="space-y-10 lg:space-y-12">
                        {/* Step 1: Browse Verified Listings */}
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto border rounded-lg ">
                            <div className="w-60 h-60 rounded-xl flex items-center justify-center flex-shrink-0">
                                <img src="/images/icons/map.svg" alt="Verified Listings" />
                            </div>
                            <div className="flex-1 max-w-2xl text-center lg:text-left">
                                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">Browse Verified Listings</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Explore a variety of apartments listed on our platform and pick one that suits your
                                    requirements. If the available options don't meet your expectations, we'll help you find
                                    an apartment based on your preferences.
                                </p>
                            </div>
                        </div>

                        {/* Step 2: Pay Security Deposit */}
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto border rounded-lg ">
                            <div className="w-60 h-60 rounded-xl flex items-center justify-center flex-shrink-0">
                                <img src="/images/icons/hiw3.svg" alt="Verified Listings" />
                            </div>
                            <div className="flex-1 max-w-2xl text-center lg:text-left">

                                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">Pay a Security Deposit & Get Your Paperwork Done</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Once you find the right place, pay a security deposit to reserve it. We'll also help you
                                    complete the necessary paperwork to make your booking official and smooth.
                                </p>
                            </div>

                        </div>

                        {/* Step 3: Get Confirmation */}
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto border rounded-lg ">
                            <div className="w-60 h-60 rounded-xl flex items-center justify-center flex-shrink-0">
                                <img src="/images/icons/hiw1.svg" alt="Verified Listings" />
                            </div>
                            <div className="flex-1 max-w-2xl text-center lg:text-left">
                                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">Get Confirmation Instantly</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Once your apartment is finalized, we'll begin handling the paperwork for you.
                                    This includes signing the lease agreement and may require payment for the first month's
                                    rent along with other charges such as a one-time application fee.
                                </p>
                            </div>
                        </div>

                        {/* Step 4: Move In */}
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-5xl mx-auto border rounded-lg ">
                            <div className="w-60 h-60 rounded-xl flex items-center justify-center flex-shrink-0">
                                <img src="/images/icons/hiw2.svg" alt="Verified Listings" />
                            </div>
                            <div className="flex-1 max-w-2xl text-center lg:text-left">
                                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">Move In with Confidence</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    When you arrive in Canada, pay the remaining rent directly to the owner or property
                                    manager. You'll also get 24/7 support from our team whenever you need help.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* Get in Touch Section */}
            <div className="w-full py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-lg text-gray-600 mb-12">If you have any queries, feel free to contact us</p>

                    <div className="flex max-w-xl mx-auto flex-row items-center justify-between">
                        {/* Phone */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-800 font-medium">+1 4372887804</p>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col items-center">
                            <Link href="mailto:cloudaccommodation@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email us">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            </Link>
                            <p className="text-sm text-gray-800 font-medium">Email us</p>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex flex-col items-center">
                            <Link href="https://wa.me/14372887804" // Replace with your actual WhatsApp number
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Chat on WhatsApp">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                </div>
                            </Link>
                            <p className="text-sm text-gray-800 font-medium">Chat on WhatsApp</p>
                        </div>

                        {/* Website Chat */}
                        {/* <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-800 font-medium">Chat on Website</p>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="text-center max-sm:px-4 mb-16 mt-16">
                <h2 className="text-3xl font-bold mb-2">See what students say</h2>
                <p className="text-gray-600 mb-12">Preferred place for booking housing by students all across the globe :)</p>

                <div className="flex max-w-6xl  mx-auto md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-4">
                    {/* Testimonial 1 */}
                    <div className="flex-shrink-0 w-80 md:w-auto bg-gray-100 p-6 rounded-lg">
                        <p className="italic mb-4">"Experience was amazing!!! I’m going to University of British Columbia. Great prices & the rent duration are negotiable. Also as an art student I do appreciate the website design — it’s clear, visible & well placed."</p>
                        <div className="flex items-center gap-4">
                            <img src="/images/test1.svg" alt="Karan Singh" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">Karan Singh</p>
                                <p className="text-sm text-gray-500">University of British Columbia</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="flex-shrink-0 w-80 md:w-auto bg-gray-100 p-6 rounded-lg">
                        <p className="italic mb-4">"The best service I could ask for. Awesome, great follow-up services that helped me throughout the process from start to the end. Thanks to cloud accommodation for a great facility!"</p>
                        <div className="flex items-center gap-4">
                            <img src="/images/test2.svg" alt="Sheetal Bahuguna" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">Sheetal Bahuguna</p>
                                <p className="text-sm text-gray-500">University of Waterloo</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="flex-shrink-0 w-80 md:w-auto bg-gray-100 p-6 rounded-lg">
                        <p className="italic mb-4">"I am going to study at Seneca and Saurabh from Cloud accommodation did an excellent job in helping me. I do not have doubt to recommend Saurabh as a student helper. I hope to receive his help in future. The room is in an excellent location."</p>
                        <div className="flex items-center gap-4">
                            <img src="/images/test3.svg" alt="Akash Sharma" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold">Akash Sharma</p>
                                <p className="text-sm text-gray-500">Seneca College</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => window.open('https://ca.trustpilot.com/review/cloudaccomodation.com', '_blank')} className="mt-8 px-6 py-2 border border-gray-400 rounded">Read Reviews</button>
            </div>

            <Footer />
        </>
    );
};

export default AboutUs;
