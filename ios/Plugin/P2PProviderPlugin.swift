import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(P2PProviderPlugin)
public class P2PProviderPlugin: CAPPlugin {
    private let p2pProviderContainer = P2PProviderContainer()
    private let p2pGroupContainer = P2PGroupContainer()
    private let p2pVersionHandlerContainer = P2PVersionHandlerContainer()

    @objc func createGroup(_ call: CAPPluginCall) throws {
        let name = call.getString("name") ?? ""
        let rawVersionHandlerIds = call.getArray("versionHandler")?.capacitor.replacingNullValues() as? [String?]
        
        guard name == "" else {
            call.reject("You need to enter a name.")
            return
        }
        
        guard let versionHandlerIds = rawVersionHandlerIds else {
            call.reject("You need to strings as version handler ids.")
            return
        }
        
        let versionHandlers = self.p2pVersionHandlerContainer.getInstances(array: versionHandlerIds)
        
        guard versionHandlers.isEmpty else {
            call.reject("You need to append at least one version handler.")
            return
        }
        
        
        
        call.resolve([
            "id": self.p2pGroupContainer.createInstance(name: name, handlers: versionHandlers).uuidString
        ])
    }

    @objc func dial(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        let address = call.getString("address") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        guard address == "" else {
            call.reject("You need to enter a address to connect to.")
            return
        }
        
        let peerId = try await libP2PInstance.dail(address: address)
        call.resolve([
            "id": peerId.b58String
        ])
    }

    @objc func hangUp(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        let address = call.getString("address") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        if (address == "") {
            call.reject("You need to enter a address to connect to.")
            return
        }
        
        try await libP2PInstance.hangUp(address: address)
        call.resolve()
    }

    @objc func closeStream(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        let streamId = call.getString("streamId") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        try await libP2PInstance.closeStream(uuid: streamId)

        call.resolve()
    }

    @objc func getMyConnections(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        call.resolve([
            "addresses": try await libP2PInstance.getMyConnections()
        ])
    }

    @objc func getAddresses(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        call.resolve([
            "addresses": try await libP2PInstance.getAddresses()
        ])
    }

    @objc func createVersionHandler(_ call: CAPPluginCall) throws {
        let versionIdentification = call.getString("version") ?? ""
        
        if (versionIdentification == "") {
            call.reject("You need to enter a version.")
            return
        }
        
        let uuid = try self.p2pVersionHandlerContainer.createInstance(name: versionIdentification);
        
        call.resolve([
            "id": uuid.uuidString
        ])
    }

    @objc func createLibP2PInstance(_ call: CAPPluginCall) throws {
        let groupIds = call.getArray("groupIds")?.capacitor.replacingNullValues() as? [String?] ?? []
        
        call.resolve([
            "id": try self.p2pProviderContainer.createInstance(groups: self.p2pGroupContainer.getInstances(array: groupIds)).uuidString
        ])
    }

    @objc func destroyLibP2PInstance(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        await self.p2pProviderContainer.removeInstance(uuid: libP2PInstanceId)
        
        call.resolve()
    }

    @objc func startLibP2PInstance(_ call: CAPPluginCall) throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }

        try libP2PInstance.start()
        call.resolve()
    }

    @objc func stopLibP2PInstance(_ call: CAPPluginCall) throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        libP2PInstance.stop()
        call.resolve()
    }

    @objc func createLibP2PStream(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        let address = call.getString("address") ?? ""
        let groupId = call.getString("groupId") ?? ""
        let versionHandlerId = call.getString("versionHandlerId") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        guard let group = self.p2pGroupContainer.getInstance(uuid: groupId) else {
            call.reject("You need to enter a group id.")
            return
        }
        
        guard let versionHandler = self.p2pVersionHandlerContainer.getInstance(uuid: versionHandlerId) else {
            call.reject("You need to enter a version handler id.")
            return
        }
        
        
        let id = try await libP2PInstance.openStream(address: address, forProtocol: group.name + "/" + versionHandler.name)
        
        
        call.resolve([
            "id": id.uuidString
        ])
    }

    @objc func sendDataToStream(_ call: CAPPluginCall) async throws {
        let libP2PInstanceId = call.getString("id") ?? ""
        let streamId = call.getString("streamId") ?? ""
        let data = call.getArray("data") ?? []
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        try await libP2PInstance.getStream(uuid: streamId)?.channel.write(data).get()
        
        call.resolve()
    }

    @objc func destroyLibP2PStream(_ call: CAPPluginCall) async throws {
        let connectionId = call.getString("id") ?? ""
        let streamId = call.getString("streamId") ?? ""
        
        if (streamId == "") {
            call.reject("You need to enter a stream instance id.")
            return
        }
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: connectionId) else {
            call.reject("You need to enter a connection id.")
            return
        }
        
        try await libP2PInstance.closeStream(uuid: streamId)
        
        call.resolve()
    }

    @objc func onVersionHandlerUpdate(_ call: CAPPluginCall) throws {
        call.keepAlive = true
    }

    @objc func sendVersionHandlerResponse(_ call: CAPPluginCall) throws {
        let versionHandlerId = call.getString("id") ?? ""
        let requestId = call.getString("requestId") ?? ""
        
        guard let p2pVersionHandler = self.p2pVersionHandlerContainer.getInstance(uuid: versionHandlerId) else {
            call.reject("You need to enter a versionHandler instance id.")
            return
        }
        
        p2pVersionHandler.doHandleEvent(uuid: requestId, response: .close)
        
        call.resolve()
    }

    @objc func createLibP2PStreamListener(_ call: CAPPluginCall) throws {
        call.keepAlive = true
    }
}
