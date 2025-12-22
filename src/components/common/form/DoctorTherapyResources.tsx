"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { resourceSchema } from "../../../../validations";

interface AddDoctorTherapyResourcesFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddDoctorTherapyResourcesForm = ({
  onClose,
  onSuccess,
}: AddDoctorTherapyResourcesFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resourceSchema),
    defaultValues: {
      type: "link",
    },
  });

  const selectedType = watch("type");

  const onSubmit = (data: any) => {
    console.log("Therapy Resource:", data);
  };

  return (
    <div className="w-full p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold">افزودن منبع جدید</h2>

        {/* عنوان */}
        <div className="space-y-1">
          <label className="text-sm font-medium">عنوان</label>
          <Input
            {...register("title")}
            placeholder="مثلاً تمرین تنفس روزانه"
            className="bg-white"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* نوع منبع */}
        <div className="space-y-1">
          <label className="text-sm font-medium">نوع منبع</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                dir="rtl"
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-full text-right bg-white">
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent className="z-1000">
                  <SelectItem value="link" className="text-right">
                    لینک
                  </SelectItem>
                  <SelectItem value="file" className="text-right">
                    فایل
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* توضیحات */}
        <div className="space-y-1">
          <label className="text-sm font-medium">توضیحات (اختیاری)</label>
          <Textarea
            {...register("description")}
            placeholder="توضیح کوتاه برای مراجع"
            className="bg-white"
          />
        </div>

        {/* لینک یا فایل */}
        {selectedType === "link" && (
          <div className="space-y-1">
            <label className="text-sm font-medium">لینک</label>
            <Input
              {...register("link")}
              placeholder="https://example.com"
              className="bg-white"
            />
            {errors.link && (
              <p className="text-red-500 text-sm">{errors.link.message}</p>
            )}
          </div>
        )}

        {selectedType === "file" && (
          <div className="space-y-1">
            <label className="text-sm font-medium">فایل</label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  className="bg-white"
                />
              )}
            />
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file.message}</p>
            )}
          </div>
        )}

        {/* اکشن‌ها */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            بازگشت
          </Button>
          <Button type="submit">ذخیره منبع</Button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorTherapyResourcesForm;
