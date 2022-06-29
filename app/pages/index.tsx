import { Suspense, useEffect, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import getUploads from "app/queries/getFileupload"

const Uploads: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)
  const [search, setSearch] = useState("")
  const [searchText, setSearchText] = useState("")

  // Get the video list
  const [uploads] = useQuery(getUploads, searchText)

  // useEffect(()=>{
  //   const uploadVideos =  uploads
  // },[searchText])

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={"/uploads"}>
          <a
            style={{
              cursor: "pointer",
            }}
          >
            <strong>Add New</strong>
          </a>
        </Link>
        <button
          className="button small"
          style={{
            cursor: "pointer",
          }}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </div>
      {uploads.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault(), setSearchText(search)
          }}
        >
          <input
            style={{ padding: "0.6rem", marginRight: "0.5rem" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="button small"
            style={{
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      ) : null}
      {uploads.length ? (
        uploads.map((upload) => (
          <div>
            <h2>{upload.title}</h2>
            <video width={"400"} controls>
              <source src={`${window.location.origin}/${upload.video_location}`} type="video/mp4" />
              YOur browser does not support HTML video
            </video>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <div>
          <Suspense fallback="Loading ...">
            <Uploads />
          </Suspense>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #45009d;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          color: #f4f4f4;
          text-decoration: none;
        }

        .logo {
          margin-bottom: 2rem;
        }

        .logo img {
          width: 300px;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
