import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import classnames from "classnames";
import { i18n_upload as i18n } from "i18n/i18n";
import config from "config";
import Button from "components/widgets/Button/Button";

import "./FieldUpload.scss";

// TODO: finish partial implementation
// TODO: save file on server

// #region ---------------- Helpers ----------------
const DOC = "document";
const IMG = "image";

const imageTypes = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

const { filesUrl } = config;

const docLink = (d, path) => (
  <a
    key="doclink"
    href={encodeURI(path + d)}
    target="_blank"
    rel="noopener noreferrer"
  >
    {d}
  </a>
);

export const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
// #endregion

const FieldUpload = ({ id, docType, value, onChange }) => {
  // - covers "image" and  "document" field types
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const maxSize = docType === IMG ? 200000 : 2000000;
  const maxSizeTxt = docType === IMG ? "200KB" : "2MB";

  const onDropFile = useCallback(
    (files, invalids) => {
      if (files?.length) {
        // const formData = new FormData();
        // formData.append("filename", file);
        setFile(files[0]);
        convertFileToBase64(files[0]).then((base64File) =>
          setPreview(base64File)
        );
      }
      if (invalids?.length) {
        const errorCode = invalids[0].errors[0].code;
        let msg = i18n[errorCode] || "Upload error.";
        if (errorCode === "file-invalid-type") {
          msg = msg.replace("{0}", imageTypes.join(", "));
        } else if (errorCode === "file-too-large") {
          msg = msg.replace("{0}", maxSizeTxt);
        }
        toast.error(msg);
      }
    },
    [maxSizeTxt]
  );

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (value) {
      onChange({
        target: {
          id,
          value: "",
        },
      });
    }
  };

  let pix = [];
  if (preview || value) {
    const removeButton = (
      <Button
        key="remove"
        className="btn-remove"
        type="default"
        icon="remove"
        label={i18n.remove}
        onClick={removeFile}
      />
    );
    if (docType === IMG) {
      pix.push(
        <img
          key="pix"
          className="img-thumbnail"
          src={preview || filesUrl + value}
          alt=""
        />,
        removeButton
      );
    }
    if (file) {
      pix.push(
        <div key="fname" className="filename">
          <span className="file-name">{file.name}</span>
          <span className="file-size">({Math.round(file.size / 1000)} KB)</span>
        </div>
      );
    } else {
      pix.push(docLink(value, filesUrl));
    }
    if (docType === DOC) {
      pix.push(removeButton);
    }
  }

  const dropzoneProps = {
    onDrop: onDropFile,
    noKeyboard: true,
    multiple: false,
    maxSize,
  };
  if (docType === IMG) {
    dropzoneProps.accept = {
      "image/png": imageTypes,
    };
  }

  return (
    <div data-testid={"field-" + docType}>
      {pix}
      <Dropzone {...dropzoneProps}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={classnames("doc-drop dropzone", {
              "dropzone--isActive": isDragActive,
            })}
          >
            <input {...getInputProps()} id={id} />
            <p>{i18n[isDragActive ? "dropFileActive" : "dropFile"]}</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FieldUpload;

FieldUpload.propTypes = {
  /** Field id */
  id: PropTypes.string.isRequired,
  /** Field Type ("image" or  "document") */
  docType: PropTypes.oneOf([IMG, DOC]).isRequired,
  /** Callback functions for changed field value */
  onChange: PropTypes.func.isRequired,
  /** Field value (image/document file path) */
  value: PropTypes.string,
};

FieldUpload.defaultProps = {
  value: null,
};
