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
    
    public func dail(address: String) async throws -> PeerID {
        let multiaddr = try Multiaddr(address)
        try await self.app.peers.add(addresses: [multiaddr], toPeer: self.app.peerID).get()
        let peerInfo = self.app.peers.getPeerInfo(byAddress: multiaddr, on: nil)
        let unwrappedPeerInfo = try await peerInfo.get()
        return unwrappedPeerInfo.peer
    }
    
    @objc public func hangUp(address: String) async throws {
        let multiaddr = try Multiaddr(address)
        try await self.app.peers.remove(address: multiaddr, fromPeer: self.app.peerID).get()
    }
    
    @objc public func getAddresses() async throws -> Array<String> {
        let addresses = try await self.app.peers.getAddresses(forPeer: self.app.peerID).get()
        
        return try addresses.compactMap { String(bytes: try $0.binaryPacked(), encoding: .utf8) }
    }
    
    @objc public func getMyConnections() async throws -> Array<String> {
        let myAddresses = try await self.getAddresses()
        let addresses = try await self.app.peers.all().get().filter {
            $0.id != self.app.peerID
        }
        
        return try addresses.flatMap {
            return $0.addresses
        }.compactMap {
            String(bytes: try $0.binaryPacked(), encoding: .utf8)
        }
    }
    
    public func openStream(address: String, forProtocol: String)async throws -> UUID  {
        let multiaddr = try Multiaddr(address)
        let realAddress = try await self.dail(address: address)
        let transport = try await self.app.transports.findBest(forMultiaddr: multiaddr).dial(address: multiaddr).get()
        let stream = try transport.newStreamSync(forProtocol)
        
        let myUUID = UUID()
        self.myStreams[myUUID] = StreamContainer(stream: stream)
        
        return myUUID
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
