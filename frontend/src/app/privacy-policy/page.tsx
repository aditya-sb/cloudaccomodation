import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Header isPropertyPage={false} />
      <div className="w-full py-8">
                {/* Hero */}
                <div className="relative py-16">
                    {/* Image as background with lower z-index */}
                    <img
                        src="/images/bg1.jpg"
                        alt="Toronto cityscape"
                        className="absolute inset-0 object-cover w-full h-full z-0"
                    />

                    {/* Overlay for darkening */}
                    <div className="absolute inset-0 bg-gray-900 dark:bg-gray-100 opacity-50 z-10"></div>

                    {/* Content above image and overlay */}
                    <div className="relative max-w-4xl mx-auto px-6 text-center z-20">
                        <h1 className="text-4xl font-extrabold text-white dark:text-gray-900 mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-white dark:text-gray-600">
                            How we handle your personal information when you book accommodation online.
                        </p>
                    </div>
                </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 text-gray-800 dark:text-gray-200">
        {/* Intro */}
        <div className="space-y-4">
          <p>
            At <span className="font-semibold">cloud accommodation</span>, your privacy matters to us.
            This Privacy Policy explains how we collect, use, and protect your personal information
            when you use our platform to book accommodation online from anywhere.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold">1. Information We Collect</h2>
          <p>
            We may collect personal information you provide directly, such as your name, email
            address, phone number, payment details, and booking information. We also gather
            information automatically via cookies and similar tools to improve your experience.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
          <p>
            We use your information to process bookings, communicate with you, improve our services,
            comply with legal obligations, and prevent fraud.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold">3. Sharing Your Information</h2>
          <p>
            We never sell your personal data. We may share it with trusted partners like
            accommodation providers, payment processors, or service providers as required to
            deliver our services.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold">4. Data Security</h2>
          <p>
            We use industry-standard security measures to protect your data. However, please note no
            online method is 100% secure.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. Contact us if
            you wish to exercise these rights.
          </p>
        </div>

        {/* Section 6 */}
        <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated effective date.
          </p>
        </div>

        {/* Section 7 */}
        <div className="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold">7. Contact Us</h2>
          <p>
            For any questions about this Privacy Policy, please contact us at{' '}
            <a
              href="mailto:privacy@yourcompany.com"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              privacy@yourcompany.com
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

export default PrivacyPolicy;
