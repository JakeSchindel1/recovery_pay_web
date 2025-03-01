import Link from 'next/link';

export const metadata = {
  title: "Pricing - RecoveryPay",
  description: "Choose the right plan for your recovery house management needs.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" style={{ animationDuration: '8s' }}></div>
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Simple Plans for Every <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Recovery House</span>
            </h1>
            <p className="text-xl text-mutedForeground max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your needs. All plans include our core features with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-12 relative">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="group bg-card/30 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary/60 to-blue-500/60"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Starter</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-foreground">$99</span>
                  <span className="text-mutedForeground ml-2">/month</span>
                </div>
                <p className="text-mutedForeground mb-8">Perfect for small recovery houses with up to 10 residents.</p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Up to 10 residents",
                    "Payment processing",
                    "Basic reporting",
                    "Email support",
                    "Mobile app access"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/signup?plan=starter"
                  className="group relative w-full px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-foreground rounded-xl text-center font-medium hover:bg-white/20 transition-all duration-300 inline-block overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                  <span className="relative">Get Started</span>
                </Link>
              </div>
            </div>
            
            {/* Professional Plan */}
            <div className="group bg-gradient-to-b from-primary/5 to-background backdrop-blur-md rounded-3xl border border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 relative transform scale-105 z-10">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary to-blue-500"></div>
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-lg">MOST POPULAR</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Professional</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-foreground">$199</span>
                  <span className="text-mutedForeground ml-2">/month</span>
                </div>
                <p className="text-mutedForeground mb-8">Ideal for growing recovery houses with up to 25 residents.</p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Up to 25 residents",
                    "Advanced payment processing",
                    "Comprehensive reporting",
                    "Priority email support",
                    "Mobile app access",
                    "Resident portal",
                    "Automated payment reminders"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/signup?plan=professional"
                  className="group relative w-full px-6 py-3 bg-primary text-white rounded-xl text-center font-medium transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 inline-block overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300 transform group-hover:translate-y-full"></span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Get Started</span>
                </Link>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="group bg-card/30 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 relative">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary/60 to-blue-500/60"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Enterprise</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-foreground">$399</span>
                  <span className="text-mutedForeground ml-2">/month</span>
                </div>
                <p className="text-mutedForeground mb-8">For large recovery house networks with unlimited residents.</p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited residents",
                    "Advanced payment processing",
                    "Custom reporting",
                    "24/7 phone & email support",
                    "Mobile app access",
                    "Resident portal",
                    "Automated payment reminders",
                    "Multi-house management",
                    "API access",
                    "Dedicated account manager"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/signup?plan=enterprise"
                  className="group relative w-full px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-foreground rounded-xl text-center font-medium hover:bg-white/20 transition-all duration-300 inline-block overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                  <span className="relative">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Compare Plans
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Feature Comparison</h2>
            <p className="text-lg text-mutedForeground max-w-2xl mx-auto">
              See which plan is right for your recovery house.
            </p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-foreground">Feature</th>
                    <th className="px-6 py-4 text-center text-foreground">Starter</th>
                    <th className="px-6 py-4 text-center text-foreground bg-primary/5">Professional</th>
                    <th className="px-6 py-4 text-center text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Residents", starter: "Up to 10", professional: "Up to 25", enterprise: "Unlimited" },
                    { feature: "Houses", starter: "1", professional: "Up to 3", enterprise: "Unlimited" },
                    { feature: "Payment Processing", starter: "Basic", professional: "Advanced", enterprise: "Advanced" },
                    { feature: "Reporting", starter: "Basic", professional: "Comprehensive", enterprise: "Custom" },
                    { feature: "Support", starter: "Email", professional: "Priority Email", enterprise: "24/7 Phone & Email" },
                    { feature: "Mobile App", starter: "✓", professional: "✓", enterprise: "✓" },
                    { feature: "Resident Portal", starter: "✗", professional: "✓", enterprise: "✓" },
                    { feature: "Payment Reminders", starter: "✗", professional: "✓", enterprise: "✓" },
                    { feature: "Multi-house Management", starter: "✗", professional: "Limited", enterprise: "✓" },
                    { feature: "API Access", starter: "✗", professional: "✗", enterprise: "✓" },
                    { feature: "Dedicated Account Manager", starter: "✗", professional: "✗", enterprise: "✓" }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="px-6 py-4 text-foreground font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-mutedForeground">{row.starter}</td>
                      <td className="px-6 py-4 text-center text-mutedForeground bg-primary/5">{row.professional}</td>
                      <td className="px-6 py-4 text-center text-mutedForeground">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-mutedForeground max-w-2xl mx-auto">
              Find answers to common questions about our pricing and plans.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a setup fee?",
                answer: "No, there are no setup fees for any of our plans. You only pay the monthly subscription fee."
              },
              {
                question: "Do you offer a free trial?",
                answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to start."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, ACH transfers, and PayPal."
              },
              {
                question: "Is there a contract or commitment?",
                answer: "No, all plans are month-to-month with no long-term commitment. You can cancel anytime."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card/30 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-foreground">{faq.question}</h3>
                <p className="text-mutedForeground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" style={{ animationDuration: '15s' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-4xl px-4 text-center relative">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Get Started Today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to transform your recovery house?</h2>
          <p className="text-xl text-mutedForeground mb-10 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/signup"
              className="group relative px-8 py-4 bg-primary text-white rounded-xl text-center font-medium transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300 transform group-hover:translate-y-full"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center">
                Start Free Trial
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="/contact"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-foreground rounded-xl text-center font-medium hover:bg-white/20 transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
              <span className="relative flex items-center justify-center">
                Contact Sales
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 