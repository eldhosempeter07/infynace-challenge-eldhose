import createUpload from "app/mutations/createUpload"
import axios from "axios"
import { BlitzPage, Link, useMutation, useRouter } from "blitz"
import { Field, Form, Formik } from "formik"
import { useState } from "react"

const AddNew: BlitzPage = () => {
  const router = useRouter()

  // Function to create video
  const [createUploadMutation] = useMutation(createUpload)
  // Local state for  store variables
  const [fileSelected, setFileSelected] = useState<File>()
  const [error, setError] = useState("")

  interface MyFormValues {
    video_location: string
    title: string
  }
  const initialValues: MyFormValues = { video_location: "", title: "" }

  // Function to set file to state variable
  const uploadFile = function (files: FileList | null) {
    const fileList = files
    if (!fileList) return
    setFileSelected(fileList[0])
  }
  return (
    <div>
      <div>
        <br />
        <Link href={"/"}>
          <a>
            <strong>Back To Home</strong>
          </a>
        </Link>
      </div>
      <br />

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            if (values.title == "") {
              return setError("Please enter all the fields")
            } else {
              if (fileSelected?.name == undefined) {
                return setError("Please enter all the fields")
              }
              setError("")
              // Post Call
              await createUploadMutation({
                ...values,
                video_location: fileSelected.name,
              })

              // Upload file to disk
              let formData = new FormData()
              formData.append("filetoupload", fileSelected)
              axios.post("/api/files/upload", formData, {
                headers: {
                  "Content-type": "multipart/form-data",
                },
              })
              router.push("/")
            }
          } catch (error) {
            console.log("error", error)
          }
        }}
      >
        <Form>
          <label htmlFor="video_location" style={{ marginRight: "0.6rem" }}>
            {" "}
            Path
          </label>

          <input
            accept="video/*"
            id="file"
            name="filetoupload"
            type="file"
            onChange={(e) => {
              uploadFile(e.target.files)
            }}
          />

          <br />
          <br />
          <label htmlFor="title" style={{ marginRight: "0.6rem" }}>
            Title
          </label>
          <Field id="title" name="title" placeholder="title" />
          {error ? <p style={{ color: "red" }}>{error}</p> : <br />}

          <br />
          <button
            style={{
              padding: "0.5rem 2rem",
              background: "#6700eb",
              color: "#fff",
              cursor: "pointer",
            }}
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
      <style jsx global>{`
        #input {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default AddNew
