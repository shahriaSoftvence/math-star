import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getDictionary } from '../../actions/dictionaries';

const FaqSection = async () => {
  const { homepage } = await getDictionary();

  const faqData = [
    {
      question: homepage.faq.questions[0].question,
      answer: homepage.faq.questions[0].answer
    },
    {
      question: homepage.faq.questions[1].question,
      answer: homepage.faq.questions[1].answer
    },
    {
      question: homepage.faq.questions[2].question,
      answer: homepage.faq.questions[2].answer
    },
    {
      question: homepage.faq.questions[3].question,
      answer: homepage.faq.questions[3].answer
    },
    {
      question: homepage.faq.questions[4].question,
      answer: homepage.faq.questions[4].answer
    },
    {
      question: homepage.faq.questions[5].question,
      answer: homepage.faq.questions[5].answer
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-[#fbfbfd] text-black">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-gray-800 text-2xl md:text-4xl font-bold font-Quicksand leading-10">
            {homepage.faq.title}
          </h2>
          <p className="text-gray-600 text-base md:text-xl font-normal font-Open_Sans leading-7 mt-4">
            {homepage.faq.description}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full my-8"
          defaultValue="item-1"
        >
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <p className="text-gray-600 text-base font-normal font-Open_Sans leading-normal">
            {homepage.faq.support_text}
          </p>
          <Link href="/contact">
            <button className="mt-4 px-6 py-3 bg-blue-500 rounded-lg text-white text-base font-normal font-Open_Sans leading-normal hover:bg-blue-600 transition-colors">
              {homepage.faq.support_button}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;