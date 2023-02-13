import fs from 'fs'
import { v4 as uuid } from 'uuid'

class ImageUtil {
	private _name: string
	private _stream: fs.ReadStream
	private _arrayOfName : string[]
	private _arrayOfStream: fs.ReadStream[]
	private _arrayOfUrl: string[]
	public host = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET }/`

	constructor() {
		this._arrayOfName = []
		this._arrayOfStream = []
		this._arrayOfUrl=[]
	}

	public async genName (ext: string | undefined, type: string ) {
		ext = ext ? ext : ""
		const name = `${ type }-${ uuid() }.${ ext }`
		this._name = name
		return name
	}

	public async genStream (filePath: string | undefined) {
		filePath = filePath ? filePath : ""
		const stream = fs.createReadStream(filePath)
		this._stream = stream
		return stream
	}

	public async genArrayOfName (images: any[], type:string) {
		images.map(async (image: any) => {
			const name = await this.genName(image?.extname, type)
			this._arrayOfName.push(name)
			this._arrayOfUrl.push(this.host.concat(name))
		})
	}

	public async genArrayOfStream (images: any[]) {
		images.map(async (image: any) => {
			const stream = await this.genStream(image?.tmpPath)
			this._arrayOfStream.push(stream)
		})
	}

	get name() {
		return this._name
	}

	get stream() {
		return this._stream
	}

	get arrName () {
		return	this._arrayOfName
	}

	get arrStream () {
		return this._arrayOfStream
	}

	get arrUrl () {
		return this._arrayOfUrl
	}

}

export default ImageUtil
