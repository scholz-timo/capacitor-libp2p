import Foundation
import LibP2P
import LibP2PCore

@objc public class P2PProvider: NSObject {
    
    private class StreamContainer {
        private let stream: LibP2PCore.Stream
        
        public init(stream: LibP2PCore.Stream) {
            self.stream = stream
        }
        
        public func getStream() -> LibP2PCore.Stream {
            return self.stream
        }
    }
    
    private let app: Application
    private var myStreams = [UUID:StreamContainer]()
    private let uuid: UUID
    
    init(app:Application, uuid: UUID) {
        self.app = app
        self.uuid = uuid
    }
    
    @objc public func start() throws {
        try self.app.start()
    }
    
    @objc public func stop() {
        self.app.shutdown()
    }
    
    public func dail(address: String) async throws -> String {
        let multiaddr = try Multiaddr(address)
        
        let connection = try await self.app.transports.findBest(forMultiaddr: multiaddr).dial(address: multiaddr).get()
        
        return connection.localPeer.b58String
    }
    
    @objc public func hangUp(address: String) async throws {
        let multiaddr = try Multiaddr(address)
        let allConnections = try await self.app.connections.getConnectionsTo(multiaddr, onlyMuxed: false, on: nil).get()
        
        for connection in allConnections {
            do {
                try await connection.close().get()
            } catch {
                print("error \(error)")
            }
        }
    }
    
    @objc public func getAddresses() async throws -> Array<String> {
        return [self.app.peerID.b58String]
    }
    
    @objc public func getMyConnections() async throws -> Array<String> {
        
        return try await self.app.connections.getConnections(on: nil).get().compactMap {
            $0.remoteAddr?.description
        }

    }
    
    public func openStream(address: String, forProtocol: String) async throws -> UUID?  {
        do {
            try await self.dail(address: address)
        } catch {}
        
        let multiaddr = try Multiaddr(address)
        //let realAddress = try await self.dail(address: address)
        let transports = try await self.app.connections.getConnectionsTo(multiaddr, onlyMuxed: false, on: nil).get()
        
        
        if transports.isEmpty {
            print("error no transport found.")
            return nil
        }
        
        for transport in transports {
            
            guard [ConnectionStats.Status.open, ConnectionStats.Status.opening].contains(transport.status) else {
                continue
            }
            
            do {
                
                let result = try await app.newRequest(to: transport.localPeer, forProtocol: forProtocol, withRequest: Data("Hello world".utf8), style: .responseExpected, withHandlers: .inherit).get()

                
                return myUUID
            } catch {
                print("error \(error)")
                continue
            }
        }
        
        return nil
    }
    
    public func closeStream(uuid: String) async throws {
        
        guard let myUUID = UUID(uuidString: uuid) else {
            return
        }
        
        try await self.closeStream(uuid: myUUID)
    }
    
    public func closeStream(uuid: UUID) async throws {
        try await self.myStreams[uuid]?.getStream().close(gracefully: true).get()
        self.myStreams[uuid] = nil
    }
    
    public func getStream(uuid: String) -> LibP2PCore.Stream? {
        guard let myUUID = UUID(uuidString: uuid) else {
            return nil;
        }
        
        return self.getStream(uuid: myUUID)
    }
    
    public func getStream(uuid: UUID) -> LibP2PCore.Stream? {
        return self.myStreams[uuid]?.getStream();
    }
    
    public func destroy() async {
        guard self.app.isRunning else {
            return
        }
        
        for key in self.myStreams.keys {
            do {
                try await self.closeStream(uuid: key)
            } catch {}
        }
        
        self.stop()
    }
}
