"use client"
import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const FAQSection = () => {
  return (
    <section className="py-10 md:py-20 font-manrope bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
          <div>
            <p className="text-[#595959] font-inter mb-3 md:mb-4 text-sm md:text-base">
              FAQ'S
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-5xl max-w-[267px] text-[#171717] font-semibold mb-6 md:mb-10 leading-[1.3]">
              Frequently Asked Questions
            </h2>
            <p className="text-[#595959] text-sm md:text-[16px] font-inter mb-3 md:mb-4">
              Ask any questions
            </p>
            <div className="text-[#5945FD] text-xl md:text-[32px] font-semibold font-inter hover:underline">
              <a href="mailto:support@nivesh.com">support@nivesh.com</a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full text-[#171717]">
              {[
                {
                  value: "item-1",
                  question: "How does the investment plan work?",
                  answer: "Each plan offers a fixed monthly return based on the amount you invest. Returns are credited directly to your wallet every month, and you can track all activities in real time."
                },
                {
                  value: "item-2",
                  question: "What is the maximum amount I can transfer?",
                  answer: "The maximum transfer amount depends on your plan tier. Basic plans allow up to ₹50,000 per transaction, while Premium and Pro plans allow up to ₹5,00,000 per transaction with unlimited monthly transfers."
                },
                {
                  value: "item-3",
                  question: "How do I update my account information?",
                  answer: "You can update your account information by logging into your dashboard, clicking on your profile in the top right corner, and selecting 'Account Settings.' From there, you can update your personal information, change your password, or modify your payment methods."
                },
                {
                  value: "item-4",
                  question: "Are there any benefits for frequent users?",
                  answer: "Yes, we offer loyalty rewards for our frequent users. After 6 months of continuous investment, you become eligible for our VIP program which includes higher returns, priority customer service, and exclusive investment opportunities not available to regular users."
                },
                {
                  value: "item-5",
                  question: "Can I access my account from multiple devices?",
                  answer: "Yes, you can access your Nivesh Returns account from multiple devices. We have web, iOS, and Android apps available. All your account information is synchronized across devices in real-time, allowing you to manage your investments from anywhere."
                }
              ].map((item) => (
                <AccordionItem key={item.value} value={item.value} className="border-t">
                  <AccordionTrigger className="text-lg md:text-2xl font-medium py-4 md:py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#595959] text-sm md:text-base font-inter">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection