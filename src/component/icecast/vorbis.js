const stream = require("stream")

class Decoder extends stream.Writable {

    currentStep = 0
    buffer = Buffer.alloc(131072, 0)
    bufferPos = 0

    _write(chunk, encoding, callback) {
        if (this.currentStep < 2) {
            this.buffer.fill(chunk, this.bufferPos)
            this.bufferPos += chunk.length
        }
        if ((this.currentStep === 0) && (this.bufferPos >= 30)) {
            if (this.buffer.readUInt8(0) !== 1) {
                callback("header 1 expected")
                return
            }
            this.currentStep = 1
            this.buffer.copy(this.buffer, 0, 30, this.buffer.length - 30)
            this.bufferPos -= 30
        } else if ((this.currentStep === 1)) {
            const comments = this.readVorbisComment()
            if (comments) {
                this.emit("track", {comments})
                this.currentStep = 2
            }
        }
        callback()
    }

    readVorbisComment() {
        const vendorLength = this.buffer.readUInt32LE(7)
        const userCommentListLength = this.buffer.readUInt32LE(11 + vendorLength)
        const userComments = []
        let currentPos = 15 + vendorLength
        for (let index = 0; index < userCommentListLength; index++) {
            const commentLength = this.buffer.readUInt32LE(currentPos)
            const comment = this.buffer.toString("UTF-8", currentPos + 4, currentPos + 4 + commentLength)
            userComments.push(comment)
            currentPos += 4 + commentLength
        }
        if (currentPos > this.bufferPos) {
            return false
        }
        const framingBit = this.buffer.readUInt8(currentPos)
        if (framingBit !== 1) {
            return false
        }
        return userComments
    }

}

module.exports = {Decoder}
