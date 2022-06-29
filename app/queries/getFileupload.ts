import db from "db"

// Function to get video list based on search val

export default async function getUploads(val) {
  if (val) {
    return await db.fileUpload.findMany({ where: { title: { contains: val } } })
  } else {
    return await db.fileUpload.findMany()
  }
}
