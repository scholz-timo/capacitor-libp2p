# @frontend/p2p

P2P Functionality

## Install

```bash
npm install @frontend/p2p
npx cap sync
```

## API

<docgen-index>

* [`createGroupFactory(...)`](#creategroupfactory)
* [`createConnectionHandler(...)`](#createconnectionhandler)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### createGroupFactory(...)

```typescript
createGroupFactory(options: { name: string; }) => Promise<IGroupFactory>
```

| Param         | Type                           |
| ------------- | ------------------------------ |
| **`options`** | <code>{ name: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#igroupfactory">IGroupFactory</a>&gt;</code>

--------------------


### createConnectionHandler(...)

```typescript
createConnectionHandler(options: { groups: IGroup[]; }) => Promise<{ value: string; }>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ groups: IGroup[]; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### Interfaces


#### IGroupFactory

| Method                     | Signature                                                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **generateVersionHandler** | (version: <a href="#basicgroupconfiguration">BasicGroupConfiguration</a>) =&gt; <a href="#iversionhandler">IVersionHandler</a>                                                                                  |
| **generateVersionHandler** | (version: <a href="#basicgroupconfiguration">BasicGroupConfiguration</a>, factory: (versionHandler: <a href="#iversionhandler">IVersionHandler</a>) =&gt; any) =&gt; <a href="#igroupfactory">IGroupFactory</a> |
| **generate**               | () =&gt; <a href="#igroup">IGroup</a>                                                                                                                                                                           |


#### IVersionHandler

| Method  | Signature                                                                                                                                                                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **on**  | &lt;T extends <a href="#versionhandlereventtype">VersionHandlerEventType</a>&gt;(event: T, impl: <a href="#iprotocolrequesthandler">IProtocolRequestHandler</a>&lt;<a href="#versionhandlerevent">VersionHandlerEvent</a>&lt;T&gt;&gt;) =&gt; <a href="#iversionhandler">IVersionHandler</a> |
| **off** | &lt;T extends <a href="#versionhandlereventtype">VersionHandlerEventType</a>&gt;(event: T, impl: <a href="#iprotocolrequesthandler">IProtocolRequestHandler</a>&lt;<a href="#versionhandlerevent">VersionHandlerEvent</a>&lt;T&gt;&gt;) =&gt; <a href="#iversionhandler">IVersionHandler</a> |


#### IProtocolRequestHandlerObj

| Prop         | Type                                                                      |
| ------------ | ------------------------------------------------------------------------- |
| **`stream`** | <code><a href="#iprotocolrequeststream">IProtocolRequestStream</a></code> |


#### IProtocolRequestStream

| Method                 | Signature                                               |
| ---------------------- | ------------------------------------------------------- |
| **getStreamDirection** | () =&gt; <a href="#streamdirection">StreamDirection</a> |


#### BasicGroupConfiguration

| Prop           | Type                | Description                   |
| -------------- | ------------------- | ----------------------------- |
| **`version`**  | <code>string</code> |                               |
| **`handlers`** | <code>any[]</code>  | TODO: Decide for structure... |


#### IGroup


### Type Aliases


#### IProtocolRequestHandler

<code>(event: Event, content: <a href="#iprotocolrequesthandlerobj">IProtocolRequestHandlerObj</a>): <a href="#protocolrequesthandlerresponse">ProtocolRequestHandlerResponse</a></code>


#### VersionHandlerEvent

<code>{ type: T; }</code>


### Enums


#### VersionHandlerEventType

| Members      | Value                                       |
| ------------ | ------------------------------------------- |
| **`ready`**  | <code>"VERSION_HANDLER_EVENT_READY"</code>  |
| **`data`**   | <code>"VERSION_HANDLER_EVENT_DATA"</code>   |
| **`closed`** | <code>"VERSION_HANDLER_EVENT_CLOSED"</code> |
| **`error`**  | <code>"VERSION_HANDLER_EVENT_ERROR"</code>  |


#### StreamDirection

| Members        | Value                   |
| -------------- | ----------------------- |
| **`Inbound`**  | <code>"INBOUND"</code>  |
| **`Outbound`** | <code>"OUTBOUND"</code> |


#### ProtocolRequestHandlerResponse

| Members        | Value                    |
| -------------- | ------------------------ |
| **`Close`**    | <code>"CLOSE"</code>     |
| **`StayOpen`** | <code>"STAY_OPEN"</code> |

</docgen-api>
