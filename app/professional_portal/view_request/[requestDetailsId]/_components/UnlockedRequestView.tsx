"use sever";

type props = {
  readonly requestDetails: RequestDetails;
};

const UnlockedRequestView = ({ requestDetails }: props) => {
  return (
    <div className="border p-4">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-semibold">{requestDetails.title}</div>
        <div className=" text-gray-500">{requestDetails.industry}</div>
        <div className="">{requestDetails.status}</div>
      </div>
      {/* <div className="mt-3">
        <span className="font-semibold">Contact:</span>{" "}
        {requestDetails.user_profile?.email}
      </div> */}
      <div className="border-t mt-3"></div>{" "}
      <div className="mt-3  italic">
        Estimated Project Timeframe: {requestDetails.duration}{" "}
        {requestDetails.duration_unit}
      </div>
      <div className="mt-3 leading-relaxed">{requestDetails.content}</div>
    </div>
  );
};

export default UnlockedRequestView;
