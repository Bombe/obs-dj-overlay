const stream = require("stream")

class Decoder extends stream.Transform {
    bufferPos = 0
    pageBuffer = Buffer.alloc(131072, 0)

    _write(chunk, encoding, callback) {
        this.pageBuffer.fill(chunk, this.bufferPos)
        this.bufferPos += chunk.length
        let capturePatternPos = this.pageBuffer.indexOf("OggS")
        while (capturePatternPos !== -1) {
            const header = this._parseHeader(capturePatternPos)
            if (header && (this.bufferPos >= (capturePatternPos + this._pageLength(header)))) {
                const packetFragmentLength = this._dataLength(header)
                const packetFragmentStart = capturePatternPos + 27 + header.pageSegments
                const page = new Uint8Array(packetFragmentLength)
                this.pageBuffer.copy(page, 0, packetFragmentStart, packetFragmentStart + packetFragmentLength)
                this.emit("page", {stream: header.streamSerialNumber, page: header.pageSequenceNumber})
                this.emit("data", page)
                this.pageBuffer.copy(this.pageBuffer, 0, packetFragmentStart + packetFragmentLength, this.pageBuffer.length)
                this.pageBuffer.fill(0, this.pageBuffer.length - (packetFragmentStart + packetFragmentLength), this.pageBuffer.length)
                this.bufferPos -= packetFragmentStart + packetFragmentLength
                capturePatternPos = this.pageBuffer.indexOf("OggS")
            } else {
                break
            }
        }
        callback()
    }

    _dataLength(header) {
        return header.segmentTable.reduce((a, b) => a + b, 0)
    }

    _pageLength(header) {
        return 27 + header.pageSegments + this._dataLength(header)
    }

    _parseHeader(position) {
        const streamStructureVersion = this.pageBuffer.readUInt8(position + 4)
        if (streamStructureVersion !== 0) {
            return false
        }
        const headerTypeFlag = this.pageBuffer.readUInt8(position + 5)
        const granulePosition = this.pageBuffer.readBigUInt64LE(position + 6)
        const streamSerialNumber = this.pageBuffer.readUInt32LE(position + 14)
        const pageSequenceNumber = this.pageBuffer.readUInt32LE(position + 18)
        const pageChecksum = this.pageBuffer.readUInt32LE(position + 22)
        const pageSegments = this.pageBuffer.readUInt8(position + 26)
        const segmentTable = new Uint8Array(pageSegments)
        this.pageBuffer.copy(segmentTable, 0, position + 27, position + 27 + pageSegments)
        return {streamStructureVersion, headerTypeFlag, granulePosition, streamSerialNumber, pageSequenceNumber, pageChecksum, pageSegments, segmentTable}
    }

}

module.exports = {Decoder}
