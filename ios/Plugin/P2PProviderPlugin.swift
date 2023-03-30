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

    @objc public func createGroup(_ call: CAPPluginCall) {
        let name = call.getString("name") ?? ""
        let versionHandlerIds = call.getArray("versionHandler")?.capacitor.replacingNullValues() as? [String?] ?? []
        
        guard name != "" else {
            call.reject("You need to enter a name.")
            return
        }
        
        let versionHandlers = self.p2pVersionHandlerContainer.getInstances(array: versionHandlerIds)
        
        guard !versionHandlers.isEmpty else {
            call.reject("You need to append at least one version handler.")
            return
        }
        
        call.resolve([
            "id": self.p2pGroupContainer.createInstance(name: name, handlers: versionHandlers).uuidString
        ])
    }

    @objc public func dial(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        let address = call.getString("address") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        guard address != "" else {
            call.reject("You need to enter a address to connect to.")
            return
        }
        
        
        Task.init {
            do {
                let address = try await libP2PInstance.dail(address: address)
                
                call.resolve([
                    "id": address
                ])
            } catch {
                call.reject("internal error \(error)")
            }
        }
    }

    @objc public func hangUp(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        let address = call.getString("address") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        guard address != "" else {
            call.reject("You need to enter a address to connect to.")
            return
        }
        
        Task.init {
            do {
                try await libP2PInstance.hangUp(address: address)
                call.resolve()
            } catch {
                call.reject("internal error \(error)")
            }
        }
    }

    @objc public func closeStream(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        let streamId = call.getString("streamId") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        Task.init {
            do {
                try await libP2PInstance.closeStream(uuid: streamId)
                call.resolve()
            } catch {
                call.reject("internal error \(error)")
            }
        }
    }

    @objc public func getMyConnections(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        Task.init {
            do {
                call.resolve([
                    "addresses": try await libP2PInstance.getMyConnections()
                ])
            } catch {
                call.reject("internal error \(error)")
            }
        }
    }

    @objc public func getAddresses(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        let dpg = DispatchGroup()
        dpg.enter()
        Task.init(priority: TaskPriority.high) {
            do {
                call.resolve([
                    "addresses": try await libP2PInstance.getAddresses()
                ])
            } catch {
                call.reject("Error")
            }
            
            dpg.leave()
        }
        
        dpg.wait()
    }

    @objc public func createVersionHandler(_ call: CAPPluginCall) {
        
        let versionIdentification = call.getString("version") ?? ""
        
        guard versionIdentification != "" else {
            call.reject("You need to enter a version.")
            return
        }
        
        do {
            let uuid = try self.p2pVersionHandlerContainer.createInstance(name: versionIdentification);
            
            call.resolve([
                "id": uuid.uuidString
            ])
        } catch {
            call.reject("internal error \(error)")
        }
    }

    @objc public func createLibP2PInstance(_ call: CAPPluginCall) {
        let groupIds = call.getArray("groupIds")?.capacitor.replacingNullValues() as? [String?] ?? []
        
        do {
            call.resolve([
                "id": try self.p2pProviderContainer.createInstance(groups: self.p2pGroupContainer.getInstances(array: groupIds)).uuidString
            ])
        } catch {
            call.reject("internal error \(error)")
        }
    }

    @objc public func destroyLibP2PInstance(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        Task.init {
            await self.p2pProviderContainer.removeInstance(uuid: libP2PInstanceId)
            call.resolve()
        }
    }

    @objc public func startLibP2PInstance(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }

        DispatchQueue.global().async {
            do {
                try libP2PInstance.start()
                call.resolve()
            } catch {
                call.reject("Error")
            }
        }
    }

    @objc public func stopLibP2PInstance(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        libP2PInstance.stop()
        call.resolve()
    }

    @objc public func createLibP2PStream(_ call: CAPPluginCall) {
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
        
        
        Task.init {
            do {
                let id = try await libP2PInstance.openStream(address: address, forProtocol: group.name + "/" + versionHandler.name)
                
                guard let ensuredUUID = id else {
                    call.reject("No connection found or internal error")
                    return
                }
                
                call.resolve([
                    "id": ensuredUUID.uuidString
                ])
            } catch {
                call.reject("internal error \(error)")
            }
        }
    }

    @objc public func sendDataToStream(_ call: CAPPluginCall) {
        let libP2PInstanceId = call.getString("id") ?? ""
        let streamId = call.getString("streamId") ?? ""
        let data = call.getArray("data") ?? []
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: libP2PInstanceId) else {
            call.reject("You need to enter a libP2P instance id.")
            return
        }
        
        Task.init {
            do {
                try await libP2PInstance.getStream(uuid: streamId)?.channel.write(data).get()
                call.resolve()
            } catch {
                call.reject("internal error \(error)")
            }
        }
    }

    @objc public func destroyLibP2PStream(_ call: CAPPluginCall) {
        let connectionId = call.getString("id") ?? ""
        let streamId = call.getString("streamId") ?? ""
        
        guard streamId != "" else {
            call.reject("You need to enter a stream instance id.")
            return
        }
        
        guard let libP2PInstance = self.p2pProviderContainer.getInstance(uuid: connectionId) else {
            call.reject("You need to enter a connection id.")
            return
        }
        
        Task.init {
            do {
                try await libP2PInstance.closeStream(uuid: streamId)
                call.resolve()
            } catch {
                call.reject("internal error \(error)")
            }
        }
    }

    @objc public func onVersionHandlerUpdate(_ call: CAPPluginCall) {
        call.keepAlive = true
    }

    @objc public func sendVersionHandlerResponse(_ call: CAPPluginCall) {
        let versionHandlerId = call.getString("id") ?? ""
        let requestId = call.getString("requestId") ?? ""
        
        guard let p2pVersionHandler = self.p2pVersionHandlerContainer.getInstance(uuid: versionHandlerId) else {
            call.reject("You need to enter a versionHandler instance id.")
            return
        }
        
        p2pVersionHandler.doHandleEvent(uuid: requestId, response: .close)
        
        call.resolve()
    }

    @objc public func createLibP2PStreamListener(_ call: CAPPluginCall) {
        call.keepAlive = true
    }
}
