import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  heading = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "OK",
  cancelText = "Cancel",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 animate-fadeIn">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-gray-800">{heading}</h2>

        {/* Description */}
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
