export const ConsoleLog = ({
  route,
  requestType,
}: {
  route: string;
  requestType: string;
}) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  console.log("--------");
  console.log(
    `Server Log: Making ${requestType} request at ${formattedDate} to route: ${route}`
  );
  console.log("--------");
};
