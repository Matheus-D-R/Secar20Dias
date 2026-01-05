import React, { useEffect, useState, useRef } from 'react';
import { generatePersuasiveCopy } from '../services/geminiService';
import { CheckCircle, ShieldCheck, Star, Smartphone, ArrowDown, Utensils, Ruler, Heart, ChevronDown, ChevronUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Utility Components ---

const SectionContainer: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <div id={id} className={`w-full py-12 md:py-20 ${className}`}>
    <div className="max-w-6xl mx-auto px-4">
      {children}
    </div>
  </div>
);

const ButtonCTA: React.FC<{ text?: string; className?: string; small?: boolean }> = ({ text = "QUERO RECEBER MEU APLICATIVO!", className = "", small = false }) => (
  <a 
    href="https://pay.kiwify.com.br/S5FI6jQ?afid=oLjhX7j8" 
    target="_blank"
    rel="noopener noreferrer"
    className={`
      ${small ? 'px-6 py-3 text-lg' : 'px-8 py-5 md:px-10 md:py-6 text-xl md:text-2xl'}
      bg-green-600 hover:bg-green-500 text-white font-extrabold uppercase rounded-xl 
      shadow-[0_4px_14px_0_rgba(37,211,102,0.6)] transition-all duration-300 
      hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 
      animate-pulse-fast text-center leading-tight mx-auto
      ${className}
    `}
  >
    <span>{text}</span>
  </a>
);

// --- Sections ---

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = [
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/1.jpg",
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/2.jpg",
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/3.jpg",
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/4.jpg",
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/5.jpg",
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/6.jpg",
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/7.jpg",
    "https://metodosecarem20dias.com/wp-content/uploads/2025/07/8.jpg"
  ];

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
       handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerPage]);

  const handleNext = () => {
     setCurrentIndex((prev) => {
         const maxIndex = images.length - itemsPerPage;
         return prev >= maxIndex ? 0 : prev + 1;
     });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
        const maxIndex = images.length - itemsPerPage;
        return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) handleNext();
    if (touchStartX.current - touchEndX.current < -50) handlePrev();
  };

  return (
      <div className="w-full mt-12 bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Confira resultados reais de nossas clientes!</h2>
            <h3 className="text-brand-gold text-lg md:text-xl font-medium">Resultados transformadores logo nas primeiras semanas</h3>
        </div>
        
        <div 
            className="relative group px-2 md:px-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <button 
                onClick={handlePrev} 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green p-2 rounded-full shadow-lg text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={handleNext} 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green p-2 rounded-full shadow-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Próximo"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="overflow-hidden rounded-xl">
                <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                >
                    {images.map((img, idx) => (
                        <div 
                            key={idx} 
                            className="flex-shrink-0 px-2 box-border"
                            style={{ width: `${100 / itemsPerPage}%` }}
                        >
                            <img src={img} alt={`Resultado ${idx + 1}`} className="w-full aspect-square object-cover rounded-xl border-2 border-white/10 shadow-lg hover:scale-[1.02] transition-transform" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
                 {Array.from({ length: images.length - itemsPerPage + 1 }).map((_, idx) => (
                     <button 
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-brand-green w-8' : 'bg-gray-600 w-2 hover:bg-gray-500'}`}
                        aria-label={`Ir para slide ${idx + 1}`}
                     />
                 ))}
            </div>
        </div>
      </div>
  );
};

const Benefits: React.FC = () => {
  return (
    <SectionContainer className="bg-brand-dark relative">
       {/* Visual Separator */}
       <div className="w-full flex justify-center -mt-24 mb-12 relative z-10 pointer-events-none">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-brand-dark/0"></div> 
       </div>

        <div className="text-center mb-12">
           <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight tracking-wide">
            Em apenas 20 dias você vai mudar <br className="hidden md:block"/> 
            <span className="text-brand-gold">sua vida para sempre!</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { Icon: Utensils, title: "Emagrecer Comendo", desc: "Seguindo o nosso plano alimentar, você vai perceber que poderá perder peso comendo de forma gostosa e saudável, sem ter que largar o seu pão francês ou seus alimentos prediletos." },
            { Icon: Ruler, title: "Mudança de Corpo", desc: "Nosso programa além de potencializar o seu emagrecimento, você verá diferença corporal e redução das suas medidas." },
            { Icon: Heart, title: "Autoestima Renovada", desc: "Comece a ver resultados logo nas primeiras semanas, sinta a felicidade de ver a transformação do seu corpo e da sua saúde." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(255,215,0,0.1)] group">
              <div className="p-4 bg-brand-gold/10 rounded-full text-brand-gold group-hover:scale-110 transition-transform duration-300">
                <item.Icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{item.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
    </SectionContainer>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <SectionContainer className="bg-gradient-to-br from-[#1e061e] to-brand-purple/20 border-t border-white/5 relative overflow-hidden">
      <div className="flex flex-col gap-8 relative z-10">
        
        {/* Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold text-xs font-bold tracking-[0.2em] uppercase">
                Como Funciona
            </span>
            <h2 className="text-2xl md:text-5xl font-extrabold text-white leading-tight">
                Elimine gordura indesejada <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
                    mudando seus hábitos mentais
                </span>
            </h2>
             <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
                Durante os próximos 20 dias você terá acesso ao passo a passo completo. 
                Após seguir o cronograma você irá:
            </p>
        </div>

        {/* Content: List + Image side-by-side on ALL screens */}
        <div className="flex flex-row items-center justify-center gap-3 md:gap-12 mt-4">
            
             {/* List */}
             <div className="w-[60%] md:w-1/2 flex flex-col justify-center">
                <ul className="space-y-3 md:space-y-4">
                    {[
                        "Livrar-se da gordura que te incomoda",
                        "Treinar sua mente para não sentir fome",
                        "Aumentar a saciedade",
                        "Comer comidas gostosas sem culpa",
                        "Nunca mais sofrer com o efeito rebote"
                    ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 md:gap-4 p-2 md:p-3 rounded-lg bg-white/5 md:bg-transparent hover:bg-white/5 transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-brand-green mt-0.5 flex-shrink-0" strokeWidth={3} />
                            <span className="text-gray-100 text-[11px] md:text-lg font-medium leading-snug">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Image */}
            <div className="w-[40%] md:w-1/2 flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-gold/20 blur-[40px] rounded-full opacity-30 animate-pulse"></div>
                    <img 
                        src="https://metodosecarem20dias.com/wp-content/uploads/2025/05/Design-sem-nome-2-1.png" 
                        alt="App Preview" 
                        className="relative z-10 w-full max-w-[180px] md:max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>

        <div className="pt-4 text-center">
             <ButtonCTA text="SIM, EU QUERO EMAGRECER!" />
        </div>
      </div>
    </SectionContainer>
  )
}

const AppFeatures: React.FC = () => {
  return (
    <SectionContainer className="bg-brand-dark border-t border-white/5">
      <div className="flex flex-col items-center gap-12">
        <img 
          src="https://metodosecarem20dias.com/wp-content/uploads/2025/03/Design-sem-nome-1-1.png" 
          alt="App Dashboard"
          className="w-full max-w-4xl rounded-xl shadow-2xl border border-white/10"
        />
        
        <p className="text-center text-lg md:text-xl text-gray-300 max-w-4xl">
          Além do nosso aplicativo super completo você ainda receberá diversas <strong>opções de Refeições, Cardápios, Listas de Compras</strong>, tudo organizado por calorias, prático para imprimir e seguir.
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full mt-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-6 hover:bg-white/10 transition-colors">
             <img src="https://metodosecarem20dias.com/wp-content/uploads/2025/03/1-1-1.png" alt="Cardápios" className="w-32 h-32 object-contain" />
             <div className="text-center md:text-left">
               <h3 className="text-xl font-bold text-brand-gold mb-2">Cardápios Personalizados!</h3>
               <p className="text-gray-400 text-sm">Diversos planos personalizados: Café da manhã, Almoço, Lanches, Jantar e Ceia.</p>
             </div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-6 hover:bg-white/10 transition-colors">
             <img src="https://metodosecarem20dias.com/wp-content/uploads/2025/03/2-1-1.png" alt="App Completo" className="w-32 h-32 object-contain" />
             <div className="text-center md:text-left">
               <h3 className="text-xl font-bold text-brand-gold mb-2">Aplicativo Completo!</h3>
               <p className="text-gray-400 text-sm">Acesse seus planos alimentares direto no celular ou imprima para colocar na geladeira.</p>
             </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

const WhoIsThisFor: React.FC = () => {
  const items = [
    "Você que deseja emagrecer mas não tem tempo",
    "Sente vergonha em se olhar no espelho",
    "Alvo de risos de vizinhos quando sai na rua",
    "É mãe e deseja ter o corpo de antes da gravidez",
    "Já testou várias dietas e não teve resultado",
    "Não quer passar fome para emagrecer",
    "Quer melhorar a saúde e ter mais disposição",
    "Quer voltar a usar as roupas esquecidas"
  ];

  return (
    <SectionContainer className="bg-gradient-to-b from-[#2a0a2a] to-brand-dark">
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Heading */}
        <div className="text-center">
           <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
             Esse treinamento é <br/><span className="text-brand-green">para você que…</span>
           </h2>
        </div>

        {/* Content: List + Image side-by-side on ALL screens */}
        <div className="flex flex-row items-center justify-center gap-3 md:gap-12">
            
            {/* List */}
            <div className="w-[60%] md:w-1/2">
               <ul className="grid gap-2 md:gap-4">
                 {items.map((item, idx) => (
                   <li key={idx} className="flex items-start gap-2 bg-black/20 p-2 md:p-3 rounded-lg border border-white/5">
                     <CheckCircle className="w-3 h-3 md:w-5 md:h-5 text-brand-green flex-shrink-0 mt-0.5 md:mt-1" />
                     <span className="text-gray-200 font-medium text-[10px] md:text-base leading-tight">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Image */}
            <div className="w-[40%] md:w-1/2 flex justify-center items-center">
              <img 
                src="https://metodosecarem20dias.com/wp-content/uploads/2025/03/Design-sem-nome-2-1-1.png" 
                alt="Woman Fitness" 
                className="w-full max-w-[200px] md:max-w-lg drop-shadow-[0_0_50px_rgba(75,0,130,0.5)] object-contain"
              />
            </div>

        </div>
      </div>
    </SectionContainer>
  );
}

const RealResults: React.FC = () => {
  return (
    <SectionContainer className="bg-gradient-to-b from-brand-dark to-[#1a1a1a]">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase mb-4">
          Conheça mulheres reais que tomaram uma atitude
        </h2>
        <p className="text-brand-gold font-medium">CONQUISTARAM UM CORPO SAUDÁVEL E UMA VIDA MUITO MAIS FELIZ.</p>
      </div>
      
      {/* Before/After Large Images */}
      <div className="space-y-12">
        <div className="relative group rounded-2xl overflow-hidden border-2 border-brand-gold/20 shadow-2xl">
           <img 
             src="https://metodosecarem20dias.com/wp-content/uploads/2025/03/Antes-1.jpg" 
             alt="Antes e Depois 1" 
             className="w-full object-cover"
           />
        </div>
        <div className="relative group rounded-2xl overflow-hidden border-2 border-brand-gold/20 shadow-2xl">
           <img 
             src="https://metodosecarem20dias.com/wp-content/uploads/2025/03/Antes-2.jpg" 
             alt="Antes e Depois 2" 
             className="w-full object-cover"
           />
        </div>
      </div>
      
      <div className="mt-12 text-center">
         <ButtonCTA text="SIM, EU QUERO PERDER GORDURA LOCALIZADA!" />
         <div className="mt-4 flex justify-center">
            <img src="https://metodosecarem20dias.com/wp-content/uploads/2025/05/compra-segura-1.png" alt="Compra Segura" className="h-6 md:h-8 opacity-80" />
         </div>
      </div>
    </SectionContainer>
  );
}

const Bonuses: React.FC = () => {
  const bonuses = [
    {
      title: "Alongamento e Mobilidade",
      desc: "Receba uma esteira de exercícios para alongamento e mobilidade corporal, todos em vídeo aulas completas.",
      img: "https://metodosecarem20dias.com/wp-content/uploads/2025/03/Alongamento-e-Mobilidade-2-1.png"
    },
    {
      title: "250 Receitas Low Carb",
      desc: "250 receitas deliciosas e saudáveis. De pratos principais a sobremesas.",
      img: "https://metodosecarem20dias.com/wp-content/uploads/2025/03/Alongamento-e-Mobilidade-3-1-1024x726.png"
    },
    {
      title: "Treinos em Casa",
      desc: "Desperte sua energia com nosso circuito de exercícios para casa. Resultados sem academia.",
      img: "https://metodosecarem20dias.com/wp-content/uploads/2025/03/Alongamento-e-Mobilidade-4-1.png"
    },
    {
      title: "Treinos Para Gestantes",
      desc: "Circuito de exercícios para gestantes desde o alongamento inicial a outros treinos mais avançados.",
      img: "https://metodosecarem20dias.com/wp-content/uploads/2025/05/Seu-Nome-2-1.png"
    }
  ];

  return (
    <SectionContainer className="bg-brand-dark border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Dê uma olhada agora nos <span className="text-brand-green">BÔNUS</span> <br/>
          que você vai ter acesso
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {bonuses.map((bonus, idx) => (
          <div key={idx} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-green/50 transition-all duration-300 group">
             <div className="aspect-video overflow-hidden">
                <img src={bonus.img} alt={bonus.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{bonus.title} <span className="text-brand-green text-sm uppercase tracking-wider ml-2 py-1 px-2 bg-brand-green/10 rounded">Bônus</span></h3>
                <p className="text-gray-400">{bonus.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

const LimitedOffer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(19 * 60); // 19 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 19 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins: String(mins).padStart(2, '0'), secs: String(secs).padStart(2, '0') };
  };

  const { mins, secs } = formatTime(timeLeft);

  return (
    <SectionContainer id="nail0102" className="bg-gradient-to-b from-[#2a0000] to-brand-dark border-y-4 border-red-900/50">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
         
         <div className="bg-red-600/20 text-red-400 border border-red-600/50 px-6 py-2 rounded-full flex items-center gap-2 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider text-sm">Atenção – Oferta por tempo limitado</span>
         </div>

         <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
           Aproveite, pois é somente para as <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">10 primeiras</span>
         </h2>

         {/* Countdown */}
         <div className="flex gap-4 my-4">
            <div className="flex flex-col items-center bg-black/40 p-4 rounded-xl border border-white/10 w-24 md:w-32">
               <span className="text-3xl md:text-5xl font-mono font-bold text-white">00</span>
               <span className="text-xs text-gray-500 uppercase">Horas</span>
            </div>
            <div className="flex flex-col items-center bg-black/40 p-4 rounded-xl border border-white/10 w-24 md:w-32">
               <span className="text-3xl md:text-5xl font-mono font-bold text-white">{mins}</span>
               <span className="text-xs text-gray-500 uppercase">Minutos</span>
            </div>
            <div className="flex flex-col items-center bg-black/40 p-4 rounded-xl border border-white/10 w-24 md:w-32">
               <span className="text-3xl md:text-5xl font-mono font-bold text-red-500 animate-pulse">{secs}</span>
               <span className="text-xs text-gray-500 uppercase">Segundos</span>
            </div>
         </div>

         <div className="space-y-2">
            <p className="text-gray-400 text-lg line-through">De R$ 197,00 por</p>
            <div className="text-5xl md:text-7xl font-extrabold text-white">
               <span className="text-2xl md:text-3xl align-top text-brand-green">4x de</span> R$ 5,42
            </div>
            <p className="text-xl md:text-2xl font-bold text-brand-gold">ou R$ 19,90 à vista</p>
         </div>

         <div className="w-full mt-6">
            <ButtonCTA />
            <p className="text-gray-400 text-xs mt-4 uppercase tracking-widest">Pagamento único • Acesso Vitalício • Sem mensalidades</p>
            <div className="flex justify-center mt-4">
               <img src="https://metodosecarem20dias.com/wp-content/uploads/2025/05/Group-2073.svg" alt="Payments" className="h-6 opacity-70" />
            </div>
         </div>

      </div>
    </SectionContainer>
  );
}

const Guarantee: React.FC = () => {
  return (
    <SectionContainer className="bg-brand-dark">
      <div className="grid md:grid-cols-2 gap-12 items-center">
         <div className="text-center md:text-left space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase">
              Resultados Garantidos ou <br/><span className="text-brand-green">Seu Dinheiro de Volta!</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Compre o Método Secar em 20 Dias Hoje e teste por 7 Dias.
              Se você não gostar ou não se adaptar ao nosso método, basta enviar um e-mail para: 
              <strong className="text-white block mt-2">suportecliente@monevo.com.br</strong>
            </p>
            <p className="text-gray-400 text-sm">
              Iremos cancelar sua compra imediatamente e devolvemos 100% do seu investimento. Sem perguntas, sem letras miúdas.
            </p>
         </div>
         <div className="flex justify-center">
            <img 
              src="https://metodosecarem20dias.com/wp-content/uploads/2024/02/7-dias-de-garantia-degrade-1024x980.png" 
              alt="Garantia 7 Dias" 
              className="w-2/3 md:w-full max-w-sm drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            />
         </div>
      </div>
    </SectionContainer>
  );
}

const FAQ: React.FC = () => {
  const faqs = [
    { q: "Como eu vou receber esse guia?", a: "O acesso ao produto é imediato para pagamentos por Cartão ou Pix. Você receberá o acesso pelo seu e-mail cadastrado." },
    { q: "Esse programa é um Aplicativo?", a: "Sim! Ele é um aplicativo que você instala no seu celular (iPhone ou Android), muito fácil e prático." },
    { q: "Os Alimentos são Caros?", a: "Não! Nossas receitas são práticas e utilizam ingredientes acessíveis que você já tem em casa ou encontra em qualquer mercado." },
    { q: "Tenho que pagar todo mês?", a: "Não! O pagamento é ÚNICO. Você paga uma vez e tem acesso vitalício ao aplicativo e todas as atualizações." },
    { q: "Existe alguma garantia?", a: "Sim, oferecemos 7 dias de garantia incondicional. Se não gostar, devolvemos seu dinheiro." },
    { q: "Em quanto tempo vou ter resultados?", a: "Muitas alunas notam diferença já nos primeiros dias. Quanto mais você seguir o plano, mais rápido verá os resultados." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionContainer className="bg-[#150515]">
       <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Perguntas Frequentes</h2>
       </div>
       <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, idx) => (
             <div key={idx} className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                   <span className="font-bold text-white text-lg">{item.q}</span>
                   {openIndex === idx ? <ChevronUp className="text-brand-gold"/> : <ChevronDown className="text-gray-400"/>}
                </button>
                {openIndex === idx && (
                   <div className="p-5 pt-0 text-gray-300 border-t border-white/5 animate-fadeIn">
                      {item.a}
                   </div>
                )}
             </div>
          ))}
       </div>
    </SectionContainer>
  );
}

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black py-10 border-t border-white/10 text-center text-gray-500 text-xs px-4">
       <div className="max-w-4xl mx-auto space-y-4">
          <p>
            <strong>AVISO LEGAL:</strong> O conteúdo deste site é apenas para fins informativos e não pretende ser um substituto para aconselhamento médico profissional.
            Os resultados podem variar de pessoa para pessoa.
          </p>
          <p>© {new Date().getFullYear()} Método Secar em 20 Dias. Todos os direitos reservados.</p>
          <p>Este site não é afiliado ao Facebook ou Google.</p>
       </div>
    </footer>
  );
}

// --- Main Page Component ---

const SalesPage: React.FC = () => {
  const [persuasiveText, setPersuasiveText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCopy = async () => {
      const text = await generatePersuasiveCopy();
      setPersuasiveText(text);
      setLoading(false);
    };
    fetchCopy();
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-brand-dark min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* Announcement Bar */}
      <div className="w-full bg-red-600 text-white text-center py-2 font-bold text-xs md:text-sm uppercase tracking-wider animate-pulse shadow-lg z-50 sticky top-0">
        Oferta Especial: Últimas vagas com desconto!
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl w-full px-4 pt-10 pb-16 flex flex-col items-center gap-10">
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
            <span className="text-white">Ela Perdeu 28kg</span>{' '}
            <span className="text-brand-gold">com um super aplicativo</span>{' '}
            <span className="text-white">totalmente natural</span>
          </h1>

          <h2 className="text-gray-300 text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            Emagreça de Uma Vez por Todas e nunca mais volte a Engordar com o nosso 
            programa alimentar especializado. Tudo prático e fácil!
          </h2>
        </div>

        {/* Sales Copy Box */}
        <div className="w-full bg-white/5 border border-brand-gold/30 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50"></div>
          
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            <Star className="w-10 h-10 text-brand-gold fill-brand-gold animate-bounce" />
            <h3 className="text-2xl md:text-3xl font-bold text-brand-gold uppercase tracking-wide">
              O Segredo Revelado
            </h3>

            {loading ? (
              <div className="space-y-3 w-full max-w-2xl animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
            ) : (
              <p className="text-lg md:text-2xl text-white font-medium italic leading-relaxed max-w-3xl">
                "{persuasiveText}"
              </p>
            )}

            <div className="pt-4 flex items-center justify-center gap-2 text-sm text-green-400 font-bold">
              <ShieldCheck className="w-5 h-5" />
              <span>VERIFICADO E APROVADO</span>
            </div>
          </div>
        </div>

        {/* Hero CTA */}
        <div className="w-full text-center space-y-4">
           <ButtonCTA className="w-full md:w-auto" />
           <p className="text-gray-400 text-sm">Acesso imediato • Compra Segura</p>
        </div>

        {/* New Carousel Added Here */}
        <TestimonialsCarousel />
      </div>

      <Benefits />
      <HowItWorks />
      <AppFeatures />
      <WhoIsThisFor />
      <RealResults />
      <Bonuses />
      <LimitedOffer />
      <Guarantee />
      <FAQ />
      
      <div className="py-12 opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
          <ArrowDown className="w-10 h-10 animate-bounce mx-auto" />
      </div>

      <Footer />
    </div>
  );
};

export default SalesPage;