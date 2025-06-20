import  { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What kind of products do you sell?",
    answer:
      "We offer a wide range of eCommerce products including electronics, fashion, beauty, accessories, and home decor items — all at affordable prices.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse our site, click 'Add to Cart' on your desired product, then proceed to checkout. You can create an account or log in to complete your order.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept M-Pesa, debit/credit cards, and bank transfers. All payments are secure and encrypted.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery within Nairobi takes 1–2 days. Outside Nairobi, expect delivery within 2–4 business days.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes. You can return or exchange items within 7 days if they’re unused and in original condition. Contact support to initiate a return.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After placing an order, you’ll receive SMS or email updates with tracking information until your item is delivered.",
  },
  {
    question: "Do you offer discounts or promotions?",
    answer:
      "Yes! We run seasonal discounts, flash sales, and exclusive offers. Subscribe to our newsletter or follow us on social media to stay updated.",
  },
  {
    question: "Is it safe to shop on your website?",
    answer:
      "Absolutely. Our site is protected with SSL encryption and secure payment gateways to ensure safe shopping.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>FAQs | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Find answers to common questions about orders, payments, delivery, and returns when shopping at Smart Indoor Decors."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/faq" />
      </Helmet>

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition font-medium text-gray-800"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 bg-white text-gray-700 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
