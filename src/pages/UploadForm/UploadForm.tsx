import { Line } from "rc-progress";
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./UploadForm.css";
import { useFormik } from "formik";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Close from "../../components/Close";
import ControlTitle from "../../components/ControlTitle";
import DragAnythingView from "../../components/Dropzone/views/DragAnythingView";
import Dropzone from "../../components/Dropzone";
import ErrorMsg from "../../components/Error";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import useUploadImage from "../../hooks/useUploadImage";

const { Image } = require("cloudinary-react");

type BrandOption = {
  label: string;
  value: string;
};

type BrandData = {
  title: string;
  category: BrandOption[];
  image: string;
};

const initialValues: BrandData = {
  title: "",
  category: [],
  image: "",
};

const validateBrandForm = (values: Partial<BrandData>) => {
  const errors: { [key: string]: string } = {};

  if (!values?.image) {
    errors.image = "Brand image is required.";
  }
  if (!values?.title?.length) {
    errors.title = "Brand title is required.";
  }
  if (!values?.category?.length) {
    errors.category = "Brand category is required.";
  }
  return errors;
};

function UploadForm() {
  const {
    uploadFile,
    loadedPercent,
    publicId,
    error,
    reset,
  } = useUploadImage();
  const [brandData, setBrandData] = useState<Partial<BrandData>>();
  const {
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    dirty,
  } = useFormik({
    onSubmit: setBrandData,
    validate: validateBrandForm,
    initialValues,
  });
  const touchCategory = useCallback(
    () => setFieldTouched("category"),
    [setFieldTouched]
  );
  const touchImage = useCallback(() => setFieldTouched("image"), [setFieldTouched]);
  const onUpload = useCallback((files) => uploadFile(files[0]), [uploadFile]);

  useEffect(() => {
    if (!brandData) return;
    alert(
      `Imagine that we send the form... You can find form data in the dev console.\n${JSON.stringify(
        brandData
      )}`
    );
    console.log(brandData);
  }, [brandData]);

  useEffect(() => {
    if (!error && !publicId) return;
    setFieldValue("image", error || publicId);
  }, [error, publicId, setFieldValue]);

  return (
    <div className="UploadForm">
      <form onSubmit={handleSubmit}>
        <Card type="area">
          <h1 className="h1">Store Details</h1>
          <ControlTitle className="mt-40" title="Title">
            <Input
              name="title"
              className="UploadForm__Title"
              type="text"
              placeholder="Enter text..."
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.title
                  ? (errors.title as string)
                  : undefined
              }
            />
          </ControlTitle>

          <ControlTitle className="mt-40" title="Categories">
            <Select
              isMulti
              isClearable
              name="category"
              className="UploadForm__Category"
              options={[
                { value: "Option 1", label: "Option 1" },
                { value: "Option 2", label: "Option 2" },
              ]}
              value={values.category}
              onChange={(value, { name = "" }) => {
                setFieldValue(name as string, value);
              }}
              onBlur={touchCategory}
              error={
                touched.category
                  ? (errors.category as string)
                  : undefined
              }
            />
          </ControlTitle>

          <ControlTitle className="mt-40" title="Banner Image">
            {!publicId ? (
              <>
                <Dropzone
                  multiple={false}
                  onDropAccepted={onUpload}
                  onDragLeave={touchImage}
                >
                  {({ isDragActive }) => (
                    <DragAnythingView active={isDragActive} />
                  )}
                </Dropzone>
                <Line
                  className="UploadForm__Loader"
                  percent={loadedPercent}
                  strokeWidth={0.2}
                  strokeColor="#0080ff"
                  trailColor="transparent"
                />
              </>
            ) : (
              <Close onClose={reset}>
                <Image
                  className="UploadForm__Banner"
                  publicId={publicId}
                  fetchFormat="auto"
                  quality="auto"
                />
              </Close>
            )}
            <ErrorMsg>
              {error || (touched.image && errors.image)}
            </ErrorMsg>
          </ControlTitle>
        </Card>

        <Button
          className="mt-20"
          type="submit"
          text="Submit"
          disabled={!dirty}
        />
      </form>
    </div>
  );
}

export default UploadForm;
