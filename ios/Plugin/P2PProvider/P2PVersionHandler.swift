//
//  P2PVersionHandler.swift
//  Plugin
//
//  Created by Timo Scholz on 24.03.23.
//

import Foundation
import LibP2P
import LibP2PCore
import Combine

typealias PromiseResolverType = (Result<Response<ByteBuffer>, Never>) -> Void

@objc public class P2PVersionHandler: NSObject {
    public let name: String
    
    private var unhandeledEvents = [UUID:PromiseResolverType]()
    
    init(name: String) {
        self.name = name
    }
    
    public func doHandleEvent(uuid: UUID, response: Response<ByteBuffer>) {
        guard let promise = self.unhandeledEvents[uuid] else {
            return
        }
        
        promise(.success(response))
        self.unhandeledEvents[uuid] = nil
    }
    
    public func handleEvent(event: Request) -> Future<Response<ByteBuffer>, Never>  {
        
        let myUUID = UUID()
        
        // TODO: Create event that can be handeled with myUUUID as id.
        
        return Future<Response<ByteBuffer>, Never>() { promise in
            self.unhandeledEvents[myUUID] = promise
        }
    }
}
