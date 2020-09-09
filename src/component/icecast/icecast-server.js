const net = require("net")
const ogg = require("./ogg")
const vorbis = require("./vorbis")

const listenForOggComments = (port, {onTrackData, onTraktorConnect, onTraktorDisconnect}) => {

    net.createServer(socket => {
        const dataBuffer = Buffer.alloc(65536)
        let dataBufferIndex = 0
        let headerComplete = false

        const createVorbisDecoder = (onTrackData) => {
            const vorbisDecoder = new vorbis.Decoder()
            vorbisDecoder.on("track", onTrackData)
            return vorbisDecoder
        }

        const oggDecoder = new ogg.Decoder()
        let vorbisDecoder = createVorbisDecoder(onTrackData)
        let lastOggStream = null

        oggDecoder.on("page", page => {
            if (page.stream !== lastOggStream) {
                lastOggStream = page.stream
                oggDecoder.unpipe(vorbisDecoder)
                vorbisDecoder = createVorbisDecoder(onTrackData)
                oggDecoder.pipe(vorbisDecoder)
            }
        })

        socket.on("data", data => {
            const copied = data.copy(dataBuffer, dataBufferIndex)
            dataBufferIndex += copied
            if (!headerComplete) {
                let offset
                while ((offset = dataBuffer.indexOf(linebreak)) !== -1) {
                    const headerLine = dataBuffer.slice(0, offset)
                    if (headerLine.length === 0) {
                        headerComplete = true
                        socket.write("HTTP/1.0 200 OK\r\n\r\n")
                        onTraktorConnect(socket)
                        socket.pipe(oggDecoder)
                    } else {
                        const lineArray = new Uint8Array(headerLine.length)
                        headerLine.copy(lineArray, 0, 0, headerLine.length)
                    }
                    dataBuffer.copy(dataBuffer, 0, offset + 2)
                    dataBufferIndex -= offset + 2
                }
            }
        }).on("close", () => {
            onTraktorDisconnect(socket)
        })
    }).listen(port)

}

const linebreak = Buffer.from([13, 10])

module.exports = listenForOggComments
