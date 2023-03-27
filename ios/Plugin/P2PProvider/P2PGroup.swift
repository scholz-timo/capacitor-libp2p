//
//  P2PGroup.swift
//  Plugin
//
//  Created by Timo Scholz on 23.03.23.
//

import Foundation

@objc public class P2PGroup: NSObject {
    public let name: String
    public let versionHandlers: Array<P2PVersionHandler>
    public let uuid: UUID
    
    init(name: String, versionHandlers: Array<P2PVersionHandler>, uuid: UUID) {
        self.name = name
        self.versionHandlers = versionHandlers
        self.uuid = uuid
    }
}
