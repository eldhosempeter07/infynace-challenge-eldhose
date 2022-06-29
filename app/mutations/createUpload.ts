import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUpload = z.object({
  title: z.string(),
  video_location: z.string(),
})

// Function to create video file in FileUpload table

export default resolver.pipe(resolver.zod(CreateUpload), resolver.authorize(), async (input) => {
  const file = await db.fileUpload.create({ data: input })
  return file
})
