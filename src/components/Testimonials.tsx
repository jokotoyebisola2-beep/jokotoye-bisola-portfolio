import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { Testimonial } from '../types';
import { cmsService } from '../lib/cmsService';

export const Testimonials: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const unsub = cmsService.subscribeReviews(
      (data) => {
        if (!isMounted) return;
        // Strictly filter ONLY published reviews
        const published = data.filter((r) => r.status === 'published');
        setReviewsList(published);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching reviews from Firestore:', err);
        if (isMounted) setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  return (
    <section id="reviews" className="py-20 bg-slate-50/80 text-[#111827] relative">
      <div id="testimonials" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Reviews
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            What clients say about working with Jokotoye Bisola.
          </p>
        </div>

        {/* Loading State: Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs animate-pulse space-y-4"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-slate-200 rounded-full"></div>
                  ))}
                </div>
                <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                <div className="h-4 bg-slate-200 rounded-md w-5/6"></div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded-md w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviewsList.length === 0 ? (
          /* Empty State Placeholder */
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto mb-4">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-1">
              No Published Reviews Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified client testimonials will appear here as soon as they are approved in the CMS.
            </p>
          </div>
        ) : (
          /* Reviews Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsList.map((t, index) => {
              const clientName = t.author || (t as any).clientName || (t as any).name || 'Verified Client';
              const position = t.role || (t as any).position || '';
              const company = t.company || '';
              const photo = t.avatar || (t as any).photo || (t as any).photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(clientName)}&background=2563EB&color=fff`;
              const text = t.quote || (t as any).testimonialText || (t as any).content || (t as any).text || '';
              const rating = t.rating ?? 5;

              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-blue-200 transition-all"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Review Content */}
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-6">
                      "{text}"
                    </p>
                  </div>

                  {/* Client Meta */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                    <img
                      src={photo}
                      alt={clientName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">{clientName}</h3>
                      {(position || company) && (
                        <p className="text-xs text-slate-500 font-medium">
                          {position}{position && company ? ', ' : ''}{company}
                        </p>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
