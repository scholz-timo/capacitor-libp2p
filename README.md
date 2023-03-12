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
* [`ensurePackageSeparator()`](#ensurepackageseparator)
* [`ensureTransformer()`](#ensuretransformer)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

The P2P-Provider plugin interface.

### createGroupFactory(...)

```typescript
createGroupFactory(name: string) => Promise<IGroupFactory>
```

Create a group factory.
Make sure to provide a name for the group factory.

Use this function to create groups.

| Param      | Type                | Description                             |
| ---------- | ------------------- | --------------------------------------- |
| **`name`** | <code>string</code> | The name is used to IDENTIFY the group. |

**Returns:** <code>Promise&lt;<a href="#igroupfactory">IGroupFactory</a>&gt;</code>

--------------------


### createConnectionHandler(...)

```typescript
createConnectionHandler(options: { groups: IGroup[]; addresses?: string[]; }) => Promise<IConnectionHandler>
```

Creates a new connection handler using the provided groups and addresses.
Make sure to provide groups and addresses.

| Param         | Type                                                     | Description                                                                  |
| ------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`options`** | <code>{ groups: IGroup[]; addresses?: string[]; }</code> | A object containing the "groups" and (optionally) "addresses" to connect to. |

**Returns:** <code>Promise&lt;<a href="#iconnectionhandler">IConnectionHandler</a>&gt;</code>

--------------------


### ensurePackageSeparator()

```typescript
ensurePackageSeparator() => Promise<IPackageSeparatorGroup>
```

A static object that contains different default implementations of the "package" separator.

Package separators are used to separate/join packages into group(s)

**Returns:** <code>Promise&lt;<a href="#ipackageseparatorgroup">IPackageSeparatorGroup</a>&gt;</code>

--------------------


### ensureTransformer()

```typescript
ensureTransformer() => Promise<ITransformerGroup>
```

A static object that contains different default implementations of the "transformer".

A transformer is used to transform data from/to UInt8Array

**Returns:** <code>Promise&lt;<a href="#itransformergroup">ITransformerGroup</a>&gt;</code>

--------------------


### Interfaces


#### IGroupFactory

GroupFactory interface.

Uses the factory pattern to create groups.

| Method                     | Signature                                                                                                                                                                                           | Description                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **generateVersionHandler** | (version: <a href="#basicgroupconfiguration">BasicGroupConfiguration</a>) =&gt; <a href="#iversionhandler">IVersionHandler</a>                                                                      | Generates a version handler and attaches it to the group factory.                                     |
| **generateVersionHandler** | (version: <a href="#basicgroupconfiguration">BasicGroupConfiguration</a>, initializer: (versionHandler: <a href="#iversionhandler">IVersionHandler</a>) =&gt; any \| Promise&lt;any&gt;) =&gt; this | Generates a version handler and attaches it to the group factory.                                     |
| **generate**               | () =&gt; Promise&lt;<a href="#igroup">IGroup</a>&gt;                                                                                                                                                | Generates the group. After creating the group, it can be used in the creation of connection handlers. |


#### IVersionHandler

The version handler is an event bus.

| Method         | Signature       |
| -------------- | --------------- |
| **getVersion** | () =&gt; string |


#### BasicGroupConfiguration

| Prop          | Type                |
| ------------- | ------------------- |
| **`version`** | <code>string</code> |


#### IGroup

| Method                          | Signature                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------ |
| **getName**                     | () =&gt; string                                                                            |
| **getVersionForVersionHandler** | (versionHandler: <a href="#iversionhandler">IVersionHandler</a>) =&gt; string \| undefined |


#### IConnectionHandler

The connection handler.
Handles incoming and outgoing connections, if supported.

Has 2 events:
 - ConnectionHandlerEventType.peer_connect
 - ConnectionHandlerEventType.peer_disconnect

| Method                   | Signature                                                                                                                                                                          | Description                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **start**                | () =&gt; Promise&lt;void&gt;                                                                                                                                                       | Starts the connection.                                                                       |
| **getStatus**            | () =&gt; <a href="#connectionhandlerstatus">ConnectionHandlerStatus</a>                                                                                                            | Gets the status of the current connection handler.                                           |
| **stop**                 | () =&gt; Promise&lt;void&gt;                                                                                                                                                       | Stops the connection.                                                                        |
| **dial**                 | (address: string) =&gt; Promise&lt;<a href="#iconnection">IConnection</a>&gt;                                                                                                      | Establishes a new connection to a new peer/client.                                           |
| **hangUp**               | (address: string) =&gt; Promise&lt;void&gt;                                                                                                                                        | Ends a connection to the specified address.                                                  |
| **getMyConnections**     | () =&gt; IConnection[]                                                                                                                                                             | Returns our current connections.                                                             |
| **getAddresses**         | () =&gt; string[]                                                                                                                                                                  | Returns our addresses. Can return an empty array, when no inbound connections are supported. |
| **getStreamForProtocol** | (address: string, protocol: { group: <a href="#igroup">IGroup</a>; version: <a href="#iversionhandler">IVersionHandler</a>; }) =&gt; Promise&lt;<a href="#istream">IStream</a>&gt; | Opens a new stream for the given protocol.                                                   |


#### IConnection

| Method    | Signature                    |
| --------- | ---------------------------- |
| **close** | () =&gt; Promise&lt;void&gt; |


#### IStream

| Method    | Signature                    |
| --------- | ---------------------------- |
| **close** | () =&gt; Promise&lt;void&gt; |


#### IPackageSeparatorGroup

| Prop            | Type                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`delimiter`** | <code>(value: <a href="#uint8array">Uint8Array</a>) =&gt; <a href="#ipackageseparator">IPackageSeparator</a></code> |


#### Uint8Array

A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the
requested number of bytes could not be allocated an exception is raised.

| Prop                    | Type                                                        | Description                                                                  |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`BYTES_PER_ELEMENT`** | <code>number</code>                                         | The size in bytes of each element in the array.                              |
| **`buffer`**            | <code><a href="#arraybufferlike">ArrayBufferLike</a></code> | The <a href="#arraybuffer">ArrayBuffer</a> instance referenced by the array. |
| **`byteLength`**        | <code>number</code>                                         | The length in bytes of the array.                                            |
| **`byteOffset`**        | <code>number</code>                                         | The offset in bytes of the array.                                            |
| **`length`**            | <code>number</code>                                         | The length of the array.                                                     |

| Method             | Signature                                                                                                                                                                      | Description                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **copyWithin**     | (target: number, start: number, end?: number \| undefined) =&gt; this                                                                                                          | Returns the this object after copying a section of the array identified by start and end to the same array starting at position target                                                                                                      |
| **every**          | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| **fill**           | (value: number, start?: number \| undefined, end?: number \| undefined) =&gt; this                                                                                             | Returns the this object after filling the section identified by start and end with value                                                                                                                                                    |
| **filter**         | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; any, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>                   | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| **find**           | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number \| undefined                                  | Returns the value of the first element in the array where predicate is true, and undefined otherwise.                                                                                                                                       |
| **findIndex**      | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number                                               | Returns the index of the first element in the array where predicate is true, and -1 otherwise.                                                                                                                                              |
| **forEach**        | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; void, thisArg?: any) =&gt; void                                                 | Performs the specified action for each element in an array.                                                                                                                                                                                 |
| **indexOf**        | (searchElement: number, fromIndex?: number \| undefined) =&gt; number                                                                                                          | Returns the index of the first occurrence of a value in an array.                                                                                                                                                                           |
| **join**           | (separator?: string \| undefined) =&gt; string                                                                                                                                 | Adds all the elements of an array separated by the specified separator string.                                                                                                                                                              |
| **lastIndexOf**    | (searchElement: number, fromIndex?: number \| undefined) =&gt; number                                                                                                          | Returns the index of the last occurrence of a value in an array.                                                                                                                                                                            |
| **map**            | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>               | Calls a defined callback function on each element of an array, and returns an array that contains the results.                                                                                                                              |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| **reverse**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | Reverses the elements in an Array.                                                                                                                                                                                                          |
| **set**            | (array: <a href="#arraylike">ArrayLike</a>&lt;number&gt;, offset?: number \| undefined) =&gt; void                                                                             | Sets a value or an array of values.                                                                                                                                                                                                         |
| **slice**          | (start?: number \| undefined, end?: number \| undefined) =&gt; <a href="#uint8array">Uint8Array</a>                                                                            | Returns a section of an array.                                                                                                                                                                                                              |
| **some**           | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | Determines whether the specified callback function returns true for any element of an array.                                                                                                                                                |
| **sort**           | (compareFn?: ((a: number, b: number) =&gt; number) \| undefined) =&gt; this                                                                                                    | Sorts an array.                                                                                                                                                                                                                             |
| **subarray**       | (begin?: number \| undefined, end?: number \| undefined) =&gt; <a href="#uint8array">Uint8Array</a>                                                                            | Gets a new <a href="#uint8array">Uint8Array</a> view of the <a href="#arraybuffer">ArrayBuffer</a> store for this array, referencing the elements at begin, inclusive, up to end, exclusive.                                                |
| **toLocaleString** | () =&gt; string                                                                                                                                                                | Converts a number to a string by using the current locale.                                                                                                                                                                                  |
| **toString**       | () =&gt; string                                                                                                                                                                | Returns a string representation of an array.                                                                                                                                                                                                |
| **valueOf**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | Returns the primitive value of the specified object.                                                                                                                                                                                        |


#### ArrayLike

| Prop         | Type                |
| ------------ | ------------------- |
| **`length`** | <code>number</code> |


#### ArrayBufferTypes

Allowed <a href="#arraybuffer">ArrayBuffer</a> types for the buffer of an ArrayBufferView and related Typed Arrays.

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`ArrayBuffer`** | <code><a href="#arraybuffer">ArrayBuffer</a></code> |


#### ArrayBuffer

Represents a raw buffer of binary data, which is used to store data for the
different typed arrays. ArrayBuffers cannot be read from or written to directly,
but can be passed to a typed array or DataView Object to interpret the raw
buffer as needed.

| Prop             | Type                | Description                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------- |
| **`byteLength`** | <code>number</code> | Read-only. The length of the <a href="#arraybuffer">ArrayBuffer</a> (in bytes). |

| Method    | Signature                                                                               | Description                                                     |
| --------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **slice** | (begin: number, end?: number \| undefined) =&gt; <a href="#arraybuffer">ArrayBuffer</a> | Returns a section of an <a href="#arraybuffer">ArrayBuffer</a>. |


#### IPackageSeparator


#### ITransformerGroup

| Prop         | Type                                                                |
| ------------ | ------------------------------------------------------------------- |
| **`string`** | <code><a href="#itransformer">ITransformer</a>&lt;string&gt;</code> |


#### ITransformer

| Method        | Signature                                             |
| ------------- | ----------------------------------------------------- |
| **toUInt8**   | (value: T) =&gt; <a href="#uint8array">Uint8Array</a> |
| **fromUInt8** | (value: <a href="#uint8array">Uint8Array</a>) =&gt; T |


### Type Aliases


#### ArrayBufferLike

<code>ArrayBufferTypes[keyof ArrayBufferTypes]</code>


### Enums


#### ConnectionHandlerStatus

| Members        | Value                   | Description                                                                                            |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| **`STARTING`** | <code>'STARTING'</code> | The application is starting. --&gt; Can switch to STOPPED on error or to started on success.           |
| **`STARTED`**  | <code>'STARTED'</code>  | The application is started. --&gt; Can switch to STOPPING on stop call.                                |
| **`STOPPING`** | <code>'STOPPING'</code> | The application is stopping / shutting down. --&gt; Will switch to STOPPED, when all actions are done. |
| **`STOPPED`**  | <code>'STOPPED'</code>  | The application is stopped. (The default state) --&gt; Will switch to STARTING o                       |

</docgen-api>
