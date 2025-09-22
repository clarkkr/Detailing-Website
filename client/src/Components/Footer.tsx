export default function Footer() {
  return (
    <footer className="bg-[var(--color-card)] text-[var(--color-text)] py-4 mt-8 border-t border-[var(--color-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
}
