import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft, ArrowRight, ChevronRight, Coffee, Instagram, Leaf,
  MapPin, Menu, ShieldCheck, ShoppingBag, Sparkles, Utensils,
  X, ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import storefront from "@/assets/urban-cafe-storefront.jpg";
import mango from "@/assets/mango-shake.jpg";
import pizza from "@/assets/loaded-veg-pizza.jpg";
import panini from "@/assets/classic-panini.jpg";
import brownie from "@/assets/brownie-icecream.jpg";
import interior from "@/assets/cafe-interior.jpg";
import juice from "@/assets/green-juice.jpg";
import fries from "@/assets/snacks-fries.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Urban Juice Cafe | Fresh Food in Vasai West" },
    { name: "description", content: "Fresh juices, shakes, pizzas, panini and good vibes at Urban Juice Cafe in Vasai West." },
    { property: "og:title", content: "Urban Juice Cafe — Vasai West" },
    { property: "og:description", content: "Fresh food, refreshing drinks and good vibes in Jayraj Nagar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const nav = ["Home", "Menu", "About", "Gallery", "Reviews", "Contact"];
const categories = [
  ["Fresh Juices", juice], ["Shakes", mango], ["Pizzas", pizza],
  ["Panini", panini], ["Snacks", fries], ["Desserts", brownie],
] as const;
const foods = [
  { name: "Mango Shake", price: "₹120", copy: "Thick, creamy and full of real mangoes.", image: mango },
  { name: "Loaded Veg Pizza", price: "₹220", copy: "Fresh veggies, cheesy delight.", image: pizza },
  { name: "Classic Panini", price: "₹180", copy: "Grilled to perfection.", image: panini },
  { name: "Brownie with Ice Cream", price: "₹150", copy: "A perfect sweet ending.", image: brownie },
];
const testimonials = [
  ["Amazing juices and super tasty food! One of the best cafes in Vasai West. Must visit!", "Google Review"],
  ["The mango shake is wonderfully fresh, and the cafe has such a calm, friendly vibe.", "Local Guide"],
  ["Perfect evening stop for pizza and cold coffee. Warm service and a lovely green interior.", "Google Review"],
];

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`inline-flex shrink-0 items-center justify-center ${light ? "h-[112px] w-[220px] rounded-md bg-cream p-1" : "h-[58px] w-[116px] sm:h-[66px] sm:w-[132px] lg:h-[72px] lg:w-[150px]"}`} aria-label="Urban Juice Cafe home">
    <img src="/urban-juice-logo.png" alt="Urban Juice Cafe" className="h-full w-full object-fill" />
  </a>;
}

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [review, setReview] = useState(0);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) {
        const sectionId = visible.target.id;
        setActive(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
      }
    }, { threshold: [0.15, 0.45], rootMargin: "-20% 0px -60%" });
    nav.forEach((item) => { const el = document.getElementById(item.toLowerCase()); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const openOrder = () => { setOrdered(false); setOrderOpen(true); };
  const submitOrder = (event: FormEvent) => { event.preventDefault(); setOrdered(true); };
  const currentTestimonial = testimonials[review] ?? testimonials[0] ?? ["", "Google Review"];
  return <main className="bg-cream text-foreground">
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="hidden bg-forest-deep text-cream/85 lg:block">
        <div className="mx-auto grid h-8 max-w-7xl grid-cols-3 items-center px-6 text-[0.66rem]">
          <span className="flex items-center gap-1.5"><MapPin size={12}/> Shop No F11, Jayraj Nagar, UJC Vasai West</span>
          <span className="text-center tracking-wide">Fresh Juices&nbsp; | &nbsp;Tasty Food&nbsp; | &nbsp;Good Vibes</span>
          <span className="flex items-center justify-end gap-3"><Instagram size={13}/></span>
        </div>
      </div>
      <div className="bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-6">
          <div className="flex min-w-0 items-center gap-4 lg:gap-8">
            <Brand />
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
              {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={`relative py-3 text-xs font-bold transition-colors hover:text-lime-strong ${active === item ? "text-forest after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:bg-lime-strong" : "text-foreground/70"}`}>{item}</a>)}
            </nav>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="cafeDark" className="hidden rounded-full lg:inline-flex" onClick={openOrder}>Order Now <ShoppingBag/></Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Open navigation">{mobileOpen ? <X/> : <Menu/>}</Button>
          </div>
        </div>
        {mobileOpen && <nav className="reveal-up border-t border-border bg-cream px-5 py-4 lg:hidden">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block border-b border-border/60 py-3 text-sm font-bold">{item}</a>)}<Button variant="cafeDark" className="mt-4 w-full" onClick={openOrder}>Order Now <ShoppingBag/></Button></nav>}
      </div>
    </header>

    <section id="home" className="relative isolate min-h-[570px] overflow-hidden lg:min-h-[590px]">
      <img src={storefront} width={1600} height={900} alt="A welcoming green cafe storefront surrounded by plants" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--forest-deep)_0%,color-mix(in_oklab,var(--forest-deep)_92%,transparent)_37%,color-mix(in_oklab,var(--forest-deep)_32%,transparent)_70%,transparent_100%)] max-lg:bg-forest-deep/72" />
      <div className="mx-auto flex min-h-[570px] max-w-7xl items-center px-5 py-14 lg:min-h-[590px] lg:px-6">
        <div className="reveal-up max-w-xl text-cream">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-lime">Fresh bites, bright vibes</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.92] sm:text-6xl lg:text-7xl">Good Food<br/><span className="font-script text-[1.18em] font-medium text-lime">Brighter Days</span></h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-cream/85 sm:text-base">Fresh juices, delicious food and a cozy space<br className="hidden sm:block"/> in the heart of Vasai West.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button variant="cafe" size="lg" onClick={openOrder}>Order Now <ArrowRight/></Button><Button variant="cafeOutline" size="lg" asChild><a href="#menu">View Menu</a></Button></div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4">
            {[[Leaf,"Fresh Ingredients"],[Utensils,"Variety of Choices"],[ShieldCheck,"Hygienic & Safe"],[Coffee,"Cozy Place"]].map(([Icon,label]) => { const I = Icon as typeof Leaf; return <div key={label as string} className="flex items-center gap-2 text-[0.68rem] font-semibold"><I className="shrink-0 text-lime" size={21}/><span>{label as string}</span></div> })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 right-[7%] hidden rotate-[-8deg] font-script text-4xl leading-tight text-cream/90 xl:block">Juice<br/>Food<br/>Happiness</div>
    </section>

    <section aria-label="Menu categories" className="border-b border-border bg-cream py-7">
      <div className="mx-auto flex max-w-6xl snap-x gap-8 overflow-x-auto px-5 pb-2 sm:justify-between sm:overflow-visible">
        {categories.map(([name,image]) => <a href="#menu" key={name} className="group w-24 shrink-0 snap-center text-center"><span className="mx-auto block h-[74px] w-[74px] overflow-hidden rounded-full border-4 border-secondary shadow-sm transition-transform duration-300 group-hover:-translate-y-1"><img src={image} alt="" width={160} height={160} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"/></span><span className="mt-2 block text-xs font-bold">{name}</span></a>)}
      </div>
    </section>

    <section id="menu" className="mx-auto max-w-7xl px-5 py-16 lg:px-6 lg:py-20">
      <div className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div><p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-lime-strong">Our specials</p><h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Customer Favorites</h2><p className="mt-1 text-sm text-muted-foreground">Handpicked treats that make every visit special.</p></div><a href="#menu" className="hidden items-center gap-1 text-xs font-bold text-forest hover:text-lime-strong sm:flex">View Full Menu <ArrowRight size={14}/></a></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{foods.map((food) => <article key={food.name} className="group overflow-hidden rounded-lg bg-card shadow-[0_8px_30px_color-mix(in_oklab,var(--forest)_7%,transparent)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_color-mix(in_oklab,var(--forest)_14%,transparent)]"><div className="aspect-[4/3] overflow-hidden"><img src={food.image} alt={food.name} width={900} height={700} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/></div><div className="p-4"><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><h3 className="font-display text-sm font-bold">{food.name}</h3><span className="text-sm font-extrabold">{food.price}</span></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{food.copy}</p></div></article>)}</div>
    </section>

    <section id="about" className="relative overflow-hidden bg-forest-deep text-cream">
      <Leaf className="leaf-float absolute -bottom-10 -left-10 h-40 w-40 rotate-[-25deg] text-lime/10"/>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
        <div><p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-lime">Our story</p><h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">More Than Just a Cafe</h2><p className="mt-5 max-w-lg text-sm leading-7 text-cream/75">Urban Juice Cafe is your go-to spot for fresh juices, delicious food and good company. We bring together healthy choices and tasty favourites in a relaxed and friendly space.</p><div className="my-8 grid grid-cols-3 gap-4">{[["100%","Fresh Ingredients"],["1.5K+","Happy Customers"],["4.1★","Google Rating"]].map(([number,label]) => <div key={label}><strong className="text-2xl text-lime sm:text-3xl">{number}</strong><span className="mt-1 block text-[0.65rem] text-cream/70">{label}</span></div>)}</div><Button variant="cafeOutline" asChild><a href="#gallery">Our Story <ArrowRight/></a></Button></div>
        <div className="relative mx-auto h-[420px] w-full max-w-[620px] sm:h-[500px]"><div className="absolute left-[4%] top-4 h-[84%] w-[57%] rotate-[-3deg] overflow-hidden rounded-lg border-2 border-cream/80 shadow-2xl"><img src={interior} alt="Warm green cafe interior" width={1000} height={1200} loading="lazy" className="h-full w-full object-cover"/></div><div className="absolute bottom-0 right-[2%] h-[68%] w-[47%] rotate-3 overflow-hidden rounded-lg border-2 border-cream/80 shadow-2xl"><img src={juice} alt="Fresh green juice" width={800} height={1100} loading="lazy" className="h-full w-full object-cover"/></div><span className="absolute bottom-3 right-[26%] rotate-[-8deg] font-script text-2xl text-cream sm:text-3xl">Healthy Choices<br/>Happier You</span></div>
      </div>
    </section>

    <section id="reviews" className="bg-cream"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:px-6 lg:py-20"><div><p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-lime-strong">What our customers say</p><h2 className="mt-2 font-display text-3xl font-bold">Loved by Foodies</h2><div className="mt-3 text-xl tracking-[0.14em] text-gold">★★★★★</div><blockquote className="mt-4 max-w-xl text-sm italic leading-7 text-foreground/75">“{currentTestimonial[0]}”</blockquote><p className="mt-2 text-xs text-muted-foreground">— {currentTestimonial[1]}</p></div><div className="flex items-center gap-4"><Button variant="outline" size="icon" className="rounded-full" aria-label="Previous review" onClick={() => setReview((review + testimonials.length - 1) % testimonials.length)}><ArrowLeft/></Button><div className="flex gap-2">{testimonials.map((_,i) => <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === review ? "bg-forest" : "bg-border"}`}/>)}</div><Button variant="outline" size="icon" className="rounded-full" aria-label="Next review" onClick={() => setReview((review + 1) % testimonials.length)}><ArrowRight/></Button></div></div></section>

    <section id="gallery" className="bg-secondary/55 py-16 lg:py-20"><div className="mx-auto max-w-7xl px-5 lg:px-6"><div className="mb-7 flex items-end justify-between"><div><p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-lime-strong">From our table</p><h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">A Taste of Urban</h2></div><span className="font-script text-2xl text-forest/70">Made fresh, always</span></div><div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:grid-cols-4">{[[storefront,"Cafe exterior","col-span-2 row-span-2"],[interior,"Cafe interior","row-span-2"],[juice,"Fresh green juice",""] ,[pizza,"Loaded vegetable pizza",""] ,[panini,"Classic panini",""] ,[brownie,"Brownie and ice cream",""]].map(([image,label,span]) => <figure key={label} className={`group relative overflow-hidden rounded-lg ${span}`}><img src={image} alt={label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/><div className="absolute inset-0 grid place-items-center bg-forest-deep/0 text-cream opacity-0 transition group-hover:bg-forest-deep/45 group-hover:opacity-100"><ZoomIn/></div></figure>)}</div></div></section>

    <section className="bg-forest text-cream"><div className="relative mx-auto grid max-w-7xl items-center gap-7 overflow-hidden px-5 py-14 sm:grid-cols-[1fr_auto] lg:px-6"><Leaf className="leaf-float absolute right-[38%] top-4 h-20 w-20 text-lime/15"/><div><p className="font-script text-3xl text-lime">Fresh cravings?</p><h2 className="font-display text-4xl font-bold">Hungry Yet?</h2><p className="mt-2 max-w-lg text-sm leading-6 text-cream/75">Fresh food, refreshing drinks and good vibes are waiting for you.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button variant="cafe" size="lg" onClick={openOrder}>Order Now <ShoppingBag/></Button><Button variant="cafeOutline" size="lg" asChild><a href="https://www.google.com/maps/search/?api=1&query=Urban+Juice+Cafe%2C+Jayraj+Nagar%2C+Vasai+West" target="_blank" rel="noreferrer">Get Directions <MapPin/></a></Button></div></div></section>

    <footer id="contact" className="bg-forest-deep text-cream"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr] lg:px-6"><div><Brand light/><p className="mt-5 max-w-sm text-xs leading-6 text-cream/60">A fresh little corner in Vasai West for wholesome sips, comforting bites and happier days.</p></div><div><h3 className="mb-4 text-xs font-bold">Quick Links</h3><div className="grid grid-cols-2 gap-x-6 gap-y-2">{nav.map((item) => <a key={item} className="text-xs text-cream/65 hover:text-lime" href={`#${item.toLowerCase()}`}>{item}</a>)}</div></div><div><h3 className="mb-4 text-xs font-bold">Contact Us</h3><p className="flex gap-2 text-xs leading-5 text-cream/65"><MapPin size={15} className="shrink-0 text-lime"/>Shop No F11, Jayraj Nagar,<br/> UJC Vasai West</p><div className="mt-4 flex gap-3"><a href="#contact" aria-label="Instagram"><Instagram size={17}/></a></div></div></div><div className="mx-auto grid max-w-7xl gap-2 border-t border-cream/15 px-5 py-5 text-[0.62rem] text-cream/50 sm:grid-cols-2 lg:px-6"><span>© 2026 Urban Juice Cafe. All rights reserved.</span><span className="sm:text-right">Fresh Food • Fresh People • A Happier You</span></div></footer>

    <Dialog open={orderOpen} onOpenChange={setOrderOpen}><DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto rounded-xl border-border bg-cream p-5 sm:p-7">{ordered ? <div className="py-10 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime/20 text-forest"><Sparkles size={30}/></span><DialogTitle className="mt-5 font-display text-2xl">Thanks!</DialogTitle><DialogDescription className="mx-auto mt-3 max-w-sm leading-6">Your order request has been received. Urban Juice Cafe will contact you shortly.</DialogDescription><Button variant="cafeDark" className="mt-6" onClick={() => setOrderOpen(false)}>Done</Button></div> : <><DialogHeader><DialogTitle className="font-display text-2xl text-forest">What would you like to order?</DialogTitle><DialogDescription>Pick a category, then tell us your details.</DialogDescription></DialogHeader><div className="grid grid-cols-3 gap-2">{categories.map(([name]) => <button type="button" key={name} className="rounded-lg border border-border bg-card px-2 py-3 text-xs font-semibold transition hover:border-lime hover:bg-lime/10">{name === "Fresh Juices" ? "🧃" : name === "Shakes" ? "🥤" : name === "Pizzas" ? "🍕" : name === "Panini" ? "🥪" : name === "Snacks" ? "🍟" : "🍨"}<span className="mt-1 block">{name}</span></button>)}</div><form onSubmit={submitOrder} className="mt-2 space-y-3"><Input required aria-label="Name" placeholder="Name" className="h-11 bg-card"/><Input required type="tel" aria-label="Phone" placeholder="Phone" className="h-11 bg-card"/><Select required><SelectTrigger className="h-11 bg-card"><SelectValue placeholder="Select Item"/></SelectTrigger><SelectContent>{foods.map((food) => <SelectItem key={food.name} value={food.name}>{food.name} — {food.price}</SelectItem>)}</SelectContent></Select><Input required type="number" min="1" max="20" defaultValue="1" aria-label="Quantity" className="h-11 bg-card"/><Button variant="cafeDark" size="lg" className="w-full" type="submit">Place Order <ChevronRight/></Button></form></>}</DialogContent></Dialog>
  </main>;
}