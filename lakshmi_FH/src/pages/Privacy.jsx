import React from "react";
import SEOWrapper from "../components/SEOWrapper";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEOWrapper
        title="Privacy Policy"
        description="Privacy Policy for Lakshmi Function Hall. How we collect, use, and protect your personal information."
      />

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10 text-center">
          Last updated: November 2, 2025
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to <strong>Lakshmi Function Hall</strong> (“we”, “us”, “our”). We
              operate the website{" "}
              <a
                href="https://lakshmifunctionhall.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                https://lakshmifunctionhall.netlify.app/
              </a>{" "}
              (the “Website”) in connection with our function-hall services located at{" "}
              <strong>Ramakrishnanager, BuchiReddyPalem, Nellore, Andhra Pradesh, India</strong>.
              This Privacy Policy describes how we collect, use, disclose, and safeguard
              your personal information when you visit our Website or engage with us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-3">2. Information We Collect</h2>
            <div className="pl-4 border-l-2 border-indigo-100 space-y-4">
              <div>
                <p className="font-semibold text-gray-900">a. Personal Information you provide:</p>
                <p>
                  When you contact us, make a booking or fill in our enquiry form, we
                  may collect: your name, email address, phone number, event date,
                  number of guests, billing/payment information, and any other
                  event-related details you choose to provide.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">b. Automatically Collected Information:</p>
                <p>
                  When you visit our Website, we may collect certain information
                  automatically: your device IP address, browser type, pages you
                  visit, time and date of visit, referral URL, and other analytics data.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Process your booking/enquiry and communicate with you.</li>
              <li>Provide the services you request (event coordination, billing, confirmations).</li>
              <li>Improve and personalise our Website and services.</li>
              <li>Send you marketing communications (only if you have opted in).</li>
              <li>Comply with legal and regulatory obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-3">4. Information Sharing</h2>
            <p>
              We will not sell your personal information to third parties. We may
              share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>Service providers who assist us (payment processors, event vendors);</li>
              <li>Legal or regulatory authorities if required by law;</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal information. To exercise these rights, please contact us:</p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4 border border-gray-200">
              <p><strong>Email:</strong> Lakshmifunctionhall@gmail.com</p>
              <p><strong>Phone:</strong> +91 79818 62253</p>
              <p><strong>Address:</strong> Ramakrishnanager, BuchiReddyPalem, Nellore, A.P.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-indigo-700 mb-3">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us using the details above.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
