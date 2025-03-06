import Link from "next/link";

export const metadata = {
  title: "About Us - RecoveryPay",
  description: "Learn about our mission to simplify recovery house management and our team.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" style={{ animationDuration: '10s' }}></div>
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Revolutionizing Recovery House <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Financial Management</span>
            </h1>
            <p className="text-xl text-mutedForeground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how recovery houses manage their finances, empowering them to focus on what matters most—helping residents on their journey to recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/90 to-blue-600/80 rounded-3xl shadow-2xl transform rotate-y-12 rotate-x-12 transition-transform duration-500">
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
                
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-white text-center">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                    <p className="text-white/90 text-lg leading-relaxed max-w-md mx-auto">
                      To provide recovery houses with innovative financial tools that streamline operations, increase collection rates, and ultimately help more people on their recovery journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Why We Started</h2>
              <p className="text-lg text-mutedForeground mb-6 leading-relaxed">
                Our founder, a recovery house operator, experienced firsthand the challenges of managing finances while trying to provide quality care. Existing financial tools weren&apos;t designed for the unique needs of recovery houses.
              </p>
              <p className="text-lg text-mutedForeground mb-8 leading-relaxed">
                We built RecoveryPay to solve these challenges, creating a platform specifically designed for the recovery community that combines payment processing, resident management, and financial analytics in one intuitive system.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card/30 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-mutedForeground">Recovery houses using our platform</div>
                </div>
                <div className="bg-card/30 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <div className="text-4xl font-bold text-primary mb-2">98.5%</div>
                  <div className="text-mutedForeground">Average collection rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">What Drives Us</h2>
            <p className="text-lg text-mutedForeground max-w-2xl mx-auto">
              Our core values guide everything we do, from product development to customer support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Empathy First",
                description: "We understand the challenges recovery houses face and build solutions with their specific needs in mind.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                )
              },
              {
                title: "Innovation",
                description: "We continuously develop new features and improvements based on feedback from our community.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                )
              },
              {
                title: "Reliability",
                description: "Our platform is built to be dependable, secure, and available when you need it most.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                )
              }
            ].map((value, index) => (
              <div key={index} className="group bg-card/30 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-blue-500/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {value.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                <p className="text-mutedForeground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Meet The Innovators</h2>
            <p className="text-lg text-mutedForeground max-w-2xl mx-auto">
              Our diverse team combines expertise in recovery, finance, and technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "John Smith", role: "Founder & CEO", image: "/team/placeholder.png" },
              { name: "Sarah Johnson", role: "Chief Technology Officer", image: "/team/placeholder.png" },
              { name: "Michael Brown", role: "Head of Customer Success", image: "/team/placeholder.png" },
              { name: "Emily Davis", role: "Lead Product Designer", image: "/team/placeholder.png" }
            ].map((member, index) => (
              <div key={index} className="group bg-card/30 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="h-48 bg-gradient-to-br from-primary/80 to-blue-500/80 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                  <p className="text-mutedForeground">{member.role}</p>
                </div>
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
            Join Our Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to transform your recovery house?</h2>
          <p className="text-xl text-mutedForeground mb-10 max-w-2xl mx-auto">
            Join hundreds of recovery houses already using our platform to streamline their operations and boost their collection rates to 98.5% or higher.
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
                Contact Us
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