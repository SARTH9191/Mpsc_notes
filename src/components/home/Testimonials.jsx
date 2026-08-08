import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import bgAsset from "../../assets/testimonials-bg.png";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const { t, isMarathi } = useLanguage();

  const testimonials = [
    {
      quote: isMarathi 
        ? "ExamVault च्या MPSC सामान्य अध्ययन नोट्समुळे माझी रिव्हिजन खूप वेगाने झाली. राज्यशास्त्र व महाराष्ट्राचा इतिहास अतिशय उत्कृष्टपणे मांडला आहे."
        : "ExamVault notes made my revision much faster. Everything is organized topic-wise with clear mind maps for Maharashtra History and Geography.",
      author: isMarathi ? "प्रिया शर्मा" : "Priya Sharma",
      role: isMarathi ? "MPSC राज्यसेवा परीक्षार्थी" : "MPSC Aspirant",
      exam: "MPSC",
      rating: 5
    },
    {
      quote: isMarathi
        ? "पोलीस भरती मराठी व्याकरण व सामान्य ज्ञान ट्रिक्समुळे मला परीक्षेत उत्कृष्ट गुण मिळाले. थेट ५०% सवलतीमध्ये पीडीएफ डाउनलोड मिळाल्याने खूप फायदा झाला."
        : "Police Bharti Marathi grammar notes helped me secure top rank. Instant PDF download with 50% discount was super helpful.",
      author: isMarathi ? "राहुल पाटील" : "Rahul Patil",
      role: isMarathi ? "पोलीस भरती परीक्षार्थी" : "Police Bharti Aspirant",
      exam: "Police Bharti",
      rating: 5
    },
    {
      quote: isMarathi
        ? "तलाठी भरती TCS पॅटर्नच्या नोट्स अतिशय उपयुक्त ठरल्या. ५०+ सराव प्रश्नसंच व वाक्प्रचार तक्ता अप्रतिम आहे."
        : "Talathi Bharti TCS pattern notes were extremely useful. 50+ practice sets and vocabulary guide saved a lot of time.",
      author: isMarathi ? "स्नेहा कुलकर्णी" : "Sneha Kulkarni",
      role: isMarathi ? "तलाठी भरती परीक्षार्थी" : "Talathi Aspirant",
      exam: "Talathi",
      rating: 5
    }
  ];

  return (
    <section 
      className="relative py-16 text-white border-b border-slate-800 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/90 px-3 py-1 rounded-full border border-blue-800/80">
            {isMarathi ? "विद्यार्थ्यांचे अभिप्राय" : "Student Testimonials"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight drop-shadow-md">
            {t("testimonialsTitle")}
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl mx-auto">
            {t("testimonialsSub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 flex flex-col justify-between hover:border-slate-600 transition-all relative shadow-xl"
            >
              <Quote className="w-8 h-8 text-blue-400/50 mb-3" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                "{item.quote}"
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{item.author}</div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
