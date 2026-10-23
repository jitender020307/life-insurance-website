import { Hero } from '@/components/layout/Hero';
import { CTASection } from '@/components/layout/CTASection';
import { TrustBar } from '@/components/layout/TrustBar';
import { companyStats, trustBadges } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/Card';
import { ShieldCheckIcon, UsersIcon, TrophyIcon, GlobeAltIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: 'Transparency First',
      description: 'No hidden fees, no fine print surprises. We explain every detail in plain language so you know exactly what you\'re getting.',
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: 'People Over Policies',
      description: 'Our salaried agents don\'t work on commission. They\'re here to find the right fit for you—not to hit a sales quota.',
    },
    {
      icon: <TrophyIcon className="h-6 w-6" />,
      title: 'Financial Strength',
      description: 'We partner only with carriers rated A or higher by A.M. Best. Your policy is backed by the industry\'s strongest balance sheets.',
    },
    {
      icon: <GlobeAltIcon className="h-6 w-6" />,
      title: 'Nationwide Coverage',
      description: 'Licensed in all 50 states and D.C. Wherever life takes you, your coverage goes with you—no gaps, no hassles.',
    },
    {
      icon: <ChartBarIcon className="h-6 w-6" />,
      title: 'Technology-Driven',
      description: 'Our proprietary platform compares rates in real-time across 30+ carriers, delivering accurate quotes in seconds.',
    },
    {
      icon: <CheckCircleIcon className="h-6 w-6" />,
      title: 'Customer Obsessed',
      description: '98% customer satisfaction isn\'t a metric—it\'s our standard. We\'re not happy until you\'re completely confident in your coverage.',
    },
  ];

  const milestones = [
    { year: '1979', title: 'Founded', description: 'Started as a family agency in New York with a mission to make life insurance accessible.' },
    { year: '1995', title: 'National Expansion', description: 'Expanded to all 50 states, becoming a licensed national insurance provider.' },
    { year: '2008', title: 'Digital Pioneer', description: 'Launched one of the industry\'s first online quote platforms with real-time carrier rates.' },
    { year: '2015', title: 'Accelerated Underwriting', description: 'Introduced no-exam underwriting for coverage up to $1M, revolutionizing the application process.' },
    { year: '2020', title: '100K Policies', description: 'Surpassed 100,000 active policies, protecting families across every state.' },
    { year: '2024', title: 'AI-Powered Matching', description: 'Launched intelligent carrier matching that finds the optimal policy for each unique profile.' },
  ];

  const leadership = [
    { name: 'Sarah Johnson', role: 'CEO & President', bio: '25+ years in insurance leadership. Former Chief Actuary at a Fortune 500 carrier.' },
    { name: 'Michael Chen', role: 'Chief Technology Officer', bio: 'Built scalable platforms at fintech unicorns. Passion for insurance accessibility.' },
    { name: 'Emily Rodriguez', role: 'Chief Operating Officer', bio: 'Operations expert with deep experience in policy administration and claims.' },
    { name: 'David Park', role: 'Chief Distribution Officer', bio: 'Grew agency networks nationwide. Champion of agent empowerment and education.' },
  ];

  return (
    <>
      <Hero variant="about" />

      <section className="py-20 bg-white" aria-labelledby="mission-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 id="mission-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
                Our Mission: Life Insurance Made Simple
              </h2>
              <div className="mt-8 space-y-6 text-lg text-secondary-600">
                <p>
                  For over 40 years, LifeSecure has been guided by a simple belief: protecting your family\'s future shouldn\'t be complicated, expensive, or stressful.
                </p>
                <p>
                  We started as a small family agency in New York, helping neighbors navigate the confusing world of life insurance. Today, we\'ve helped over 125,000 families across all 50 states—but our approach hasn\'t changed.
                </p>
                <p>
                  We combine the personal touch of a local agent with the power of modern technology. Our platform compares real-time rates from 30+ top-rated carriers, and our licensed agents are always just a call away—no commission, no pressure.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-1">
                <div className="h-full bg-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl font-bold mb-2">45+</div>
                    <div className="text-xl text-primary-200">Years Protecting Families</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary-50" aria-labelledby="values-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="values-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              These principles guide every decision we make—from the carriers we partner with to the way we treat every customer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} hover className="h-full">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">{value.title}</h3>
                  <p className="text-secondary-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white" aria-labelledby="history-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="history-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              Four decades of innovation, growth, and unwavering commitment to our customers.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary-200 -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-8">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 border-4 border-white ring-2 ring-primary-600 z-10" />
                  <div className={index % 2 === 0 ? 'w-1/2 pr-8 text-right' : 'w-1/2 pl-8 ml-auto'}>
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <div className="text-2xl font-bold text-primary-600 mb-1">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-1">{milestone.title}</h3>
                      <p className="text-secondary-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-secondary-50" aria-labelledby="leadership-heading">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="leadership-heading" className="text-3xl md:text-4xl font-heading font-bold text-secondary-900">
              Leadership Team
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              Experienced professionals dedicated to modernizing life insurance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex h-24 w-24 mx-auto mb-4 items-center justify-center rounded-full bg-primary-100 text-primary-600 text-2xl font-bold">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold text-secondary-900">{leader.name}</h3>
                  <p className="text-sm text-primary-600 font-medium">{leader.role}</p>
                  <p className="mt-3 text-sm text-secondary-600">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Trust */}
      <section className="py-20 bg-secondary-900" aria-labelledby="stats-heading">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-secondary-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-secondary-800">
            <h3 className="text-xl font-semibold text-white text-center mb-8">Financial Strength Ratings</h3>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {trustBadges.map((badge) => (
                <div key={badge.name} className="flex flex-col items-center text-center">
                  <span className="font-semibold text-white">{badge.name}</span>
                  <span className="text-primary-400 font-medium">{badge.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection variant="quote" />
    </>
  );
}
