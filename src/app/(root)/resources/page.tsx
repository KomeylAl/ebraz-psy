"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { Trash2, Link as LinkIcon, FileText } from "lucide-react";
import Header from "@/components/layout/Header";

const DoctorTherapyResourcesTab = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      resources: [
        {
          title: "",
          description: "",
          type: "link",
          url: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "resources",
  });

  const onSubmit = (data: any) => {
    console.log("Therapy Resources:", data);
    // بعداً وصل می‌کنیم به API
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={() => {}} isShowSearch={false} />
      <div className="w-full p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-bold">منابع درمانی پیشنهادی</h2>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md space-y-2 relative"
            >
              <div className="flex gap-2 items-center">
                <Input
                  {...register(`resources.${index}.title`)}
                  placeholder="عنوان"
                  className="bg-white"
                />

                <select
                  {...register(`resources.${index}.type`)}
                  className="bg-white border rounded-md px-2"
                >
                  <option value="link">لینک</option>
                  <option value="file">فایل</option>
                </select>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <Textarea
                {...register(`resources.${index}.description`)}
                placeholder="توضیح کوتاه (اختیاری)"
                className="bg-white"
              />

              <Input
                {...register(`resources.${index}.url`)}
                placeholder="لینک (یا بعداً فایل)"
                className="bg-white"
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                title: "",
                description: "",
                type: "link",
                url: "",
              })
            }
          >
            + افزودن منبع جدید
          </Button>

          <Button type="submit">ذخیره منابع</Button>
        </form>
      </div>
    </div>
  );
};

export default DoctorTherapyResourcesTab;
