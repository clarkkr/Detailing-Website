import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  desc: string;
  link: string;
};

export default function ServiceCard({ title, desc, link }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={link}
        className="block bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-2xl p-6 shadow hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
      >
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-[var(--color-muted)] mb-4">{desc}</p>
        <span className="text-[var(--color-primary)] font-medium hover:underline">
          Learn More →
        </span>
      </Link>
    </motion.div>
  );
}
