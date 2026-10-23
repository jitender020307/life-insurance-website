'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline';

interface TestimonialsProps {
  autoPlay?: boolean;
  interval?: number;
}

export function Testimonials({ autoPlay = true, interval = 5000 }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play
  useEffect(() => {
    if (typeof window !== 'undefined' && autoPlay) {
      const timer = setInterval(next, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, next]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-secondary-50" aria-label="Customer testimonials">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
            Trusted by Families Nationwide
          </h2>
          <p className="mt-4 text-lg text-secondary-600">
            Hear from real customers who found peace of mind with LifeSecure
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="h-full bg-white">
                    <CardContent className="p-8">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={cn(
                              'h-5 w-5',
                              i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-secondary-200'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg md:text-xl text-secondary-700 leading-relaxed mb-6">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{testimonial.name}</p>
                          <p className="text-sm text-secondary-500">{testimonial.role}</p>
                          {testimonial.company && (
                            <p className="text-sm text-secondary-400">{testimonial.company}</p>
                          )}
                        </div>
                        {testimonial.productType && (
                          <span className="ml-auto px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                            {testimonial.productType}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 p-0"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-secondary-300 hover:bg-secondary-400'
                  )}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 p-0"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
