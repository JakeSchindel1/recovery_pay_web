import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us - RecoveryPay",
  description: "Learn about our mission to simplify recovery house management and our team.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">About RecoveryPay</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">
            RecoveryPay is a comprehensive management system designed specifically for recovery houses, 
            sober living homes, and rehabilitation centers. Our mission is to simplify the financial 
            aspects of running recovery facilities, allowing operators to focus on what matters most: 
            helping residents on their journey to recovery.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Our Story</h2>
          <p className="mb-6">
            Founded in 2023, RecoveryPay was born from the recognition that recovery house operators 
            face unique challenges in managing resident payments, tracking occupancy, and maintaining 
            financial records. Our team, with backgrounds in both recovery services and software development, 
            set out to create a solution that addresses these specific needs.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Our Mission</h2>
          <p className="mb-6">
            We believe that recovery houses play a vital role in the continuum of care for individuals 
            overcoming addiction. Our mission is to provide these essential facilities with the tools 
            they need to operate efficiently, maintain financial stability, and ultimately support more 
            individuals on their recovery journey.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">What Sets Us Apart</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Purpose-Built:</strong> Designed specifically for recovery houses, not a generic 
              payment system adapted to fit.
            </li>
            <li>
              <strong>Comprehensive:</strong> Manages payments, residents, houses, and reporting in one 
              integrated platform.
            </li>
            <li>
              <strong>User-Friendly:</strong> Intuitive interface that requires minimal training to use 
              effectively.
            </li>
            <li>
              <strong>Secure:</strong> Built with industry-leading security practices to protect sensitive 
              resident information.
            </li>
            <li>
              <strong>Supportive:</strong> Backed by a team that understands the recovery house ecosystem 
              and is committed to your success.
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Our Team</h2>
          <p className="mb-6">
            RecoveryPay is built by a dedicated team of professionals who are passionate about supporting 
            the recovery community. Our team includes individuals in recovery, former recovery house 
            operators, and experienced software developers who understand both the technical and human 
            aspects of our mission.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Contact Us</h2>
          <p className="mb-6">
            We'd love to hear from you! Whether you have questions about our platform, need support, 
            or want to share feedback, our team is here to help.
          </p>
          <p className="mb-6">
            Email: <a href="mailto:info@recoverypay.com" className="text-primary hover:underline">info@recoverypay.com</a><br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
} 