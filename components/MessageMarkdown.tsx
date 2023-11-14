import React from "react";
import DOMPurify from "dompurify";

export const MessageMarkdown = ({ message }: { message: string }) => {
  const sanitizedHTML = DOMPurify.sanitize(message);

  return (
    <div className="">
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizedHTML,
        }}
      />
    </div>
  );
};

export const notifyUserPitchMessage = ({
  url,
  title,
}: {
  url: string;
  title: string;
}) => {
  return `<div className="" style="font-size: 16px; color: #333;">
  You have received a new pitch for your request: <strong>${title}</strong><br><br>
  <a href="${url}" target="_blank" style="text-decoration: underline; color: blue;">Visit it now</a>
</div>`;
};
