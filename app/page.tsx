import React from "react";
import Navbar from "@/components/navbar"; 
import Hero from "@/components/hero"; 
import UmkmCard from "@/components/umkmCard";
import ReviewCard from "@/components/reviewCard";
import CategoryCard from "@/components/categoryCard";
import AboutSection from "@/components/aboutSection";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

// FUNGSI AMBIL DATA DARI DATABASE 
async function getPlaces() {
  const places = await prisma.place.findMany({
    where: { status: "APPROVED" }, 
    orderBy: { createdAt: 'desc' }, 
    take: 4, 
    include: { reviews: true } 
  });
  return places;
}

export default async function Home() {
  const places = await getPlaces();

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      <Hero />
      
      {/* SECTION 1: LAGI RAME*/}
      <section className="w-full bg-white pt-16 pb-4 px-16 md:px-[80px]">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[18px] font-bold text-gray-900">
            Lagi Rame Di Area Kamu
          </h2>
          <Link href="/explore" className="text-[#00BFA5] font-semibold hover:underline">
            Selengkapnya
          </Link>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* LOGIKA: Kalau belum ada data, tampilkan pesan kosong */}
          {places.length === 0 ? (
             <div className="col-span-4 py-10 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed">
                Belum ada tempat yang terdaftar. Yuk jadi mitra pertama!
             </div>
          ) : (
            // DATA TEMPAT (STATIC)
            places.map((place) => (
              <Link href={`/place/${place.id}`} key={place.id} className="block group">
                <UmkmCard 
                  image={place.images[0] || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"} 
                  title={place.name}
                  rating="4.8" 
                  location={place.address}
                  distance="0.5 km" 
                  hours="Buka Hari Ini"
                  badge={place.category} 
                  tags={[place.category, "Hits"]}
                  badgeColor={place.category === 'Ngops' ? 'bg-[#00BFA5]' : 'bg-[#FF6B6B]'} 
                />
              </Link>
            ))
          )}

        </div>
      </section>

      {/* SECTION 2: PROMO (STATIC)*/}
      <section className="w-full bg-white pt-4 pb-4 px-16 md:px-[80px]">
        
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[18px] font-bold text-gray-900">
            Tempat Asik Yang Lagi Promo
          </h2>
          <a href="#" className="text-[#00BFA5] font-semibold hover:underline">
            Selengkapnya
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card Promo 1 */}
          <UmkmCard 
            image="/images/sorespace.jpg" 
            title="Sore Space" rating="4.5" location="Sumedang" distance="2.3 km" hours="Tutup 02.00"
            badge="Cozy"
            promo="Beli 1 Dapat 1"
            tags={["Nongkrong", "Ngops"]}
          />
          {/* Card Promo 2 */}
          <UmkmCard 
            image="/images/sorespace.jpg" 
            title="Sore Space" rating="4.5" location="Sumedang" distance="2.3 km" hours="Tutup 02.00"
            badge="Cozy"
            promo="Diskon 50%"
            tags={["Nongkrong", "Ngops"]}
          />
           {/* Card Promo 3 (Placeholder) */}
           <UmkmCard 
            image="/images/sorespace.jpg" 
            title="Sore Space" rating="4.5" location="Sumedang" distance="2.3 km" hours="Tutup 02.00"
            badge="Cozy"
            promo="Hemat"
            tags={["Nongkrong", "Ngops"]}
          />
           {/* Card Promo 4 (Placeholder) */}
           <UmkmCard 
            image="/images/sorespace.jpg" 
            title="Sore Space" rating="4.5" location="Sumedang" distance="2.3 km" hours="Tutup 02.00"
            badge="Cozy"
            promo="Beli 1 Dapat 1"
            tags={["Nongkrong", "Ngops"]}
          />
        </div>
      </section>

      {/* SECTION 3: UMKM LOKAL (STATIC) */}
      <section className="w-full bg-white pt-4 pb-4 px-16 md:px-[80px]">
        
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[18px] font-bold text-gray-900">
            UMKM Lokal Yang Wajib Kamu Tau
          </h2>
          <a href="#" className="text-[#00BFA5] font-semibold hover:underline">
            Selengkapnya
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card Lokal 1 */}
          <UmkmCard 
            image="/images/warungbuimas.jpg" 
            title="Warung Bu Imas" rating="4.9" location="Gg. Unsap" distance="1.0 km" hours="Mulai dari 10rb"
            badge="Asli Lokal"
            description="Sambelnya bikin inget masakan Ibu di rumah."
          />
          <UmkmCard 
            image="/images/warungbuimas.jpg" 
            title="Warung Bu Imas" rating="4.9" location="Gg. Unsap" distance="1.0 km" hours="Mulai dari 10rb"
            badge="Asli Lokal"
            description="Sambelnya bikin inget masakan Ibu di rumah."
          />
           <UmkmCard 
            image="/images/warungbuimas.jpg" 
            title="Warung Bu Imas" rating="4.9" location="Gg. Unsap" distance="1.0 km" hours="Mulai dari 10rb"
            badge="Asli Lokal"
            description="Sambelnya bikin inget masakan Ibu di rumah."
          />
           <UmkmCard 
            image="/images/warungbuimas.jpg" 
            title="Warung Bu Imas" rating="4.9" location="Gg. Unsap" distance="1.0 km" hours="Mulai dari 10rb"
            badge="Asli Lokal"
            description="Sambelnya bikin inget masakan Ibu di rumah."
          />
        </div>
      </section>

      {/* SECTION 4: REVIEW (STATIC) */}
      <section className="w-full bg-white pt-4 pb-4 px-6 md:px-[80px]">
        
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[18px] font-bold text-gray-900">
            Apa Yang Di Ceritakan Oleh Mereka
          </h2>
          <a href="#" className="text-[#00BFA5] font-semibold text-sm md:text-base hover:underline">
            Selengkapnya
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <ReviewCard 
             avatar="/images/budi.jpeg" 
             name="Budiansyah"
             place="Sore Space"
             rating="4.5"
             review="Tempatnyaa cozy bangettttt, cocok sama namanyaa kalau datang sore-sore tuh syahdu sekaliiiii."
             tags={["Cozy", "Nugasable"]}
           />
           <ReviewCard 
             avatar="/images/budi.jpeg" 
             name="Siti Maemunah"
             place="Kopi Kenangan"
             rating="5.0"
             review="Kopinya enak banget, baristanya ramah. Cocok buat yang mau WFC seharian."
             tags={["WFC", "Kopi"]}
           />
           <ReviewCard 
             avatar="/images/budi.jpeg" 
             name="Asep Stroberi"
             place="Warung Bu Imas"
             rating="4.8"
             review="Sambel karedoknya juara dunia! Pedesnya nampol tapi bikin nagih."
             tags={["Kuliner", "Pedas"]}
           />
        </div>
      </section>

      {/* SECTION 5: KATEGORI (STATIC) */}
      <section className="w-full bg-white pt-4 pb-24 px-6 md:px-[80px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-gray-900">
            Lagi Pengen ke Mana?
          </h2>
          <a href="#" className="text-[#00BFA5] font-semibold text-sm md:text-base hover:underline">
            Selengkapnya
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
           <CategoryCard name="Ngops" image="/images/ngops.jpg" />
           <CategoryCard name="Spot Nugas" image="/images/spotnugas.jpg" />
           <CategoryCard name="Harga Mahasiswa" image="/images/hargamahasiswa.jpg" />
           <CategoryCard name="Hidden Gem" image="/images/hidden.jpg" />
        </div>
      </section>
      
      <AboutSection />

    </main>
  );
}