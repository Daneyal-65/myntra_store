import React from "react";
import { Dog, Loader } from "lucide-react";
// modal component
const Modal = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin">
          <Loader />
        </div>
        <Dog width={25} height={23} />
        <p className="mt-3 text-gray-600 font-medium">
          Noting You Have Added !
        </p>
      </div>
    </div>
  );
};

export default Modal;
