"use client";
import PrimaryButton from "@/components/CustomButtons/PrimaryButton";
import React from "react";

import DashboardTable from "./DashboardTable";
import CreateRequestForm from "./RequestForm/CreateRequestForm";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { LuClipboardList } from "react-icons/lu";
import {
  Modal,
  ModalBody,
  ModalContent,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";

const Dashboard = () => {
  const { session, setFetchedRequestDetails, profileInfo } = useAppStore();
  const resultsShownEachPage = 3;
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [totalRow, setTotalRow] = React.useState<number>(1);

  const { isLoading } = useQuery(
    ["retrieveRequestDetails", session, profileInfo, currentPage, totalRow],
    async () => {
      if (session == null || currentPage == null) return null;
      const data = await axios.get(
        `/api/request/user_request?user_id=${session?.user.id}&from=${
          (currentPage - 1) * resultsShownEachPage
        }&to=${
          currentPage == totalPage
            ? totalRow
            : currentPage * resultsShownEachPage - 1
        }`
      );

      return data as any;
    },
    {
      onSuccess: (data) => {
        if (data) {
          setFetchedRequestDetails(data.data.data);
          setTotalRow(parseInt(data.data.count));
          setTotalPage(
            Math.ceil(parseInt(data.data.count) / resultsShownEachPage)
          );
        } else {
          setFetchedRequestDetails([]);
        }
      },
    }
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="md:px-4 md:py-5  bg-white md:min-w-[1000px] md:max-w-[1400px] rounded-[15px] shadow p-4 flex flex-col items-center justify-center gap-5">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="normal"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <CreateRequestForm
                onClose={() => {
                  onClose();
                }}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <div className="min-h-[200px] md:w-[900px] flex justify-center items-center flex-col gap-4 w-full rounded-md md:p-5">
        <div className="flex flex-row justify-between items-center p-2 w-full">
          <div className="text-xl flex items-center justify-center gap-2">
            <LuClipboardList />
            Your Requests
          </div>
          <div className="w-1/4 md:w-[200px]">
            <PrimaryButton
              action={() => {
                onOpen();
              }}
              text="Create"
              disabled={session === null}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="h-[200px]">
            <Spinner />
          </div>
        ) : (
          <div className="md:min-h-[200px]">
            <DashboardTable />
          </div>
        )}
        {!session && !isLoading && (
          <div className="text-subheading text-secondary h-[200px]">
            sign in now to view your requests!
          </div>
        )}
        {
          <Pagination
            showControls
            total={totalPage}
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
            isDisabled={profileInfo === null}
          />
        }
      </div>
    </div>
  );
};

export default Dashboard;
