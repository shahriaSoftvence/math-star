import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 px-4 bg-[#fbfbfd] text-black">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-gray-800 text-2xl md:text-4xl font-bold font-Quicksand leading-10">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-base md:text-xl font-normal font-Open_Sans leading-7 mt-4">Find answers to common questions about MathStar.</p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Are there any age regulations for Math Star? </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>Yes, Math Star is safe for children of any age. However, for legal reasons, you must be older than 16 years to sign up for Math Star.
                Children under the age of 16 must use an account created by their parents.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is Math Star for free? </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>Yes and no. You can create an account for free and use the addition area without any payments. However, to unlock the subtraction, multiplication and division areas you must have a subscription.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How does a Math Star subscription work? </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>By subscribing you get access to all Math Star features for one month. You can renew your subscription manually or choose our automatic renewal service.
                Subscription can only be made by users of legal age and in accordance with the guidelines of our financial provider Stripe.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I cancel a subscription? </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>Subscriptions end automatically after one month. You do not have to cancel! If you have activated our automatic renewal service, simply turn it off with one click and your subscription runs out at the end of your current one-month plan.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I track …?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>Yes, the dashboard provides a progress overview and insights into your child ’s learning journey. Our star rewards show you how many stars your child has collected. Each star represents one correct answer.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>What devices …?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>Math Star works on any device with a web browser, including desktops, laptops, tablets, and smartphones. For the best experience, however, we recommend devices with a larger screen.</p>
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