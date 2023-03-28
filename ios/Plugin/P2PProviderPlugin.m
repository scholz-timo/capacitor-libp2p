#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(P2PProviderPlugin, "P2PProviderPlugin",
           CAP_PLUGIN_METHOD(createGroup, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(dial, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(closeConnection, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(hangUp, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(closeStream, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(getMyConnections, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getAddresses, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createVersionHandler, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createLibP2PInstance, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(destroyLibP2PInstance, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(startLibP2PInstance, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(stopLibP2PInstance, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(createLibP2PStream, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(sendDataToStream, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(destroyLibP2PStream, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(onVersionHandlerUpdate, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(sendVersionHandlerResponse, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(createLibP2PStreamListener, CAPPluginReturnCallback);
)
