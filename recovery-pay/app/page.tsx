import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/40 to-primary/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" style={{ animationDuration: '12s' }}></div>
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-8 border border-primary/20">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                Trusted by 500+ Recovery Houses
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Next-Gen <br />Payment Platform
              </h1>
              <p className="text-xl mb-10 text-mutedForeground/90 leading-relaxed">
                Harness AI-powered financial tools designed specifically for recovery houses. Streamline operations, automate payments, and gain predictive insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
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
                  href="/dashboard/demo"
                  className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-foreground rounded-xl text-center font-medium hover:bg-white/20 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                  <span className="relative flex items-center justify-center">
                    View Live Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              </div>
              
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-blue-500/80 flex items-center justify-center text-white text-xs font-bold border-2 border-background">
                      {['JD', 'SJ', 'MK', 'AR'][i-1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-mutedForeground">
                  <span className="font-semibold text-foreground">+200</span> recovery houses onboarded this month
                </div>
              </div>
            </div>
            
            <div className="relative h-[600px] perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/90 to-blue-600/80 rounded-3xl shadow-2xl transform rotate-y-12 rotate-x-12 group-hover:rotate-y-0 transition-transform duration-500">
                <div className="absolute inset-0 backdrop-blur-sm bg-black/10 rounded-3xl">
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                      <rect width="100" height="100" fill="url(#grid)"/>
                    </svg>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-full max-w-md">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="text-white">
                          <div className="text-lg font-bold">Dashboard</div>
                          <div className="text-xs text-white/70">Financial Overview</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                        <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <div className="text-white/70 text-sm mb-1">Collection Rate</div>
                        <div className="text-white text-2xl font-bold">98.5%</div>
                        <div className="mt-2 flex items-center text-emerald-300 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +2.4% from last month
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <div className="text-white/70 text-sm mb-1">Time Saved</div>
                        <div className="text-white text-2xl font-bold">15hrs/wk</div>
                        <div className="mt-2 flex items-center text-emerald-300 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          +3.2hrs from last month
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-white font-medium">Payment Analytics</div>
                        <div className="text-white/70 text-xs">Last 30 days</div>
                      </div>
                      <div className="h-32 flex items-end justify-between">
                        {[40, 65, 50, 80, 60, 85, 70, 90].map((height, i) => (
                          <div key={i} className="w-6 bg-gradient-to-t from-blue-500/80 to-primary/80 rounded-sm" style={{ height: `${height}%` }}></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                      <div className="text-white font-medium mb-4">Recent Payments</div>
                      <div className="space-y-3">
                        {[
                          { name: 'John D.', amount: '$750', date: 'Today' },
                          { name: 'Sarah M.', amount: '$750', date: 'Yesterday' },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-white/20 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
                                {item.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-white text-sm">{item.name}</div>
                                <div className="text-white/70 text-xs">{item.date}</div>
                              </div>
                            </div>
                            <div className="text-white font-medium">{item.amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              AI-Powered Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Intelligent Financial Tools</h2>
            <p className="text-xl text-mutedForeground max-w-2xl mx-auto">
              Our platform leverages cutting-edge technology to automate and optimize your recovery house operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Payment Processing",
                description: "AI-powered payment reconciliation with fraud detection and automated receipt generation.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                )
              },
              {
                title: "Digital Resident Portal",
                description: "Biometric verification, personalized payment schedules, and automated communication.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                )
              },
              {
                title: "Predictive Analytics",
                description: "ML-driven forecasting for occupancy rates, cash flow projections, and financial planning.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                )
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-card/30 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-blue-500/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-mutedForeground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/features" className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
              Explore all features
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Trusted by Industry Leaders</h2>
            <p className="text-xl text-mutedForeground max-w-2xl mx-auto">
              See how recovery houses are transforming their operations with our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "John Doe",
                role: "Director, New Beginnings Recovery",
                initials: "JD",
                quote: "RecoveryPay has transformed how we manage our finances. We've reduced late payments by 75% and saved hours of administrative work each week."
              },
              {
                name: "Sarah Johnson",
                role: "Owner, Serenity House Network",
                initials: "SJ",
                quote: "As we expanded to multiple houses, RecoveryPay made it possible to maintain financial oversight without adding administrative staff. It's been a game-changer."
              }
            ].map((testimonial, index) => (
              <div key={index} className="group bg-card/30 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-blue-500/80 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-primary/20">
                    <span className="text-white font-bold text-xl">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
                    <p className="text-mutedForeground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <svg className="absolute -top-4 -left-2 w-10 h-10 text-primary/20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-mutedForeground text-lg leading-relaxed pl-6">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" style={{ animationDuration: '15s' }}></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/40 to-primary/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" style={{ animationDuration: '10s' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-4xl px-4 text-center relative">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to transform your recovery house?</h2>
          <p className="text-xl text-mutedForeground mb-10 max-w-2xl mx-auto">
            Join the growing community of recovery houses using our platform to streamline their operations.
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
                Talk to Sales
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
