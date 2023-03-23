import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(P2PProviderPlugin)
public class P2PProviderPlugin: CAPPlugin {
    private let implementation = P2PProvider()

    @objc func createGroup(_ call: CAPPluginCall) throws {
        let value = call.getString("name") ?? ""
        
        if (value == "") {
            call.reject("You need to enter a name.")
            return
        }
        
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func dial(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func closeConnection(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func hangUp(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func closeStream(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func getMyConnections(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func getAddresses(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func createVersionHandler(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func createLibP2PInstance(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func destroyLibP2PInstance(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func startLibP2PInstance(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func stopLibP2PInstance(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    // TEMP

    @objc func createLibP2PStream(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func sendDataToStream(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func destroyLibP2PStream(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func onVersionHandlerUpdate(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func sendVersionHandlerResponse(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }

    @objc func createLibP2PStreamListener(_ call: CAPPluginCall) throws {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": try implementation.echo(value)
        ])
    }
}
