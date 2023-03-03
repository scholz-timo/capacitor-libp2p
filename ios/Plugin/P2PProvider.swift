import Foundation
import LibP2P
import LibP2PWebSocket
// import LibP2PNoise
// import LibP2PMPLEX

@objc public class P2PProvider: NSObject {
    @objc public func echo(_ value: String) throws -> String {
        let app = try Application(.development)
        
        // lib.security.use(.noise)
        // lib.muxers.use(.mplex)
        app.servers.use(.ws(host: "0.0.0.0", port: 0))

        app.transports.use( .ws )

        //try app.routes()

        /// Start libp2p
        try app.start()

        /// Do some networking stuff... 📡

        /// At some later point, when you're done with libp2p...
        app.shutdown()


        print(value)
        return value
    }
}
