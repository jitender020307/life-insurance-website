import type { Service, Testimonial, FAQ } from '@/types';

export const services: Service[] = [
  {
    id: 'term-life',
    slug: 'term-life',
    name: 'Term Life Insurance',
    shortDescription: 'Affordable coverage for a specific period. Perfect for protecting your family during critical years.',
    fullDescription: 'Term life insurance provides straightforward, affordable protection for a set period—typically 10, 20, or 30 years. It\'s ideal for covering temporary financial obligations like mortgages, education costs, or income replacement during your working years. With fixed premiums and a guaranteed death benefit, term life offers peace of mind without the complexity or cost of permanent policies.',
    icon: 'shield-check',
    features: [
      'Fixed premiums for the entire term',
      'Coverage amounts from $50,000 to $10M+',
      'Term lengths: 10, 15, 20, 25, 30 years',
      'Convertible to permanent coverage',
      'No medical exam options available',
      'Accelerated death benefit rider included',
    ],
    benefits: [
      'Most affordable life insurance option',
      'Simple to understand and purchase',
      'Covers specific financial responsibilities',
      'Can be layered with other policies',
      'Options to convert without new medical exam',
    ],
    faqs: [
      {
        question: 'What happens when my term ends?',
        answer: 'You can renew the policy (at a higher rate), convert to permanent coverage, or let it expire. We\'ll notify you well in advance to discuss options.',
      },
      {
        question: 'Can I increase my coverage later?',
        answer: 'Yes, many policies offer guaranteed insurability riders that let you increase coverage at specific life events without additional medical underwriting.',
      },
      {
        question: 'Is a medical exam required?',
        answer: 'For coverage up to $1M, we offer accelerated underwriting that may not require an exam. Higher amounts typically require a brief paramedical exam.',
      },
    ],
    ctaText: 'Get a Term Life Quote',
    ctaLink: '/quote?product=term',
  },
  {
    id: 'whole-life',
    slug: 'whole-life',
    name: 'Whole Life Insurance',
    shortDescription: 'Lifetime coverage with guaranteed cash value growth. A financial asset that builds value over time.',
    fullDescription: 'Whole life insurance provides permanent coverage that lasts your entire life, as long as premiums are paid. It builds guaranteed cash value that grows tax-deferred and can be accessed during your lifetime. Premiums are fixed and never increase. It\'s both protection and a financial asset—ideal for estate planning, wealth transfer, and creating a legacy.',
    icon: 'infinity',
    features: [
      'Lifetime coverage—never expires',
      'Guaranteed cash value accumulation',
      'Fixed premiums that never increase',
      'Tax-deferred growth',
      'Dividend eligible (participating policies)',
      'Policy loans at competitive rates',
    ],
    benefits: [
      'Permanent protection for loved ones',
      'Builds equity you can access',
      'Predictable, stable premiums',
      'Tax-advantaged wealth transfer',
      'Can fund retirement or emergencies',
      'Creditor protection in many states',
    ],
    faqs: [
      {
        question: 'How does cash value work?',
        answer: 'A portion of each premium goes into a cash value account that grows at a guaranteed rate. You can borrow against it or surrender the policy for the accumulated value.',
      },
      {
        question: 'Are dividends guaranteed?',
        answer: 'Dividends are not guaranteed but many companies have paid them consistently for over 100 years. They can be used to reduce premiums, buy more coverage, or taken as cash.',
      },
      {
        question: 'Can I pay off my policy early?',
        answer: 'Yes, options like 10-pay, 20-pay, or paid-up at 65 let you complete premium payments in a set timeframe while keeping lifetime coverage.',
      },
    ],
    ctaText: 'Explore Whole Life',
    ctaLink: '/quote?product=whole',
  },
  {
    id: 'universal-life',
    slug: 'universal-life',
    name: 'Universal Life Insurance',
    shortDescription: 'Flexible permanent coverage with adjustable premiums and death benefits. Adapt as your life changes.',
    fullDescription: 'Universal life insurance offers permanent coverage with the flexibility to adjust your premiums and death benefit as your needs change. Cash value earns interest based on current market rates (with a guaranteed minimum). You can increase or decrease coverage, skip payments if cash value covers costs, and access funds when needed.',
    icon: 'sliders-horizontal',
    features: [
      'Adjustable premiums and death benefit',
      'Cash value earns competitive interest',
      'Guaranteed minimum interest rate',
      'Flexible payment options',
      'Transparent cost structure',
      'Multiple funding options',
    ],
    benefits: [
      'Adapt coverage to life changes',
      'Potential for higher cash value growth',
      'Pay more when you can, less when needed',
      'Access cash value for opportunities',
      'Estate planning flexibility',
    ],
    faqs: [
      {
        question: 'How is interest credited?',
        answer: 'Interest is credited monthly based on the insurer\'s general account portfolio performance, with a guaranteed floor (typically 2-3%).',
      },
      {
        question: 'What if I miss a payment?',
        answer: 'If you have sufficient cash value, the policy can pay premiums from the account. You\'ll receive notifications before the policy lapses.',
      },
      {
        question: 'Can I increase my death benefit?',
        answer: 'Yes, subject to underwriting. You can typically increase the death benefit at any time with evidence of insurability.',
      },
    ],
    ctaText: 'Learn About Universal Life',
    ctaLink: '/quote?product=universal',
  },
  {
    id: 'indexed-universal',
    slug: 'indexed-universal',
    name: 'Indexed Universal Life',
    shortDescription: 'Market-linked growth potential with downside protection. Participate in market gains without market losses.',
    fullDescription: 'Indexed Universal Life (IUL) credits interest based on the performance of a market index (like the S&P 500) with a guaranteed 0% floor—your cash value never decreases due to market downturns. Caps and participation rates determine upside potential. It combines death benefit protection with strong cash accumulation potential for retirement income planning.',
    icon: 'chart-bar',
    features: [
      '0% floor—no market loss risk',
      'Upside potential linked to market indexes',
      'Multiple index options available',
      'Tax-free retirement income potential',
      'Flexible premiums and death benefit',
      'Living benefits riders available',
    ],
    benefits: [
      'Participate in market gains, avoid losses',
      'Tax-advantaged retirement supplement',
      'Lock in gains annually',
      'Access cash value tax-free via loans',
      'Legacy planning with income benefits',
    ],
    faqs: [
      {
        question: 'What indexes are available?',
        answer: 'Common options include S&P 500, Nasdaq-100, Euro Stoxx 50, and blended indexes. You can allocate across multiple indexes.',
      },
      {
        question: 'What are caps and participation rates?',
        answer: 'A cap limits maximum credited interest (e.g., 10%). Participation rate determines what percentage of index gain is credited (e.g., 80% of a 10% gain = 8% credited).',
      },
      {
        question: 'Is it good for retirement income?',
        answer: 'Yes, IUL can provide tax-free income via policy loans in retirement. The cash value continues growing while you access funds.',
      },
    ],
    ctaText: 'Discover IUL Benefits',
    ctaLink: '/quote?product=indexed',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Mother of Two',
    company: 'Chicago, IL',
    content: 'The process was incredibly smooth. I got a $500K term policy in under 20 minutes—no medical exam needed. The rates were half of what other companies quoted. My family is protected, and I have peace of mind.',
    rating: 5,
    productType: 'term',
  },
  {
    id: '2',
    name: 'Robert Chen',
    role: 'Business Owner',
    company: 'Austin, TX',
    content: 'I needed a policy that could grow with my business. The whole life policy builds cash value I can borrow against for opportunities. My agent explained everything clearly—no pressure, just options.',
    rating: 5,
    productType: 'whole',
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Retired Teacher',
    company: 'Phoenix, AZ',
    content: 'At 62, I thought my options were limited. The team found me an affordable universal life policy that fits my fixed income. The living benefits rider gives me confidence if I ever need long-term care.',
    rating: 5,
    productType: 'universal',
  },
  {
    id: '4',
    name: 'James Patterson',
    role: 'Financial Advisor',
    company: 'Denver, CO',
    content: 'I recommend this company to all my clients. The IUL product is competitive, the underwriting is fair, and the service team is responsive. It\'s rare to find an insurer that treats advisors as true partners.',
    rating: 5,
    productType: 'indexed',
  },
];

export const companyStats = [
  { label: 'Policies Active', value: '125,000+' },
  { label: 'Claims Paid (2023)', value: '$2.4B+' },
  { label: 'Customer Satisfaction', value: '98%' },
  { label: 'Years in Business', value: '45+' },
  { label: 'Financial Strength Rating', value: 'A+ (A.M. Best)' },
];

export const trustBadges = [
  { name: 'A.M. Best', rating: 'A+ Superior' },
  { name: 'Standard & Poor\'s', rating: 'AA Very Strong' },
  { name: 'Moody\'s', rating: 'Aa2 Excellent' },
  { name: 'Fitch', rating: 'AA Very Strong' },
  { name: 'BBB', rating: 'A+ Accredited' },
];

export const generalFAQs: FAQ[] = [
  {
    question: 'How much life insurance do I need?',
    answer: 'A common rule is 10-15x your annual income, but the right amount depends on your debts, dependents, income replacement needs, and goals. Our quote tool helps calculate your ideal coverage.',
  },
  {
    question: 'What affects my premium?',
    answer: 'Age, health, gender, tobacco use, coverage amount, term length, and policy type all factor in. The younger and healthier you are, the lower your rate.',
  },
  {
    question: 'Can I have multiple policies?',
    answer: 'Absolutely. Many people layer term policies for different needs (mortgage, income replacement, education) and add permanent coverage for lifetime needs.',
  },
  {
    question: 'How long does approval take?',
    answer: 'With accelerated underwriting, many applicants get instant decisions. Traditional underwriting with exams typically takes 2-4 weeks.',
  },
  {
    question: 'What if my health changes after I buy?',
    answer: 'Your premiums and coverage are locked in. Health changes after purchase never affect your policy—even if you develop a serious condition.',
  },
  {
    question: 'Are life insurance proceeds taxable?',
    answer: 'Death benefits are generally income-tax-free to beneficiaries. Cash value growth is tax-deferred. Loans against cash value are tax-free if the policy stays in force.',
  },
];