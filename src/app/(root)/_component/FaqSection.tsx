import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 px-4 bg-[#fbfbfd] text-black">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-gray-800 text-4xl font-bold font-Quicksand leading-10">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-xl font-normal font-Open_Sans leading-7 mt-4">Find answers to common questions about MathStar.</p>
        </div>
      
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Is MathStar suitable for children with different learning abilities?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>Yes! MathStar&apos;s adaptive learning adjusts to your child&apos;s pace, making it great for all abilities.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How much time should my child spend on MathStar each day?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>We recommend 15-20 minutes daily for consistent progress without screen fatigue.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Does MathStar align with school curriculum standards?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>Absolutely. Our content is designed by teachers to align with common elementary school math curricula.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I track my child&apos;s progress and see what they&apos;re learning?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>Yes, the parent dashboard provides detailed progress reports and insights into your child&apos;s learning journey.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What devices can MathStar be used on?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>MathStar works on any device with a web browser, including desktops, laptops, tablets, and smartphones.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
       
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