"use client";
import React, { Suspense } from "react";
import { useQuery } from "react-query";

const getData = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000); // Wait for 2 seconds
  });
  return ["a", "b"];
};

const Page = () => {
  const { data, isLoading } = useQuery(["asdf"], getData);
  // const data = await getData();
  console.log(data);
  if (isLoading) {
    return <p>loading ...</p>;
  }
  return (
    <Suspense fallback={<p>loading ...</p>}>
      <div>Page</div>
    </Suspense>
  );
};

export default Page;
