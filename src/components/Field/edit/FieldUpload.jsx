import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import classnames from "classnames";
import { i18n_actions as i18n } from "../../../i18n/i18n";
import config from "../../../config";
import Button from "../../widgets/Button/Button";

import "../Field.scss";

// TODO: finish partial implementation
// TODO: save file on server

// #region ---------------- Helpers ----------------
const { filesUrl } = config;

const doc = (d, path) => (
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

const FieldUpload = ({ fieldDef, value, onChange }) => {
  // - covers "image" and  "document" field types
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const f = fieldDef;

  const onDropFile = (files) => {
    if (files.length) {
      // const formData = new FormData();
      // formData.append("filename", file);
      setFile(files[0]);
      convertFileToBase64(files[0]).then((base64File) =>
        setPreview(base64File)
      );
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (value) {
      onChange({
        target: {
          id: f.id,
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
    if (f.type === "image") {
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
          {file.name + " "}
          <span>{Math.round(file.size / 1000)} KB</span>
        </div>
      );
    } else {
      pix.push(doc(value, filesUrl));
    }
    if (f.type === "document") {
      pix.push(removeButton);
    }
  }

  const dropzoneProps = {
    onDrop: onDropFile,
    noKeyboard: true,
    multiple: false,
    maxSize: 200000, // 200KB
  };
  if (f.type === "image") {
    dropzoneProps.accept = { "image/png": [".png", ".jpg", ".jpeg", ".webp"] };
  }

  return (
    <div data-testid={"field-" + f.type}>
      {pix}
      <Dropzone {...dropzoneProps}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={classnames("doc-drop dropzone", {
              "dropzone--isActive": isDragActive,
            })}
          >
            <input {...getInputProps()} />
            <p>{i18n[isDragActive ? "dropFileActive" : "dropFile"]}</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FieldUpload;

FieldUpload.propTypes = {
  /** Field metadata */
  fieldDef: PropTypes.object.isRequired,
  /** Callback functions for changed field value */
  onChange: PropTypes.func.isRequired,
  /** Field value (image/document file path) */
  value: PropTypes.string,
};

FieldUpload.defaultProps = {
  value: null,
};
