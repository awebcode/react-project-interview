import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const ImageInput = ({ onImageUpload, name, setValue, clearErrors, error }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          onImageUpload(file); // Pass file to parent component
          setValue(name, file); // Manually set value in react-hook-form
          clearErrors(name); // Clear any validation errors
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload, name, setValue, clearErrors]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-dashed border-2 border-blue-500 rounded-lg p-8 flex items-center justify-center cursor-pointer transition ${
        isDragActive ? "bg-blue-100 border-blue-400" : "bg-gray-50 border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {!preview ? (
        <p className="text-gray-500">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop a photo, or click to select one"}
        </p>
      ) : (
        <div className="flex flex-col items-center  overflow-hidden">
          <img src={preview} alt="Preview" className="h-40 w-full object-cover" />
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

ImageInput.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default ImageInput;
