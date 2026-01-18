
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ChevronRight,
  Mail,
  ShieldCheck,
  Scale,
  Building2,
  CheckCircle2,
  Plus,
  Minus,
  HelpCircle,
  Instagram,
  Send,
  Loader2,
  Check
} from 'lucide-react';
import { supabase } from './supabase';

const WhatsAppLogo = ({ className = "w-5 h-5", color = "#25D366" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ fill: color }} role="img" aria-label="Ícone do WhatsApp">
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Added key to props definition to resolve TypeScript error during component mapping
const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-rose-100 last:border-0 overflow-hidden reveal">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-rose-600 transition-colors group"
      >
        <span className="text-lg font-medium text-slate-800 pr-8">{question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full border border-rose-100 flex items-center justify-center transition-all ${isOpen ? 'bg-rose-600 border-rose-600 text-white' : 'text-rose-600 group-hover:border-rose-300'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-500 font-light leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Imobiliário',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Nota: Assume que existe uma tabela 'leads' no Supabase com as colunas correspondentes
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone, 
            subject: formData.subject, 
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'Imobiliário', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl reveal">
      {success ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-4 animate-bounce">
            <Check size={40} />
          </div>
          <h4 className="text-2xl font-serif font-bold">Mensagem Enviada!</h4>
          <p className="text-slate-400">Dra. Aline entrará em contato em breve.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="text-rose-400 text-sm font-bold uppercase tracking-widest pt-4 hover:underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-4">Nome Completo</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-white/20"
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-4">E-mail</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-white/20"
                placeholder="email@exemplo.com"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-4">Telefone / WhatsApp</label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-white/20"
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-4">Assunto</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-slate-800 border border-white/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
              >
                <option value="Imobiliário">Direito Imobiliário</option>
                <option value="Família">Direito de Família</option>
                <option value="Sucessão">Inventário / Sucessão</option>
                <option value="Outro">Outro Assunto</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-4">Como podemos ajudar?</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-white/20 resize-none"
              placeholder="Descreva brevemente sua situação..."
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-800 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-rose-950/20 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            {loading ? 'ENVIANDO...' : 'ENVIAR SOLICITAÇÃO'}
          </button>
        </form>
      )}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-rose-100 py-3 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <header className="flex flex-col">
          <a href="#inicio" className="text-xl md:text-2xl font-serif font-black tracking-tight text-slate-800">
            ALINE SANTESSO <span className="text-rose-600 italic">Advogada</span>
          </a>
          <span className="text-[9px] uppercase tracking-[0.4em] text-rose-400 font-bold">OAB/SP 497.122</span>
        </header>
        
        <div className="hidden md:flex gap-10 items-center">
          {['Expertise', 'Sobre', 'FAQ', 'Contato'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold text-slate-500 hover:text-rose-600 transition-colors uppercase tracking-widest">
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
};

const ServiceSection = ({ icon: Icon, title, description, points }: { icon: any, title: string, description: string, points: string[] }) => (
  <article className="bg-white p-10 rounded-3xl border border-rose-50 hover:border-rose-200 transition-all group shadow-sm hover:shadow-xl hover:shadow-rose-100/50 reveal">
    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon size={28} aria-hidden="true" />
    </div>
    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>
    <ul className="space-y-3">
      {points.map((p, idx) => (
        <li key={idx} className="flex items-start gap-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          <CheckCircle2 size={16} className="text-rose-500 shrink-0" aria-hidden="true" /> {p}
        </li>
      ))}
    </ul>
  </article>
);

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
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-50/50 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 text-center space-y-10 reveal">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-rose-50 rounded-full border border-rose-100">
              <ShieldCheck size={18} className="text-rose-600" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-800">Segurança Patrimonial e Familiar</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif font-black text-slate-900 leading-[1.05] tracking-tight">
              Aline Santesso <br />
              <span className="text-rose-600 italic font-normal">Advogada Especialista</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl mx-auto">
              Sua referência em <span className="text-slate-900 font-semibold underline decoration-rose-300 decoration-4 underline-offset-4">Direito Imobiliário</span> e <span className="text-slate-900 font-semibold underline decoration-rose-300 decoration-4 underline-offset-4">Direito de Família</span>. 
              Estratégias jurídicas precisas para proteger o seu patrimônio e regularizar seus bens.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <a 
                href="https://wa.me/5517992116720" 
                className="bg-[#25D366] text-white px-12 py-6 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all shadow-xl shadow-green-100 hover:-translate-y-1 flex items-center justify-center gap-3"
                aria-label="Iniciar conversa com a Dra. Aline Santesso no WhatsApp"
              >
                <WhatsAppLogo className="w-6 h-6 text-white" color="white" /> Falar com a Especialista
              </a>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-16 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-6">
            <header className="text-center mb-12 space-y-4 reveal">
              <h2 className="text-[12px] font-black uppercase tracking-[0.6em] text-rose-500">Serviços Jurídicos</h2>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Advocacia Imobiliária e Familiar</h2>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              <ServiceSection 
                icon={Building2} 
                title="Direito Imobiliário" 
                description="Sua propriedade garantida através de uma análise minuciosa. Atuamos na prevenção de riscos em aquisições e na solução definitiva para regularização de imóveis."
                points={["Regularização de Matrículas e Escrituras", "Due Diligence para Compra e Venda", "Ações de Usucapião e Possessórias", "Assessoria em Condomínios e Locações"]}
              />
              <ServiceSection 
                icon={Users} 
                title="Direito de Família" 
                description="Gestão humanizada e técnica em momentos decisivos. Proteção para herdeiros através de sucessões e planejamento matrimonial estratégico."
                points={["Planejamento Sucessório e Holdlings", "Inventários Judiciais e Extrajudiciais", "Divórcio Consensual e Litigioso", "Pensão Alimentícia e Guarda"]}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 bg-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
            <header className="space-y-4 reveal">
              <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-rose-500">Dra. Aline Santesso</h2>
              <h3 className="text-5xl font-serif text-slate-900 leading-tight">Advocacia Ética e Estratégica</h3>
            </header>
            
            <div className="space-y-6 text-slate-600 font-light text-xl leading-relaxed reveal">
              <p>
                Com sólida atuação técnica e inscrita na <strong className="text-rose-600 font-bold">OAB/SP 497.122</strong>, minha prática jurídica é pautada pela transparência e pela busca incessante da segurança patrimonial dos meus clientes.
              </p>
              
              <blockquote className="inline-flex items-start gap-5 p-10 bg-rose-50/50 rounded-[3rem] border border-rose-100 italic font-serif text-rose-900 text-2xl shadow-sm text-left max-w-2xl mx-auto">
                <Scale size={40} className="text-rose-600 shrink-0 mt-1" aria-hidden="true" />
                <span>"A advocacia é o instrumento para garantir que seus direitos imobiliários e familiares sejam respeitados com o máximo rigor técnico."</span>
              </blockquote>
              
              <p className="text-lg max-w-2xl mx-auto">
                Sou especialista em converter conflitos complexos em acordos seguros, priorizando a celeridade do <span className="text-slate-900 font-medium">Extrajudicial</span> e a preservação do patrimônio familiar através de uma assessoria totalmente personalizada.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-slate-50/30">
          <div className="max-w-4xl mx-auto px-6">
            <header className="text-center mb-12 space-y-4 reveal">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mb-2">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-[12px] font-black uppercase tracking-[0.6em] text-rose-500">FAQ</h2>
              <h2 className="text-4xl font-serif text-slate-900">Perguntas Frequentes</h2>
              <p className="text-slate-500 max-w-xl mx-auto font-light">Respostas claras para as principais dúvidas sobre processos imobiliários e de família.</p>
            </header>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-rose-50/50">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Instagram CTA Section */}
        <section className="py-16 bg-white reveal">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <a 
              href="https://instagram.com/alinensantesso" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Instagram size={32} />
              </div>
              <span className="text-2xl md:text-3xl font-serif font-bold text-slate-800 tracking-tight">
                Siga-me no <span className="text-rose-600 italic">Instagram!</span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-rose-500 transition-colors">@alinensantesso</span>
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-20 bg-slate-900 text-white relative overflow-hidden rounded-[4rem] mx-6 mb-12">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-600/5 blur-[150px] pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-10 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-16">
              <header className="space-y-6 reveal">
                <h3 className="text-5xl md:text-6xl font-serif leading-tight">Consulte uma advogada <br /> de sua <span className="text-rose-400 italic font-normal">confiança.</span></h3>
                <p className="text-slate-400 text-xl font-light">Agende uma consultoria ou deixe sua mensagem abaixo para regularizar seu patrimônio.</p>
              </header>
              
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-8">
                  <a 
                    href="https://wa.me/5517992116720" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-6 p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-[#25D366] transition-all group reveal-left"
                  >
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <WhatsAppLogo className="w-8 h-8 text-white" color="white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white/80">WhatsApp</p>
                      <p className="text-xl font-bold mt-1">(17) 99211-6720</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-6 p-8 bg-white/5 rounded-3xl border border-white/10 reveal-left">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-rose-400">
                      <Mail size={32} aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">E-mail Profissional</p>
                      <p className="text-sm font-medium opacity-80 mt-1 break-all">alinesantesso@adv.oabsp.org.br</p>
                    </div>
                  </div>

                  <div className="p-8 bg-rose-500/10 rounded-3xl border border-rose-500/20 reveal-left">
                    <p className="text-sm text-rose-200 leading-relaxed italic">
                      "Meu compromisso é com a clareza e a proteção dos seus direitos. Cada caso é tratado com exclusividade."
                    </p>
                    <p className="mt-4 font-serif font-bold text-white">— Dra. Aline Santesso</p>
                  </div>
                </div>

                {/* Form Integration */}
                <div className="lg:col-span-3">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-10 border-t border-slate-50 reveal">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-2">
            <span className="text-slate-900 font-serif text-3xl font-black tracking-tight">ALINE SANTESSO</span>
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.8em]">Advocada Especialista em Direito Imobiliário e Família</p>
          </div>
          <nav className="flex gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
            <a href="https://instagram.com/alinensantesso" target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors flex items-center gap-2" aria-label="Perfil da Dra. Aline Santesso no Instagram">
              <Instagram size={14} /> Instagram
            </a>
            <span className="opacity-20" aria-label="Número da OAB">OAB/SP 497.122</span>
          </nav>
          <p className="text-[11px] text-slate-300 font-bold uppercase tracking-widest">© 2024 • Aline Santesso Pulini</p>
        </div>
      </footer>

      {/* Floating CTA */}
      <a 
        href="https://wa.me/5517992116720" 
        className="fixed bottom-8 right-8 z-[999] bg-[#25D366] text-white p-6 rounded-full shadow-[0_30px_60px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group"
        aria-label="Atendimento prioritário via WhatsApp"
        title="Falar com a Advogada"
      >
        <WhatsAppLogo className="w-8 h-8" color="white" />
        <span className="absolute right-full mr-6 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[11px] font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl">ATENDIMENTO IMEDIATO</span>
      </a>
    </div>
  );
}
