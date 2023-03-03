import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(P2PProviderPlugin)
public class P2PProviderPlugin: CAPPlugin {
    private let implementation = P2PProvider()

    @objc func echo(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }
}
