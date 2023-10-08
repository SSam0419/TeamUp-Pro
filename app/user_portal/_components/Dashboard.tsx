"use client";
import PrimaryButton from "@/components/CustomButtons/PrimaryButton";
import React, { useEffect } from "react";

import DashboardTable from "./DashboardTable";
import CreateRequestForm from "./CreateRequestForm";
import { useQuery } from "react-query";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { LuClipboardList } from "react-icons/lu";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

const Dashboard = () => {
  const { session, setFetchedRequestDetails, profileInfo } = useAppStore();

  const { data: requestDetailsData, isLoading } = useQuery(
    ["retrieveRequestDetails", session, profileInfo],
    async () => {
      if (session == null) return null;
      const data = await axios.get(
        "/api/request/user_request?user_id=" + session?.user.id
      );

      return data;
    }
  );

  useEffect(() => {
    if (requestDetailsData)
      setFetchedRequestDetails(requestDetailsData.data.data);
    else setFetchedRequestDetails([]);
  }, [requestDetailsData, setFetchedRequestDetails]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="md:px-[30px] md:py-[10px]  bg-white md:min-w-[1000px] rounded-[15px] shadow p-4">
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

      <div className="flex flex-row justify-between items-center m-3 p-2">
        <div className="text-xl flex items-center justify-center gap-2">
          <LuClipboardList />
          Your Requests
        </div>
        <div>
          <PrimaryButton
            action={() => {
              onOpen();
            }}
            text="Create"
          />
        </div>
      </div>
      <div className="my-3 min-h-[500px] md:max-w-7xl flex justify-start items-center flex-col w-full md:shadow md:border rounded-md md:p-10">
        {isLoading ? <Spinner /> : <DashboardTable />}
        {!session && !isLoading && (
          <div className="text-subheading text-secondary">
            sign in now to view your requests!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
