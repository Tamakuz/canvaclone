import Link from "next/link";
import Banner from "./components/dashboard/Banner";
import Sidebar from "./components/dashboard/Sidebar";
import Navbar from "./components/dashboard/Navbar";
import TemplateSection from "./components/dashboard/TemplateSection";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="bg-muted h-full">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col h-full relative">
        <Navbar />
        <main className="bg-white mt-[68px] h-[calc(100vh-68px)] rounded-tl-2xl">
          <ScrollArea className="h-full">
            <div className="space-y-8 p-8">
              <Banner />
              <TemplateSection />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
