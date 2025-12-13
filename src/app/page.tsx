"use client";

import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="flex-1 h-screen overflow-y-auto flex flex-col">
      <Header isShowSearch={false} searchFn={() => {}} />

      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">داشبورد روان‌درمانگر</h2>
        </div>
        
        <div className="mt-12 flex-1">

        </div>
      </div>
    </div>
  );
}
