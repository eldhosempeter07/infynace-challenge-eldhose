import { BlitzApiHandler, BlitzApiRequest, BlitzApiResponse } from "blitz"
var formidable = require("formidable")
var path = require("path")
var fs = require("fs")

// Api functionality to upload video to current project directory using formidable

const handler: BlitzApiHandler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    const oldpath = files.filetoupload.filepath
    const filename = files.filetoupload.originalFilename
    const newpath =
      path.resolve().split(".blitz")[0] + "/public/" + files.filetoupload.originalFilename
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err
      res.write(`File "${filename}" uploaded successfully`)
      return res.end()
    })
  })
}
export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
