//
//  P2PVersionHandlerContainer.swift
//  Plugin
//
//  Created by Timo Scholz on 25.03.23.
//

import Foundation
import Capacitor

@objc class P2PVersionHandlerContainer: NSObject {
    private var container = [UUID:P2PVersionHandler]()
    
    @objc func createInstance(name: String) throws -> UUID {
        let myUUID = UUID()
        self.container[myUUID] = P2PVersionHandler(name: name)
        return myUUID
    }
    
    func getInstance(uuid: String) -> P2PVersionHandler? {
        
        guard let uuidInstance = UUID(uuidString: uuid) else {
            return nil
        }
        
        return self.getInstance(uuid: uuidInstance)
    }
    
    @objc func getInstance(uuid: UUID) -> P2PVersionHandler? {
        return self.container[uuid]
    }
    
    func getInstances(array: Array<String?>) -> Array<P2PVersionHandler> {
        return self.getInstances(array: array.compactMap({ $0 }))
    }
    
    func getInstances(array: Array<String>) -> Array<P2PVersionHandler> {
        return self.getInstances(array: array.compactMap({
            UUID(uuidString: $0)
        }))
    }
    
    @objc func getInstances(array: Array<UUID>) -> Array<P2PVersionHandler> {
        return array.compactMap({
            self.container[$0]
        })
    }
}
