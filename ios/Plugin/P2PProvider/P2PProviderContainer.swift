//
//  P2PProviderContainer.swift
//  Plugin
//
//  Created by Timo Scholz on 23.03.23.
//

import Foundation
import LibP2P
import LibP2PWebSocket
import LibP2PNoise
import LibP2PMPLEX
import RoutingKit

@objc public class P2PProviderContainer: NSObject {
    
    private var containerStorage = [UUID:P2PProvider]()
    
    @objc public func createInstance(groups: Array<P2PGroup>) throws -> UUID {
        let env = try Environment.detect()
        let app = Application(env)
        
        app.servers.use(.ws(host: "0.0.0.0", port: 0))

        app.transports.use( .ws )

        app.security.use(.noise)
        app.muxers.use(.mplex)
        
        for group in groups {
            app.group(PathComponent(stringLiteral: group.name)) { echo in
                for versionHandler in group.versionHandlers {
                    echo.on(PathComponent(stringLiteral: versionHandler.name)) { req -> Response<ByteBuffer> in
                        
                        var dpgResult: Response<ByteBuffer> = .close
                        let dpg = DispatchGroup()
                        
                        
                        dpg.enter()
                        let cancellable = versionHandler.handleEvent(event: req).sink( receiveValue: { value in
                                dpgResult = value
                                dpg.leave()
                            })
                        
                        dpg.wait()
                        
                        return dpgResult
                    }
                }
            }
        }
        
        let uuid = UUID()
        containerStorage[uuid] = P2PProvider(app: app, uuid: uuid)
        
        return uuid
    }
    
    public func getInstance(uuid: String) -> P2PProvider? {
        
        guard let myUuid = UUID(uuidString: uuid) else {
            return nil;
        }
    
        return self.getInstance(uuid: myUuid)
    }
    
    @objc public func getInstance(uuid: UUID) -> P2PProvider? {
        return self.containerStorage[uuid];
    }
    
    public func removeInstance(uuid: String) {
        guard let myUuid = UUID(uuidString: uuid) else {
            return;
        }
        
        return self.removeInstance(uuid: myUuid)
    }
    
    @objc public func removeInstance(uuid: UUID) {
        self.getInstance(uuid: uuid)?.destroy()
        self.containerStorage[uuid] = nil
    }
}
