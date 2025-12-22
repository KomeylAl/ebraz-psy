"use client";

import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { PuffLoader } from "react-spinners";
import Table from "@/components/common/Table";
import { appointmentColumns } from "@/lib/columns";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/common/modal/Modal";
import AddDoctorTherapyResourcesForm from "@/components/common/form/DoctorTherapyResources";
import { useResources } from "@/hooks/useResources";
import { resourceApiType } from "@/types";

const Resources = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [resourceId, setResourceId] = useState<string>("");
  const [resource, setResource] = useState<resourceApiType>();

  const {
    data: baseData,
    isLoading: baseLoading,
    error: baseError,
    refetch,
  } = useResources(page, pageSize, search);

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: editOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: deleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const debouncedSearch = useCallback(
    debounce((text) => {
      refetch();
    }, 300),
    [refetch]
  );

  const onSearchChange = (e: any) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header searchFn={onSearchChange} isShowSearch />
      <div className="w-full flex flex-col p-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-xl font-bold">منابع درمانی پیشنهادی</h2>
            <Button
              className="py-2 bg-blue-600 rounded-md text-white text-center placeholder-white"
              onClick={openModal}
            >
              افزودن منبع
            </Button>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center mt-8">
          {baseLoading && <PuffLoader size={60} color="#3e86fa" />}

          {baseError && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-rose-500">خطا در دریافت اطلاعات</p>
            </div>
          )}

          {baseData && (
            <Table
              data={baseData.data}
              columns={appointmentColumns}
              currentPage={baseData.meta.current_page}
              pageSize={baseData.meta.per_page}
              totalItems={baseData.meta.total}
              onPageChange={(newPage) => {
                setPage(newPage);
              }}
              onEdit={(item: any) => {
                setResourceId(item.referral_id);
                setResource(item);
                openEditModal();
              }}
              onDelete={(item: any) => {
                setResourceId(item.referral_id);
                openDeleteModal();
              }}
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        showCloseButton={false}
        className="max-w-[700px] bg-white"
      >
        <AddDoctorTherapyResourcesForm
          onClose={closeModal}
          onSuccess={() => {
            closeModal();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};

export default Resources;
