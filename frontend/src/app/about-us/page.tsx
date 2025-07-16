"use client"

import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhyChooseCarousel from '../components/WhyChooseCarousel';

const AboutUs: React.FC = () => {
    return (
        <>

            <Header isPropertyPage={false} />

            <div className="w-full py-8">
                {/* Hero */}
                <div className="relative mt-[-300px] h-[900px]">
                    {/* Image as background with lower z-index */}
                    <img
                        src="/images/background.jpg"
                        alt="Toronto cityscape"
                        className="absolute object-cover w-full h-full z-0"
                    />
                </div>

                <div>
                    <img src="/images/about-us2.svg" alt="" className="w-full max-sm:hidden"/>
                    <img src="/images/aboutMobile2.png" alt="" className="w-full max-sm:block hidden"/>

                </div>
                <div>
                    <img src="/images/about-us3.svg" alt="" className="w-full max-sm:hidden"/>
                    <div className="flex text-blue-600 absolute mt-3 items-center justify-center">
                        <span className="text-[40px] font-bold text-center hidden max-sm:block">What's waiting for you?</span>
                    </div>
                    <img src="/images/aboutMobile3.svg" alt="" className="w-full max-sm:block hidden"/>
                </div>
                <WhyChooseCarousel />
                <div className="px-8 py-16">
                    {/* Testimonials */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-2">See what students say</h2>
                        <p className="text-gray-600 mb-12">Preferred place for booking housing by students all across the globe :)</p>

                        <div className="flex max-w-5xl mx-auto md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-4">
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


                    {/* Refer & Earn */}
                    <div className="flex max-w-5xl mx-auto flex-col md:flex-row items-center justify-between bg-gradient-to-t from-red-100 to-white border border-red-300 border-[4px] px-20 pt-12 rounded-xl relative overflow-hidden">
                        <div className="mb-8 md:mb-0 md:w-1/2">
                            <h3 className="text-2xl font-bold mb-4">Refer & Earn with Cloud Accommodation!</h3>
                            <p className="mb-6 text-gray-700">
                                Refer your friends to book their housing through us. They enjoy hassle-free accommodation, and you earn 50 Canadian dollars.
                            </p>
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Refer now</button>
                        </div>
                        <div className="relative md:w-2/5 max-sm:hidden">
                            <div className="absolute -bottom-[400px] -right-2/3 z-0">
                                <div className="h-[700px] w-[700px] rounded-full border-4 border-red-300"></div>
                            </div>
                            <div className="absolute -bottom-[500px] -right-[250px] z-0">
                                <div className="h-[700px] w-[700px] rounded-full border-4 border-red-300"></div>
                            </div>
                            <div className="absolute -bottom-[600px] -right-[250px] z-0">
                                <div className="h-[700px] w-[700px] rounded-full border-4 border-red-300"></div>
                            </div>
                            <img src="/images/mobile.svg" alt="Refer illustration" className="w-full max-w-xs mx-auto md:mx-0 relative z-10" />
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
