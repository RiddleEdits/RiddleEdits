/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Work from './components/Work';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Work />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
