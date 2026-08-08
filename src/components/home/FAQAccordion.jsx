import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import bgAsset from "../../assets/faq-accordion-bg.png";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t, isMarathi } = useLanguage();

  const faqs = isMarathi ? [
    {
      q: "नोट्स कशा खरेदी कराव्यात?",
      a: "बाजारपेठ किंवा परीक्षा श्रेणीमधून तुमच्या पसंतीच्या नोट्स निवडा, 'आता खरेदी करा' वर क्लिक करा, UPI, कार्ड किंवा नेट बँकिंगद्वारे पेमेंट पूर्ण करा आणि तुम्हाला लगेच पीडीएफ डाउनलोड मिळेल."
    },
    {
      q: "खरेदी करण्यापूर्वी मी नोट्सचे पूर्ववलोकन पाहू शकतो का?",
      a: "होय! कोणत्याही नोट्स कार्डवरील 'पूर्ववलोकन पहा' बटणावर क्लिक करून तुम्ही ३ ते ५ नमुना पृष्ठे, अनुक्रमणिका व गुण वैशिष्ट्ये पाहू शकता."
    },
    {
      q: "पेमेंटच्या कोणत्या पद्धती उपलब्ध आहेत?",
      a: "आमच्या प्लॅटफॉर्मवर UPI (Google Pay, PhonePe, Paytm, BHIM), क्रेडिट/डेबिट कार्ड व नेट बँकिंग द्वारे सुरक्षित पेमेंट करता येते."
    },
    {
      q: "पेमेंट केल्यानंतर मला नोट्स कधी मिळतील?",
      a: "पेमेंट यशस्वी होताच तुम्हाला त्वरित पेमेंट यशस्वी आणि पीडीएफ डाउनलोड पृष्ठावर नेले जाईल. तसेच तुम्ही तुमच्या विद्यार्थी खात्यातून कधीही नोट्स डाउनलोड करू शकता."
    },
    {
      q: "खरेदी केलेल्या नोट्स मी पुन्हा डाउनलोड करू शकतो का?",
      a: "होय! सर्व खरेदी केलेल्या नोट्सना आजीवन अमर्याद प्रवेश मिळतो. तुमच्या प्रोफाईलमध्ये 'माझ्या खरेदी' पर्यायामध्ये नोट्स नेहमी उपलब्ध राहतील."
    },
    {
      q: "नोट्स मोबाईलवर वाचता येतात का?",
      a: "होय! सर्व पीडीएफ नोट्स मोबाईल, टॅब्लेट, लॅपटॉप व ई-इंक रीडरवर अत्यंत सुलभपणे वाचण्यासाठी डिझाइन केल्या आहेत."
    }
  ] : [
    {
      q: "How do I purchase notes?",
      a: "Browse the Marketplace or Exam categories, select your desired note, click 'Buy Now', complete the payment via UPI, Card, or Net Banking, and your download will be unlocked instantly."
    },
    {
      q: "Can I preview notes before purchasing?",
      a: "Yes! Click the 'Preview' button on any note card to open our interactive PDF viewer containing 3 to 5 sample pages with table of contents and topic highlights."
    },
    {
      q: "What payment methods are supported?",
      a: "Our platform supports payments via UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, and Net Banking."
    },
    {
      q: "When can I download my notes?",
      a: "Immediately after completing payment, you will be redirected to the Payment Success and Download page."
    },
    {
      q: "Can I access purchased notes again in the future?",
      a: "Yes! All purchased notes come with lifetime digital access under 'My Purchases'."
    },
    {
      q: "Are the notes available on mobile?",
      a: "Yes! All ExamVault PDF notes are optimized for viewing on mobile devices, tablets, and laptops."
    }
  ];

  return (
    <section 
      className="relative py-16 text-white border-b border-slate-800 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/90 px-3 py-1 rounded-full border border-blue-800/80">
            {t("faqTitle")}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight drop-shadow-md">
            {isMarathi ? "तुमच्या सर्व शंकांचे निरसन" : "Got Questions? We Have Answers."}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {t("faqSub")}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-700/80 overflow-hidden shadow-lg transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-white text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-800/60 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800 leading-relaxed bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
