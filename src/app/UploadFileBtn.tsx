import { ChangeEvent, useRef } from "react";

export function UploadFileBtn({ text, onFileUploaded }: UploadFileBtnProps) {
  const fileInputRef = useRef(undefined as unknown as HTMLInputElement);
  const handleBtnClick = () => fileInputRef.current.click();
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    onFileUploaded(await file.text(), file.name);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleBtnClick}
        className="p-2 bg-gradient-to-br from-orange-300 to-amber-300 content-center rounded-md pl-5 pr-5"
      >
        {text}
      </button>
    </>
  );
}

export interface UploadFileBtnProps {
  text: string;
  onFileUploaded: (contents: string, filename: string) => void;
}
