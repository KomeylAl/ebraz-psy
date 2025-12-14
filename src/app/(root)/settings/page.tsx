"use client";

import Header from "@/components/layout/Header";

const Settings = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <div className="w-full flex flex-col p-12">
        <div className="w-full h-full space-y-6">
          <h2 className="font-bold text-2xl">تنظیمات</h2>
          <div className="w-full h-full flex items-center justify-center">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
