import Link from "next/link";

export const metadata = {
  title: "Pricing - RecoveryPay",
  description: "Choose the right plan for your recovery house management needs.",
};

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Simple, Transparent Pricing</h1>
          <p className="text-xl text-mutedForeground max-w-2xl mx-auto">
            Choose the plan that's right for your recovery house operation, with no hidden fees or long-term contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Basic Plan */}
          <div className="border border-border rounded-lg overflow-hidden bg-card md:self-start">
            <div className="p-6">
              <h3 className="text-lg font-medium text-foreground">Basic</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-foreground">$49</span>
                <span className="ml-1 text-xl text-mutedForeground">/month</span>
              </div>
              <p className="mt-4 text-mutedForeground">Perfect for small recovery houses managing up to 10 residents.</p>
            </div>
            <div className="px-6 pt-6 pb-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Up to 10 residents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">1 recovery house</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Payment processing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Basic reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Email support</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/signup"
                  className="block w-full bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primaryHover transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="border-2 border-primary rounded-lg overflow-hidden bg-card relative md:scale-110 md:-mt-4 md:-mb-4 md:z-10 shadow-xl">
            <div className="absolute top-0 inset-x-0 bg-primary text-white text-xs font-semibold text-center py-1">
              MOST POPULAR
            </div>
            <div className="p-6 pt-8">
              <h3 className="text-xl font-bold text-foreground">Standard</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-foreground">$99</span>
                <span className="ml-1 text-xl text-mutedForeground">/month</span>
              </div>
              <p className="mt-4 text-mutedForeground">Ideal for growing recovery house operations with multiple houses.</p>
            </div>
            <div className="px-6 pt-6 pb-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Up to 30 residents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Up to 3 recovery houses</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Payment processing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Advanced reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Priority email & phone support</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/signup"
                  className="block w-full bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primaryHover transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border border-border rounded-lg overflow-hidden bg-card md:self-start">
            <div className="p-6">
              <h3 className="text-lg font-medium text-foreground">Premium</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-foreground">$199</span>
                <span className="ml-1 text-xl text-mutedForeground">/month</span>
              </div>
              <p className="mt-4 text-mutedForeground">For established recovery house networks with multiple locations.</p>
            </div>
            <div className="px-6 pt-6 pb-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Unlimited residents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Unlimited recovery houses</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Reduced payment processing fees</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">Custom reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3 text-foreground">24/7 priority support</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/signup"
                  className="block w-full bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primaryHover transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Can I switch plans later?</h3>
              <p className="text-mutedForeground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Is there a setup fee?</h3>
              <p className="text-mutedForeground">No, there are no setup fees or hidden charges. You only pay the monthly subscription fee.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Do you offer a free trial?</h3>
              <p className="text-mutedForeground">Yes, we offer a 14-day free trial on all plans so you can experience the full benefits of RecoveryPay before committing.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-foreground">What payment methods do you accept?</h3>
              <p className="text-mutedForeground">We accept all major credit cards, including Visa, Mastercard, American Express, and Discover.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-card border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Need a custom solution?</h2>
          <p className="text-lg mb-6 text-mutedForeground max-w-2xl mx-auto">
            We offer custom enterprise solutions for large recovery house networks with specific requirements.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primaryHover transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
} 