
import React, { useState, useEffect, useCallback, memo } from 'react';
import { 
  Users, 
  Mail,
  ShieldCheck,
  Scale,
  Building2,
  CheckCircle2,
  Plus,
  Minus,
  HelpCircle,
  Instagram
} from 'lucide-react';

// Memoized static components for better performance
const WhatsAppLogo = memo(({ className = "w-5 h-5", color = "#25D366" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ fill: color }} role="img" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
));

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-rose-100 last:border-0 overflow-hidden reveal">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-6 flex items-center justify-between text-left hover:text-rose-600 transition-colors group focus-visible:bg-rose-50"
      >
        <span className="text-lg font-medium text-slate-800 pr-8">{question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full border border-rose-100 flex items-center justify-center transition-all ${isOpen ? 'bg-rose-600 border-rose-600 text-white' : 'text-rose-600 group-hover:border-rose-300'}`}>
          {isOpen ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <p className="text-slate-500 font-light leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-rose-100 py-3 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <header className="flex flex-col">
          <a href="#inicio" className="text-xl md:text-2xl font-serif font-black tracking-tight text-slate-800 outline-none">
            ALINE SANTESSO <span className="text-rose-600 italic">Advogada</span>
          </a>
          <span className="text-[9px] uppercase tracking-[0.4em] text-rose-400 font-bold">OAB/SP 497.122</span>
        </header>
        
        <div className="hidden md:flex gap-10 items-center">
          {['Expertise', 'Sobre', 'FAQ', 'Contato'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold text-slate-500 hover:text-rose-600 transition-colors uppercase tracking-widest outline-none focus-visible:text-rose-600">
              {item}
            </a>
          ))}
          <a 
            href="https://wa.me/5517992116720" 
            className="bg-rose-600 text-white px-7 py-3 rounded-full text-[10px] font-bold hover:bg-rose-700 transition-all tracking-widest uppercase shadow-lg shadow-rose-200"
            aria-label="Agendar consulta via WhatsApp"
          >
            Falar Agora
          </a>
        </div>
      </div>
    </nav>
  );
});

const ServiceSection = memo(({ icon: Icon, title, description, points }: { icon: any, title: string, description: string, points: string[] }) => (
  <article className="bg-white p-8 lg:p-10 rounded-3xl border border-rose-50 hover:border-rose-200 transition-all group shadow-sm hover:shadow-xl hover:shadow-rose-100/50 reveal h-full flex flex-col">
    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform duration-500 shrink-0">
      <Icon size={28} aria-hidden="true" />
    </div>
    <h3 className="text-xl lg:text-2xl font-serif font-bold text-slate-800 mb-4">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
    <ul className="space-y-3 shrink-0">
      {points.map((p, idx) => (
        <li key={idx} className="flex items-start gap-3 text-[10px] lg:text-xs font-semibold text-slate-600 uppercase tracking-wider">
          <CheckCircle2 size={16} className="text-rose-500 shrink-0" aria-hidden="true" /> {p}
        </li>
      ))}
    </ul>
  </article>
));

export default function App() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const faqs = [
    {
      question: "O que é a regularização de imóveis e por que é essencial?",
      answer: "Regularizar um imóvel significa adequar a documentação física à realidade jurídica no Registro de Imóveis. É essencial para garantir a propriedade plena, permitir o financiamento bancário, valorizar o bem em até 30% e evitar multas administrativas ou problemas em heranças."
    },
    {
      question: "Quais os riscos de comprar um imóvel sem assessoria jurídica?",
      answer: "Sem uma análise técnica (Due Diligence), você pode adquirir um imóvel com dívidas ocultas do antigo proprietário, problemas estruturais não declarados ou restrições judiciais que podem levar à perda do bem e do investimento realizado."
    },
    {
      question: "Quais as vantagens do inventário extrajudicial em cartório?",
      answer: "O inventário extrajudicial é significativamente mais rápido que o judicial, podendo ser concluído em poucas semanas. Além disso, costuma ter custos menores com taxas e permite uma resolução mais amigável e direta entre os herdeiros, desde que todos sejam maiores, capazes e estejam em consenso."
    },
    {
      question: "Como funciona o divórcio consensual extrajudicial?",
      answer: "Quando o casal está de acordo sobre a partilha de bens e pensão, e não existem filhos menores ou incapazes, o divórcio pode ser feito diretamente no cartório através de escritura pública. É a forma mais ágil e menos desgastante de encerrar o vínculo matrimonial."
    },
    {
      question: "O que é planejamento sucessório?",
      answer: "É um conjunto de estratégias jurídicas (como doações com reserva de usufruto ou criação de holdings) para organizar a transferência do patrimônio ainda em vida. Isso reduz custos tributários futuros e evita conflitos familiares prolongados em processos de inventário."
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-rose-100 selection:text-rose-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="inicio" className="pt-40 pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-50/50 blur-[120px] rounded-full pointer-events-none transform translate-z-0"></div>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="text-left space-y-10 reveal active">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-rose-50 rounded-full border border-rose-100">
                <ShieldCheck size={18} className="text-rose-600" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-800">Segurança Patrimonial e Familiar</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-slate-900 leading-[1.05] tracking-tight">
                Aline Santesso <br />
                <span className="text-rose-600 italic font-normal">Advogada</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-500 font-light leading-relaxed max-w-xl">
                Referência em <span className="text-slate-900 font-semibold underline decoration-rose-300 decoration-4 underline-offset-4">Direito Imobiliário</span> e <span className="text-slate-900 font-semibold underline decoration-rose-300 decoration-4 underline-offset-4">Direito de Família</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <a 
                  href="https://wa.me/5517992116720" 
                  className="bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all shadow-xl shadow-green-100 hover:-translate-y-1 flex items-center justify-center gap-3"
                  aria-label="Falar agora via WhatsApp"
                >
                  <WhatsAppLogo className="w-6 h-6 text-white" color="white" /> Consultoria Especializada
                </a>
              </div>
            </div>

            <div className="relative reveal-left active">
               <div className="absolute -inset-4 bg-rose-50 rounded-[4rem] -rotate-3 z-0"></div>
               <div className="relative z-10 aspect-[4/5] bg-slate-200 rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                    alt="Dra. Aline Santesso" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900/60 to-transparent">
                     <p className="text-white text-xs font-black uppercase tracking-widest opacity-80">Dra. Aline Santesso Pulini</p>
                     <p className="text-rose-300 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">OAB/SP 497.122</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-24 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-6">
            <header className="text-center mb-16 space-y-4 reveal">
              <h2 className="text-[12px] font-black uppercase tracking-[0.6em] text-rose-500">Serviços Jurídicos</h2>
              <p className="text-4xl md:text-5xl font-serif text-slate-900">Soluções para o seu Patrimônio</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              <div className="h-full">
                <ServiceSection 
                  icon={Building2} 
                  title="Direito Imobiliário" 
                  description="Regularização de imóveis, usucapião e análise de riscos em transações imobiliárias seguras."
                  points={["Escrituras e Matrículas", "Due Diligence", "Locações e Condomínios"]}
                />
              </div>
              <div className="h-full">
                <ServiceSection 
                  icon={Users} 
                  title="Direito de Família" 
                  description="Resolução de conflitos familiares com ética, empatia e total sigilo profissional."
                  points={["Divórcios e Partilhas", "Pensão e Guarda", "Reconhecimento de União"]}
                />
              </div>
              <div className="h-full">
                <ServiceSection 
                  icon={Scale} 
                  title="Sucessões" 
                  description="Organização patrimonial e inventários ágeis para proteger o legado da sua família."
                  points={["Inventários Extrajudiciais", "Planejamento Sucessório", "Holdings Familiares"]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-16 items-center">
            <div className="md:col-span-2 reveal">
               <div className="relative aspect-[4/5] bg-rose-50 rounded-[3rem] overflow-hidden group shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                    alt="Escritório de Advocacia" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-rose-900/10 mix-blend-multiply"></div>
               </div>
            </div>

            <div className="md:col-span-3 space-y-10 reveal-left">
              <header className="space-y-4">
                <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-rose-500">Conheça a Dra. Aline</h2>
                <h3 className="text-5xl font-serif text-slate-900 leading-tight">Advocacia Ética e Descomplicada</h3>
              </header>
              
              <div className="space-y-6 text-slate-600 font-light text-xl leading-relaxed">
                <p>
                  Com sólida atuação técnica e inscrita na <strong className="text-rose-600 font-bold">OAB/SP 497.122</strong>, minha missão é oferecer segurança jurídica através de um atendimento próximo e transparente.
                </p>
                
                <blockquote className="p-8 bg-slate-50 rounded-3xl italic font-serif text-slate-800 border-l-4 border-rose-500 text-lg">
                  "Acredito em uma advocacia que previne problemas e resolve conflitos de forma inteligente, priorizando sempre a via extrajudicial."
                </blockquote>
                
                <p className="text-lg">
                  Especialista em converter complexidades jurídicas em soluções práticas, garantindo que seu patrimônio e sua família estejam protegidos conforme a legislação vigente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50/30">
          <div className="max-w-4xl mx-auto px-6">
            <header className="text-center mb-12 space-y-4 reveal">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mb-2">
                <HelpCircle size={24} aria-hidden="true" />
              </div>
              <h2 className="text-[12px] font-black uppercase tracking-[0.6em] text-rose-500">FAQ</h2>
              <p className="text-4xl font-serif text-slate-900">Perguntas Frequentes</p>
            </header>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-rose-50/50">
              {faqs.map((faq, index) => (
                <FAQItem key={`faq-${index}`} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Instagram CTA Section */}
        <section className="py-24 bg-white reveal">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <a 
              href="https://instagram.com/alinensantesso" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-4 group outline-none"
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-3xl flex items-center justify-center text-white shadow-xl group-hover:animate-[pulse-gentle_2s_infinite_ease-in-out] transition-transform duration-500 group-focus-visible:ring-4 group-focus-visible:ring-rose-200">
                <Instagram size={40} aria-hidden="true" />
              </div>
              <span className="text-2xl md:text-4xl font-serif font-bold text-slate-800 tracking-tight">
                Siga-me no <span className="text-rose-600 italic">Instagram!</span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-rose-500 transition-colors">@alinensantesso</span>
            </a>
          </div>
        </section>

        {/* Contact Section - Updated without form */}
        <section id="contato" className="py-20 bg-slate-900 text-white relative overflow-hidden rounded-[4rem] mx-6 mb-12">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-600/5 blur-[150px] pointer-events-none transform translate-z-0"></div>
          <div className="max-w-6xl mx-auto px-10 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-16">
              <header className="space-y-6 reveal">
                <h3 className="text-5xl md:text-6xl font-serif leading-tight">Canais de <span className="text-rose-400 italic font-normal">Atendimento.</span></h3>
                <p className="text-slate-400 text-xl font-light">Agende sua consultoria diretamente pelos canais abaixo para um retorno imediato.</p>
              </header>
              
              <div className="grid md:grid-cols-2 gap-8 reveal">
                  <a 
                    href="https://wa.me/5517992116720" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col items-center gap-6 p-10 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-[#25D366] transition-all group outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  >
                    <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <WhatsAppLogo className="w-10 h-10 text-white" color="white" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white/80 mb-2">WhatsApp Prioritário</p>
                      <p className="text-2xl lg:text-3xl font-bold">(17) 99211-6720</p>
                    </div>
                  </a>
                  
                  <div className="flex flex-col items-center gap-6 p-10 bg-white/5 rounded-[3rem] border border-white/10 group">
                    <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-rose-400">
                      <Mail size={40} aria-hidden="true" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">E-mail Profissional</p>
                      <p className="text-lg lg:text-xl font-medium opacity-80 break-all">alinesantesso@adv.oabsp.org.br</p>
                    </div>
                  </div>
              </div>

              <div className="p-8 bg-rose-500/10 rounded-3xl border border-rose-500/20 reveal max-w-2xl mx-auto">
                <p className="text-sm text-rose-200 leading-relaxed italic">
                  "Meu compromisso é com a clareza e a proteção dos seus direitos. Cada caso é tratado com exclusividade e o máximo rigor técnico."
                </p>
                <p className="mt-4 font-serif font-bold text-white uppercase tracking-widest text-xs">— Dra. Aline Santesso</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-10 border-t border-slate-50 reveal">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-2">
            <span className="text-slate-900 font-serif text-3xl font-black tracking-tight">ALINE SANTESSO</span>
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.8em]">Direito Imobiliário e Família</p>
          </div>
          <nav className="flex gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
            <a href="https://instagram.com/alinensantesso" target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors flex items-center gap-2 outline-none focus-visible:text-rose-600" aria-label="Acessar Instagram">
              <Instagram size={14} aria-hidden="true" /> Instagram
            </a>
            <span className="opacity-20" aria-label="Número da OAB">OAB/SP 497.122</span>
          </nav>
          <p className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">© 2024 • Aline Santesso Pulini</p>
        </div>
      </footer>

      <a 
        href="https://wa.me/5517992116720" 
        className="fixed bottom-8 right-8 z-[999] bg-[#25D366] text-white p-6 rounded-full shadow-[0_30px_60px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group outline-none focus-visible:ring-4 focus-visible:ring-green-400"
        aria-label="Atendimento prioritário via WhatsApp"
        title="Falar com a Advogada"
      >
        <WhatsAppLogo className="w-8 h-8" color="white" />
        <span className="absolute right-full mr-6 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl">ATENDIMENTO IMEDIATO</span>
      </a>
    </div>
  );
}
