import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Simplify Payments for Recovery Houses
              </h1>
              <p className="text-xl mb-8 text-mutedForeground">
                RecoveryPay streamlines bed fee collection, resident management, and financial tracking for recovery houses of all sizes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-primary text-white rounded-md text-center font-medium hover:bg-primaryHover transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/dashboard/demo"
                  className="px-6 py-3 bg-card border border-border text-foreground rounded-md text-center font-medium hover:bg-muted transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 z-10 rounded-lg"></div>
              <Image
                src="/dashboard-preview.jpg"
                alt="RecoveryPay Dashboard Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Designed for Recovery Houses</h2>
            <p className="text-xl text-mutedForeground max-w-2xl mx-auto">
              Our platform is built specifically for the unique needs of recovery houses and sober living environments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Simplified Payments</h3>
              <p className="text-mutedForeground">
                Accept payments via multiple methods including credit cards, ACH transfers, and cash tracking.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Resident Management</h3>
              <p className="text-mutedForeground">
                Track resident information, payment history, and stay duration all in one place.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Financial Insights</h3>
              <p className="text-mutedForeground">
                Generate reports on occupancy rates, payment trends, and financial performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Trusted by Recovery Houses</h2>
            <p className="text-xl text-mutedForeground max-w-2xl mx-auto">
              See what recovery house operators are saying about RecoveryPay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">John Doe</h4>
                  <p className="text-mutedForeground">Director, New Beginnings Recovery</p>
                </div>
              </div>
              <p className="text-mutedForeground italic">
                "RecoveryPay has transformed how we manage our finances. We've reduced late payments by 75% and saved hours of administrative work each week."
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Sarah Johnson</h4>
                  <p className="text-mutedForeground">Owner, Serenity House Network</p>
                </div>
              </div>
              <p className="text-mutedForeground italic">
                "As we expanded to multiple houses, RecoveryPay made it possible to maintain financial oversight without adding administrative staff. It's been a game-changer."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to simplify your recovery house operations?</h2>
          <p className="text-xl text-mutedForeground mb-8 max-w-2xl mx-auto">
            Join hundreds of recovery houses that trust RecoveryPay to manage their finances and resident payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-6 py-3 bg-primary text-white rounded-md text-center font-medium hover:bg-primaryHover transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-card border border-border text-foreground rounded-md text-center font-medium hover:bg-muted transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
