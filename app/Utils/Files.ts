import { v4 as uuid } from 'uuid'
import fs from 'fs'

class File {

	private _fileName: string
	private _fileStream: fs.ReadStream

	public async genName (ext:string | undefined, mode?: string) : Promise<void> {
		if (mode) this._fileName = `${ mode }_${ uuid() }.${ext}`
		else this._fileName = `unknown_${uuid()}.${ext}`
	}

	public async readStream(filePath: string | undefined): Promise<void>{
		this._fileStream = fs.createReadStream(filePath ? filePath : '')
	}

	get fileName(): string {
		return this._fileName;
	}

	get fileStream(): fs.ReadStream {
		return this._fileStream;
	}
}

export default File
