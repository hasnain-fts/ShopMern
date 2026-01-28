import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { renderAsync } from "docx-preview";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/* ------------------ Validation Schema ------------------ */

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  senderName: Yup.string().required("Sender name is required"),
  surname: Yup.string().required("Surname is required"),
  recipientName: Yup.string().required("Recipient name is required"),

  date: Yup.string().required("Date is required"),

  letterBody: Yup.string()
    .min(20, "Letter body must be at least 20 characters")
    .required("Letter body is required"),

  senderAddress: Yup.string().required("Sender address is required"),

  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .required("Phone number is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  website: Yup.string().url("Invalid website URL").nullable(),

});

const WordFileGeneration = () => {
  const previewRef = useRef(null);

  const [generatedBlob, setGeneratedBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Generate a Word document from template safely.
   * @param {Object} values - Data to render in the template.
   * cparam {Object} previewRef - Ref to render the preview (if needed).
   */
  const generateDocument = async (values) => {
    setLoading(true);
    try {
      if (!values) throw new Error("Values are required");

      const templateUrl = `${import.meta.env.BASE_URL}assets/template.docx`;

      // Safe fetch: wrap in try/catch to prevent unhandled promise rejections
      let arrayBuffer = null;
      try {
        const response = await fetch(templateUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch template: ${response.statusText}`);
        }
        arrayBuffer = await response.arrayBuffer();
      } catch (fetchError) {
        console.warn("Template fetch failed or interrupted:", fetchError);
        return; // Exit early safely
      }

      const zip = new PizZip(arrayBuffer);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: "{{", end: "}}" }, // ← you're using {{ }} not {% %}
      });

      const tableData = [
        { name: "Apple", qty: 2, price: "$5" },
        { name: "Banana", qty: 5, price: "$3" },
        { name: "Orange", qty: 1, price: "$4" },
      ];

      // Render the document
      doc.render({
        firstName: values.firstName,
        senderName: values.senderName,
        surname: values.surname,
        date: values.date,
        recipientName: values.recipientName,
        letterBody: values.letterBody,
        senderAddress: values.senderAddress,
        phone: values.phone,
        email: values.email,
        website: values.website || "N/A",
        items: tableData.map((item, i) => ({
          ...item,
          index: i + 1,
        })), // 👈 THIS is the magic
      });

      const generatedBlob = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Render preview safely
      if (previewRef?.current && typeof renderAsync === "function") {
        try {
          await renderAsync(generatedBlob, previewRef.current);
        } catch (previewError) {
          console.warn("Preview render failed:", previewError);
        }
      }

      console.log("Generating document with values:", generatedBlob);

      setGeneratedBlob(generatedBlob);

      return generatedBlob; // Return the generated document
    } catch (error) {
      console.error("Document generation failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!generatedBlob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(generatedBlob);
    link.download = "Generated-Document.docx";
    link.click();
  };

  return (
    <div className="w-full mx-auto space-y-6 p-6">
      <h3 className="text-lg font-semibold">Word File Generation</h3>

      <Formik
        initialValues={{
          firstName: "",
          senderName: "",
          surname: "",
          date: "",
          recipientName: "",
          letterBody: "",
          senderAddress: "",
          phone: "",
          email: "",
          website: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={generateDocument}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* ----------- Form ----------- */}
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="mb-0 pb-0">
                <Label className="mb-1">First Name</Label>
                <Input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Surname</Label>
                <Input
                  name="surname"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.surname && errors.surname && (
                  <p className="text-sm text-red-500">{errors.surname}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Sender Name</Label>
                <Input
                  name="senderName"
                  value={values.senderName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.senderName && errors.senderName && (
                  <p className="text-sm text-red-500">{errors.senderName}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Recipient Name</Label>
                <Input
                  name="recipientName"
                  value={values.recipientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.recipientName && errors.recipientName && (
                  <p className="text-sm text-red-500">{errors.recipientName}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Date</Label>
                <Input
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.date && errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Phone</Label>
                <Input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.phone && errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Website</Label>
                <Input
                  name="website"
                  placeholder="https://example.com"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.website && errors.website && (
                  <p className="text-sm text-red-500">{errors.website}</p>
                )}
              </div>

              <div className="mb-0 pb-0">
                <Label className="mb-1">Letter Body</Label>
                <Textarea
                  name="letterBody"
                  rows={5}
                  value={values.letterBody}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.letterBody && errors.letterBody && (
                  <p className="text-sm text-red-500">{errors.letterBody}</p>
                )}
              </div>

              <div className="mb-0 pb-0 ">
                <Label className="mb-1">Sender Address</Label>
                <Textarea
                  name="senderAddress"
                  rows={2}
                  value={values.senderAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.senderAddress && errors.senderAddress && (
                  <p className="text-sm text-red-500">{errors.senderAddress}</p>
                )}
              </div>

      

              <div className="flex gap-3 pt-2 md:col-span-2 justify-between">
                <Button type="submit" disabled={loading}>
                  {loading ? "Generating..." : "Generate Preview"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={downloadFile}
                  disabled={!generatedBlob}
                >
                  Download
                </Button>
              </div>
            </div>

            {/* ----------- Preview ----------- */}
            <div className="border rounded-md p-3 h-[420px] overflow-auto bg-muted flex flex-col">
              <div className="text-sm font-medium mb-2">Preview</div>
              <Separator className="mb-2" />
              <div
                ref={previewRef}
                className="flex-1 w-full h-full overflow-auto"
                style={{
                  minHeight: "400px",
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WordFileGeneration;
