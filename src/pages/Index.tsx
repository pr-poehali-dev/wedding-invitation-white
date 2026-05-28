import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const COUPLE_PHOTO =
  "https://cdn.poehali.dev/projects/95e3bf13-1d28-42e5-ba8a-ec6819a4f411/files/1fcc1e45-a7a7-4c2e-b488-f77bfa873ad4.jpg";

const DRINKS = [
  "Шампанское",
  "Красное вино",
  "Белое вино",
  "Виски / коньяк",
  "Пиво",
  "Безалкогольное",
];

function Petal({ style }: { style: React.CSSProperties }) {
  return <div className="petal" style={style} />;
}

function Petals() {
  const petals = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 7.1) % 100}%`,
    animationDuration: `${7 + (i * 1.3) % 7}s`,
    animationDelay: `${(i * 0.8) % 10}s`,
    width: `${7 + (i * 1.1) % 9}px`,
    height: `${7 + (i * 1.1) % 9}px`,
  }));

  return (
    <>
      {petals.map((p, i) => (
        <Petal key={i} style={p} />
      ))}
    </>
  );
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <audio ref={audioRef} loop preload="auto">
        <source
          src="https://cdn.pixabay.com/audio/2024/02/28/audio_736c2f0619.mp3"
          type="audio/mpeg"
        />
        <source
          src="https://cdn.pixabay.com/audio/2023/11/13/audio_0debdedb08.mp3"
          type="audio/mpeg"
        />
      </audio>
      <button
        onClick={toggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a89a] bg-white/80 backdrop-blur-sm text-[#2c2420] text-xs tracking-widest uppercase shadow-sm hover:bg-[#f5ede6] transition-all ${playing ? "ring-2 ring-[#c9a89a]/30 ring-offset-1" : ""}`}
      >
        <span className={`relative flex items-center ${playing ? "text-[#c9a89a]" : ""}`}>
          <Icon name={playing ? "Volume2" : "Music"} size={14} />
          {playing && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#c9a89a] animate-pulse" />
          )}
        </span>
        <span>{playing ? "Играет" : "Музыка"}</span>
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdf8f4]">
      <Petals />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#c9a89a]/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent to-[#c9a89a]/40" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        <div
          className="animate-fade-in w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-10"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <img
            src={COUPLE_PHOTO}
            alt="Жених и невеста"
            className="w-full h-full object-cover"
          />
        </div>

        <p
          className="animate-fade-in-up text-[#c9a89a] text-xs tracking-[0.35em] uppercase mb-4"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          приглашают вас разделить радость
        </p>

        <h1
          className="animate-fade-in-up text-5xl md:text-7xl text-[#2c2420] leading-none mb-2"
          style={{
            animationDelay: "0.6s",
            opacity: 0,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Алексей
        </h1>
        <div
          className="animate-fade-in-up flex items-center gap-4 my-2"
          style={{ animationDelay: "0.75s", opacity: 0 }}
        >
          <div className="h-px w-16 bg-[#c9a89a]/50" />
          <span
            className="text-[#c9a89a] text-lg"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
            }}
          >
            и
          </span>
          <div className="h-px w-16 bg-[#c9a89a]/50" />
        </div>
        <h1
          className="animate-fade-in-up text-5xl md:text-7xl text-[#2c2420] leading-none mb-10"
          style={{
            animationDelay: "0.9s",
            opacity: 0,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Арина
        </h1>

        <div
          className="animate-fade-in-up border border-[#c9a89a]/30 rounded-2xl px-8 py-6 bg-white/60 backdrop-blur-sm flex flex-col items-center gap-3 shadow-sm"
          style={{ animationDelay: "1.1s", opacity: 0 }}
        >
          <div className="flex items-center gap-3 text-[#2c2420]">
            <Icon name="Calendar" size={16} className="text-[#c9a89a]" />
            <span className="text-sm tracking-widest uppercase font-light">
              22 августа 2026
            </span>
          </div>
          <div className="w-8 h-px bg-[#c9a89a]/40" />
          <div className="flex items-center gap-3 text-[#2c2420]">
            <Icon name="Clock" size={16} className="text-[#c9a89a]" />
            <span className="text-sm tracking-widest uppercase font-light">
              15:00
            </span>
          </div>
          <div className="w-8 h-px bg-[#c9a89a]/40" />
          <div className="flex items-center gap-3 text-[#2c2420]">
            <Icon name="MapPin" size={16} className="text-[#c9a89a]" />
            <span className="text-sm tracking-widest uppercase font-light">
              Ресторан «Белая ночь»
            </span>
          </div>
        </div>

        <div
          className="animate-fade-in mt-12 flex flex-col items-center gap-2 text-[#c9a89a]"
          style={{ animationDelay: "1.5s", opacity: 0 }}
        >
          <span className="text-xs tracking-widest uppercase font-light">
            листайте вниз
          </span>
          <Icon name="ChevronDown" size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function RSVPForm() {
  const [attending, setAttending] = useState<null | boolean>(null);
  const [name, setName] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [hasRestrictions, setHasRestrictions] = useState<null | boolean>(null);
  const [restrictions, setRestrictions] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleDrink = (drink: string) => {
    setSelectedDrinks((prev) =>
      prev.includes(drink)
        ? prev.filter((d) => d !== drink)
        : [...prev, drink]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attending === null) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-24 px-6 bg-white flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#f5ede6] flex items-center justify-center mb-6">
          <Icon name="Heart" size={28} className="text-[#c9a89a]" />
        </div>
        <h2
          className="text-3xl md:text-4xl text-[#2c2420] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Спасибо, {name}!
        </h2>
        <p className="text-[#9a8070] text-sm tracking-wide font-light max-w-xs">
          {attending
            ? "Мы счастливы, что вы будете рядом в этот особенный день."
            : "Жаль, что вы не сможете быть с нами. Спасибо, что написали."}
        </p>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c9a89a] text-xs tracking-[0.35em] uppercase mb-3">
            подтверждение
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#2c2420]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Придёте?
          </h2>
          <div className="w-10 h-px bg-[#c9a89a]/50 mx-auto mt-4" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-xs tracking-widest uppercase text-[#9a8070] mb-2 block font-light">
              Ваше имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Иванов"
              className="w-full border border-[#e8d5cc] rounded-xl px-4 py-3 text-sm text-[#2c2420] bg-[#fdf8f4] focus:outline-none focus:border-[#c9a89a] transition-colors placeholder:text-[#c9b8b0]"
              required
            />
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase text-[#9a8070] mb-3 block font-light">
              Смогу присутствовать?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`flex-1 py-3 rounded-xl text-sm border transition-all ${
                  attending === true
                    ? "bg-[#2c2420] text-white border-[#2c2420]"
                    : "bg-white text-[#2c2420] border-[#e8d5cc] hover:border-[#c9a89a]"
                }`}
              >
                Да, буду!
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`flex-1 py-3 rounded-xl text-sm border transition-all ${
                  attending === false
                    ? "bg-[#2c2420] text-white border-[#2c2420]"
                    : "bg-white text-[#2c2420] border-[#e8d5cc] hover:border-[#c9a89a]"
                }`}
              >
                К сожалению, нет
              </button>
            </div>
          </div>

          {attending === true && (
            <>
              <div>
                <label className="text-xs tracking-widest uppercase text-[#9a8070] mb-3 block font-light">
                  Что будете пить?
                </label>
                <div className="flex flex-wrap gap-2">
                  {DRINKS.map((drink) => (
                    <button
                      key={drink}
                      type="button"
                      onClick={() => toggleDrink(drink)}
                      className={`px-4 py-2 rounded-full text-xs border transition-all ${
                        selectedDrinks.includes(drink)
                          ? "bg-[#c9a89a] text-white border-[#c9a89a]"
                          : "bg-white text-[#2c2420] border-[#e8d5cc] hover:border-[#c9a89a]"
                      }`}
                    >
                      {drink}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-[#9a8070] mb-3 block font-light">
                  Есть ли у вас ограничения в еде?
                </label>
                <div className="flex gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setHasRestrictions(false)}
                    className={`flex-1 py-3 rounded-xl text-sm border transition-all ${
                      hasRestrictions === false
                        ? "bg-[#2c2420] text-white border-[#2c2420]"
                        : "bg-white text-[#2c2420] border-[#e8d5cc] hover:border-[#c9a89a]"
                    }`}
                  >
                    Нет
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasRestrictions(true)}
                    className={`flex-1 py-3 rounded-xl text-sm border transition-all ${
                      hasRestrictions === true
                        ? "bg-[#2c2420] text-white border-[#2c2420]"
                        : "bg-white text-[#2c2420] border-[#e8d5cc] hover:border-[#c9a89a]"
                    }`}
                  >
                    Да
                  </button>
                </div>
                {hasRestrictions === true && (
                  <textarea
                    value={restrictions}
                    onChange={(e) => setRestrictions(e.target.value)}
                    placeholder="Укажите ваши ограничения (аллергии, вегетарианство и т.д.)"
                    rows={3}
                    className="w-full border border-[#e8d5cc] rounded-xl px-4 py-3 text-sm text-[#2c2420] bg-[#fdf8f4] focus:outline-none focus:border-[#c9a89a] transition-colors placeholder:text-[#c9b8b0] resize-none"
                  />
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!name.trim() || attending === null}
            className="mt-2 py-4 rounded-xl bg-[#2c2420] text-white text-xs tracking-widest uppercase transition-all hover:bg-[#3d3028] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="py-24 px-6 bg-[#fdf8f4]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c9a89a] text-xs tracking-[0.35em] uppercase mb-3">
            место проведения
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#2c2420]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Как добраться
          </h2>
          <div className="w-10 h-px bg-[#c9a89a]/50 mx-auto mt-4" />
        </div>

        <div className="bg-white rounded-2xl border border-[#e8d5cc] p-8 mb-6 shadow-sm">
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f5ede6] flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={18} className="text-[#c9a89a]" />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-[#9a8070] mb-1 font-light">
                  Адрес
                </p>
                <p className="text-[#2c2420] text-sm leading-relaxed">
                  41-й км Симферопольского шоссе,
                  <br />
                  вблизи д. Бережки, Подольск,
                  <br />
                  Московская обл., 142181
                </p>
              </div>
            </div>

            <div className="h-px bg-[#f5ede6]" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f5ede6] flex items-center justify-center flex-shrink-0">
                <Icon name="Car" size={18} className="text-[#c9a89a]" />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-[#9a8070] mb-1 font-light">
                  На машине
                </p>
                <p className="text-[#2c2420] text-sm leading-relaxed">
                  Парковка на территории ресторана, бесплатно для гостей.
                </p>
              </div>
            </div>


          </div>
        </div>


      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-[#2c2420] text-center">
      <p
        className="text-[#c9a89a] text-2xl mb-2"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
        }}
      >
        Алексей & Арина
      </p>
      <p className="text-[#6b5a52] text-xs tracking-widest uppercase font-light">
        22 августа 2026
      </p>
      <div className="flex justify-center gap-2 mt-6">
        <Icon name="Heart" size={12} className="text-[#c9a89a]/60" />
        <Icon name="Heart" size={12} className="text-[#c9a89a]/40" />
        <Icon name="Heart" size={12} className="text-[#c9a89a]/60" />
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen">
      <MusicPlayer />
      <Hero />
      <RSVPForm />
      <Venue />
      <Footer />
    </div>
  );
}