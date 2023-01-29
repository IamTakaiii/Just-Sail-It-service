import { v4 as uuid } from 'uuid'
import fs from 'fs'

class File {

	private fileName: string
	private fileStream: fs.ReadStream

	public async genName (ext:string | undefined, mode?: string) : Promise<void> {
		if (mode) this.fileName = `${ mode }_${ uuid() }.${ext}`
		else this.fileName = `unknow_${uuid()}.${ext}`
	}

	public async readStream(filePath: string | undefined): Promise<void>{
		this.fileStream = fs.createReadStream(filePath ? filePath : '')
	}

	public getFileName():string {
		return this.fileName
	}

	public getFileStream(): fs.ReadStream{
		return this.fileStream
	}

}

export default File
