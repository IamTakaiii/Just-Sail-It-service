import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser"

import fs from 'fs'
import { v4 as uuid } from 'uuid'

class File {

	public static async make (file: MultipartFileContract, useFor: string) {
		const ext = file.extname
		const path = file.tmpPath
		if (ext && path) {
			const name = await this.genName(ext, useFor)
			const stream = await this.genStream(path)
			return { name, stream }
		}
		else {
			console.log("not found ext or path then FileHelper.make send default")
			return { name: "unknown", stream: await this.genStream("unknown") }
		}

	}

	public static async makes (files: MultipartFileContract[], useFor: string) {
		const makes = files.map(async (file, _index) => {
			const make = await this.make(file, useFor)
			return make
		})
		return makes
	}

	public static attechHost ( host: string | undefined, fileName: string, useFor:string ) {
		const name = fileName ? fileName.slice(0, fileName.lastIndexOf("/")) : ""
		if (!host) throw new Error()
		if (name.includes(useFor)) {
			return `${host}/${fileName}`
		}
		else return fileName
	}

	private static async genName(ext: string, useFor: string) {
		const name = `${useFor}-${uuid()}.${ext}`
		return name
	}

	private static async genStream(filePath: string) {
		const stream = fs.createReadStream(filePath)
		return stream
	}

}

export default File
