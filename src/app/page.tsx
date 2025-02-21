import Image from "next/image";
import {CategoryNav} from "@/components/category-nav";
import {FeaturedArticles} from "@/components/featured-articles";
import {LatestNews} from "@/components/latest-news";
import {Newsletter} from "@/components/newsletter";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CategoryNav />
        <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
                <FeaturedArticles />
                <LatestNews />
            </div>
            <aside className="md:col-span-4">
                <Newsletter />
            </aside>
        </div>
    </div>
  );
}
