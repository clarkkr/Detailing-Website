import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "../Components/ServiceCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <motion.section
        className="bg-[var(--color-card)] text-center py-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)]">
          Premium Mobile Detailing at Your Doorstep
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-[var(--color-muted)]">
          We bring the shine to you — anywhere, anytime. Book a detail today and
          give your car the care it deserves.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-2xl bg-[var(--color-primary)] text-white font-medium shadow hover:opacity-90 transition"
          >
            Book an Appointment
          </Link>
          <Link
            to="/gallery"
            className="px-6 py-3 rounded-2xl border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-hover)] transition"
          >
            Previous Jobs
          </Link>
        </div>
      </motion.section>

      {/* Services Preview */}
      <motion.section
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Services
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Interior Detailing"
            desc="Anywhere from basic interior cleaning to restoring your car to brand new!"
            link="/services/interior"
          />
          <ServiceCard
            title="Exterior Detailing"
            desc="Thorough wash, wax, and polish to restore your car’s showroom shine."
            link="/services/exterior"
          />
          <ServiceCard
            title="Full Service"
            desc="Interior + exterior packages for the ultimate detail experience."
            link="/services/full"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="max-w-5xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-6">About Me</h2>
        <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl mx-auto">
          Hello! My name is Kory Clark and I have been detailing cars for give
          or take 5 years now. I enjoy the work of turning something used into
          something that looks brand new again! I understand that people can't
          always leave their car some place for a day or two to have it cleaned
          and that's why I will come to you!
          <br />
          <br />
          Whether it’s restoring your interior, giving your paint a much needed
          shine, or preparing your car for a special event, I take pride in
          delivering results that make you fall in love with your vehicle all
          over again.
        </p>
      </motion.section>

      {/* Gallery Preview */}
      <motion.section
        className="bg-[var(--color-card)] py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-center mb-10">
          Recent Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <div className="h-48 bg-gray-300 rounded-2xl"></div>
          <div className="h-48 bg-gray-300 rounded-2xl"></div>
          <div className="h-48 bg-gray-300 rounded-2xl"></div>
        </div>
        <div className="text-center mt-6">
          <Link
            to="/gallery"
            className="text-[var(--color-primary)] hover:underline"
          >
            View Full Gallery →
          </Link>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="text-center py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Get Started or Have Questions?
        </h2>
        <p className="text-lg text-[var(--color-muted)] mb-6">
          If you have any questions feel free to contact me here!
        </p>
        <Link
          to="/contact"
          className="px-8 py-3 rounded-2xl bg-[var(--color-primary)] text-white font-medium shadow hover:opacity-90 transition"
        >
          Book Now
        </Link>
      </motion.section>
    </div>
  );
}
