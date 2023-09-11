import React from "react";

const Page = ({
  params,
  searchParams,
}: {
  params: { requestDetailsId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <div>RequestDetailsPgae Id : {params.requestDetailsId}</div>;
};

export default Page;
