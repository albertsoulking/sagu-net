import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '@/data'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const starColors = ['text-red-400', 'text-orange-400', 'text-yellow-400', 'text-lime-400', 'text-green-400']

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="hero-glow top-1/2 -left-40 bg-primary-500 opacity-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6">
            <Quote className="w-4 h-4" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our Customers{' '}
            <span className="gradient-text">Say</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Hear from the communities and businesses we've connected across Myanmar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              renderBullet: (_index, className) =>
                `<span class="${className} !bg-primary-500 !w-3 !h-3 !rounded-full !opacity-50 [&.swiper-pagination-bullet-active]:!opacity-100"></span>`,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="!pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name}>
                <div className="glass rounded-2xl p-8 h-full relative group hover:border-primary-500/30 transition-all duration-300">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-primary-500/30 mb-4" />

                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/20',
                        )}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-white/60 leading-relaxed mb-6 min-h-[80px]">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-white/40">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
