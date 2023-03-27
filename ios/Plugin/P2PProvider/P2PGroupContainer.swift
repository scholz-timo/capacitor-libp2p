//
//  P2PGroupContainer.swift
//  Plugin
//
//  Created by Timo Scholz on 25.03.23.
//

import Foundation

@objc class P2PGroupContainer: NSObject {
    private var container = [UUID:P2PGroup]()
    
    public func createInstance(name: String, handlers: Array<P2PVersionHandler>) -> UUID {
        let uuid = UUID()
        
        self.container[uuid] = P2PGroup(name: name, versionHandlers: handlers, uuid: uuid)
        
        return uuid
    }
    
    public func getInstance(uuid: String) -> P2PGroup? {
        if let uuid = UUID(uuidString: uuid) {
            return self.getInstance(uuid: uuid)
        }
        
        return nil;
    }
    
    
    @objc public func getInstance(uuid: UUID) -> P2PGroup? {
        return self.container[uuid]
    }
    
    public func getInstances(array: [String?]) -> [P2PGroup] {
        return self.getInstances(uuids: array.compactMap{ $0 }.compactMap {
            UUID(uuidString: $0)
        })
    }
    
    public func getInstances(uuids: [UUID]) -> [P2PGroup] {
        uuids.compactMap {
            return self.getInstance(uuid: $0)
        }
    }
}
