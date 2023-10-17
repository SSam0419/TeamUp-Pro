export const ConsoleLog = ({
  route,
  requestType,
}: {
  route: string;
  requestType: string;
}) => {
  return console.log(
    `Server Log : making ${requestType} request at : ${route}`
  );
};
