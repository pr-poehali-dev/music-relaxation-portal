import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Работы", href: "#works" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contact" },
];

const SERVICES = [
  {
    icon: "Layers",
    title: "Дизайн",
    desc: "Создаём визуальные системы, которые остаются в памяти. От логотипа до UI/UX.",
    num: "01",
  },
  {
    icon: "Code2",
    title: "Разработка",
    desc: "Сайты и приложения с чистым кодом, высокой скоростью и вниманием к деталям.",
    num: "02",
  },
  {
    icon: "Sparkles",
    title: "Стратегия",
    desc: "Анализируем рынок, выстраиваем позиционирование и помогаем расти бизнесу.",
    num: "03",
  },
];

const STATS = [
  { value: "120+", label: "Проектов" },
  { value: "8", label: "Лет опыта" },
  { value: "96%", label: "Довольных клиентов" },
  { value: "24ч", label: "Ответ на запрос" },
];

const WORKS = [
  { title: "Бренд / e-commerce", tag: "Ребрендинг", year: "2024" },
  { title: "Веб-платформа", tag: "Разработка", year: "2024" },
  { title: "Мобильное приложение", tag: "Дизайн + Код", year: "2023" },
  { title: "Корпоративный сайт", tag: "Под ключ", year: "2023" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const services = useInView();
  const stats = useInView();
  const works = useInView();
  const about = useInView();

  return (
    <div className="min-h-screen bg-[#0D0D0D] font-golos text-[#F0EAD8] overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-radial from-[#C9A84C]/6 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-[#C9A84C]/4 via-transparent to-transparent blur-3xl" />
      </div>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5" : "py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-cormorant font-light tracking-[0.2em] text-[#F0EAD8]">
              СТУДИЯ
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] group-hover:scale-150 transition-transform" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-widest uppercase text-[#F0EAD8]/50 hover:text-[#C9A84C] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-[#C9A84C]/40 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-300"
          >
            Связаться
          </a>

          {/* Burger */}
          <button
            className="md:hidden text-[#F0EAD8]/60 hover:text-[#C9A84C] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/5 py-6 px-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-[#F0EAD8]/60 hover:text-[#C9A84C] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-center py-3 border border-[#C9A84C]/40 text-[#C9A84C] text-sm tracking-widest uppercase"
            >
              Связаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-20 z-10">
        <div className="max-w-6xl mx-auto w-full">
          {/* Tag */}
          <div className="animate-fade-up opacity-0-init flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C]/80">Цифровая студия</span>
          </div>

          {/* Headline */}
          <h1 className="font-cormorant font-light leading-[0.95] mb-8">
            <span
              className="block text-[clamp(3.5rem,10vw,9rem)] opacity-0-init animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Мы делаем
            </span>
            <span
              className="block text-[clamp(3.5rem,10vw,9rem)] text-gradient-gold opacity-0-init animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              выдающиеся
            </span>
            <span
              className="block text-[clamp(3.5rem,10vw,9rem)] opacity-0-init animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              продукты.
            </span>
          </h1>

          {/* Sub */}
          <div
            className="opacity-0-init animate-fade-up flex flex-col md:flex-row md:items-end justify-between gap-8 mt-14"
            style={{ animationDelay: "0.55s" }}
          >
            <p className="max-w-md text-[#F0EAD8]/50 text-lg leading-relaxed">
              Дизайн, разработка и стратегия для брендов, которые хотят быть&nbsp;замеченными.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#works"
                className="group flex items-center gap-3 text-sm tracking-widest uppercase text-[#F0EAD8] hover:text-[#C9A84C] transition-colors"
              >
                Наши работы
                <span className="w-10 h-px bg-current transition-all duration-300 group-hover:w-14" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-[#C9A84C] text-[#0D0D0D] text-sm tracking-widest uppercase font-semibold hover:bg-[#E5C97A] transition-colors duration-300"
              >
                Начать проект
              </a>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            className="opacity-0-init animate-fade-up absolute bottom-8 left-6 flex items-center gap-3"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#C9A84C]/40 to-transparent animate-float" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#F0EAD8]/25">Скролл</span>
          </div>
        </div>

        {/* Big decorative number */}
        <div className="absolute right-6 bottom-16 font-cormorant text-[20vw] leading-none font-light text-white/[0.02] select-none pointer-events-none">
          01
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 border-t border-b border-white/5 py-12">
        <div
          ref={stats.ref}
          className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${
                stats.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-cormorant text-4xl md:text-5xl font-light text-gradient-gold mb-1">
                {s.value}
              </div>
              <div className="text-xs tracking-widest uppercase text-[#F0EAD8]/35">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 py-28 px-6">
        <div ref={services.ref} className="max-w-6xl mx-auto">
          <div
            className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
              services.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C]/80">Услуги</span>
          </div>

          <h2
            className={`font-cormorant font-light text-[clamp(2.5rem,6vw,5rem)] leading-tight mb-16 transition-all duration-700 delay-100 ${
              services.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Что мы умеем
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={`card-glass p-8 group cursor-pointer transition-all duration-700 ${
                  services.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#C9A84C]/20 group-hover:border-[#C9A84C]/60 group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                    <Icon name={s.icon} size={20} className="text-[#C9A84C]" />
                  </div>
                  <span className="font-cormorant text-4xl font-light text-white/8 group-hover:text-[#C9A84C]/20 transition-colors">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-wide">{s.title}</h3>
                <p className="text-[#F0EAD8]/45 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs tracking-widest uppercase text-[#C9A84C]/0 group-hover:text-[#C9A84C] transition-all duration-300">
                  Подробнее
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="relative z-10 py-28 px-6 border-t border-white/5">
        <div ref={works.ref} className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <div
                className={`flex items-center gap-4 mb-4 transition-all duration-700 ${
                  works.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C]/80">Портфолио</span>
              </div>
              <h2
                className={`font-cormorant font-light text-[clamp(2.5rem,6vw,5rem)] leading-tight transition-all duration-700 delay-100 ${
                  works.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Избранные работы
              </h2>
            </div>
            <a
              href="#contact"
              className={`hidden md:flex items-center gap-3 text-sm tracking-widest uppercase text-[#F0EAD8]/40 hover:text-[#C9A84C] transition-all duration-700 delay-200 ${
                works.inView ? "opacity-100" : "opacity-0"
              }`}
            >
              Все работы
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>

          <div className="space-y-1">
            {WORKS.map((w, i) => (
              <div
                key={i}
                className={`group flex items-center justify-between py-7 border-b border-white/5 hover:border-[#C9A84C]/20 cursor-pointer transition-all duration-500 ${
                  works.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="flex items-center gap-6">
                  <span className="font-cormorant text-2xl font-light text-[#C9A84C]/30 group-hover:text-[#C9A84C]/70 transition-colors min-w-[2rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl md:text-2xl font-medium tracking-wide group-hover:text-[#C9A84C] transition-colors duration-300">
                    {w.title}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden md:block text-xs tracking-widest uppercase text-[#F0EAD8]/30 border border-white/10 px-3 py-1">
                    {w.tag}
                  </span>
                  <span className="text-[#F0EAD8]/25 text-sm">{w.year}</span>
                  <Icon
                    name="ArrowUpRight"
                    size={16}
                    className="text-[#C9A84C]/0 group-hover:text-[#C9A84C] transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-28 px-6">
        <div ref={about.ref} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          {/* Left: big quote */}
          <div
            className={`transition-all duration-800 ${
              about.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C]/80">О студии</span>
            </div>
            <blockquote className="font-cormorant font-light text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[#F0EAD8]/80 mb-8">
              «Мы верим, что хороший дизайн — это не украшение, а&nbsp;решение.»
            </blockquote>
            <div
              className={`w-16 h-px bg-[#C9A84C] transition-all duration-1000 delay-500 ${
                about.inView ? "w-16 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>

          {/* Right: description */}
          <div
            className={`transition-all duration-800 delay-200 ${
              about.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-[#F0EAD8]/55 leading-relaxed mb-6">
              Мы — небольшая команда с большим опытом. Работаем с брендами от стартапов до корпораций,
              создавая цифровые продукты, которые работают и выглядят так, как&nbsp;задумано.
            </p>
            <p className="text-[#F0EAD8]/55 leading-relaxed mb-10">
              Наш подход прост: глубокое погружение в задачу, честный диалог с клиентом
              и&nbsp;неустанное внимание к деталям на каждом этапе.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Дизайн-системы", "React / Next.js", "Брендинг", "UX-исследования", "SEO"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs tracking-widest uppercase px-4 py-2 border border-white/10 text-[#F0EAD8]/40 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A84C]/80">Контакты</span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="font-cormorant font-light text-[clamp(3rem,8vw,7rem)] leading-tight mb-8">
            Начнём работать<br />
            <span className="text-gradient-gold">вместе?</span>
          </h2>
          <p className="text-[#F0EAD8]/40 max-w-lg mx-auto mb-12 leading-relaxed">
            Расскажите о проекте — мы ответим в течение 24 часов и предложим решение.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@studio.ru"
              className="px-10 py-4 bg-[#C9A84C] text-[#0D0D0D] text-sm tracking-widest uppercase font-semibold hover:bg-[#E5C97A] transition-colors duration-300"
            >
              Написать нам
            </a>
            <a
              href="tel:+79001234567"
              className="px-10 py-4 border border-white/15 text-[#F0EAD8]/60 text-sm tracking-widest uppercase hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-300"
            >
              +7 900 123-45-67
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-cormorant font-light tracking-[0.2em] text-[#F0EAD8]/40 text-sm">
              СТУДИЯ
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C9A84C]/50" />
          </div>
          <p className="text-xs text-[#F0EAD8]/20 tracking-wide">
            © 2024 — Все права защищены
          </p>
          <div className="flex items-center gap-6">
            {["Behance", "Telegram", "VK"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs tracking-widest uppercase text-[#F0EAD8]/25 hover:text-[#C9A84C] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
