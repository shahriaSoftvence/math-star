import React from 'react';
import FaqItem from './FaqItem';
import Link from 'next/link';

const faqData = [
  { 
    question: "Is MathStar suitable for children with different learning abilities?", 
    answer: "Yes! MathStar&apos;s adaptive learning adjusts to your child&apos;s pace, making it great for all abilities." 
  },
  { 
    question: "How much time should my child spend on MathStar each day?", 
    answer: "We recommend 15-20 minutes daily for consistent progress without screen fatigue." 
  },
  { 
    question: "Does MathStar align with school curriculum standards?", 
    answer: "Absolutely. Our content is designed by teachers to align with common elementary school math curricula." 
  },
  { 
    question: "Can I track my child&apos;s progress and see what they&apos;re learning?", 
    answer: "Yes, the parent dashboard provides detailed progress reports and insights into your child&apos;s learning journey." 
  },
  { 
    question: "What devices can MathStar be used on?", 
    answer: "MathStar works on any device with a web browser, including desktops, laptops, tablets, and smartphones." 
  },
];


const FaqSection : React.FC = () => {
  return (
    <section id="faq" className="py-24 px-4 bg-[#fbfbfd] text-black">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-gray-800 text-4xl font-bold font-Quicksand leading-10">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-xl font-normal font-Open_Sans leading-7 mt-4">Find answers to common questions about MathStar.</p>
        </div>
        <div className="w-full mt-12 flex flex-col gap-4">
          {faqData.map(item => <FaqItem key={item.question} {...item} />)}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">Still have questions? We are here to help!</p>
          <Link href="/contact"><button className="mt-4 px-6 py-3 bg-blue-500 rounded-lg text-white text-base font-normal font-Open_Sans leading-normal hover:bg-blue-600 transition-colors">
            Contact Support
          </button></Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;