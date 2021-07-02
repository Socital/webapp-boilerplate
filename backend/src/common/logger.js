import bunyan from 'bunyan'
import debugStream from 'bunyan-debug-stream'
import moment from 'moment'

export default class logger {
    constructor(name = 'default', version = '1.0.0', level = 'debug') {
        const Reset = '\x1b[0m'
        const FgMagenta = '\x1b[35m'
        const streams = []
        streams.push({
            type: 'raw',
            level: level,
            stream: debugStream({
                basePath: __dirname,
                forceColor: true,
                colors: {
                    'info': 'cyan',
                    'error': 'red',
                    'warn': 'yellow',
                    'debug': 'green'
                },
                showDate: (time) => `${FgMagenta}${moment(time).format('DD/MM/YY HH:mm:ss')}${Reset}`,
                showPid: false
            })
        })
        return bunyan.createLogger({ name: `${name} - ${version}`, streams, level: level })
    }
}